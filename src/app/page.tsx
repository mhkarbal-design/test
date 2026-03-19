'use client';
import { AccordionRoot, Box, Text, Flex } from '@ftv/ui';
import { useEffect, useState } from 'react';
import { FooterActions } from '../components/footer-actions';
import { ListItem } from '../components/list-item';
import { useGetShiftsQuery } from '../models/graphql-types-hooks';
import { formatDateForQuery } from '../helpers/date-formatter';

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openAccordionId, setOpenAccordionId] = useState('');
  const [isPrinting, setIsPrinting] = useState(false);

  const { data, isLoading, isError } = useGetShiftsQuery({
    date: formatDateForQuery(selectedDate),
  });

  const shifts = data?.shifts ?? [];
  const users = shifts.map((shift, index) => ({
    id: `shift-${index}`,
    name: `${shift.sPrenom ?? ''} ${shift.sNom}`.trim(),
    description: shift.sFonction,
    bureau: shift.sBureau,
    telephone: shift.sTelephone,
    portable: shift.sPortable,
    professionnel: shift.sProfessionnel,
  }));

  const handleSearchChange = (value: string): void => {
    setSearchValue(value);
  };

  const handleDateChange = (date: Date): void => {
    setSelectedDate(date);
  };

  const handlePrintClick = (): void => {
    setIsPrinting(true);
    setTimeout(() => window.print(), 0);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.description.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    const handleAfterPrint = (): void => setIsPrinting(false);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, []);

  return (
    <>
      <Box pb="8">
        {isError ? (
          <Flex align="center" direction="column" gap="2" p="6">
            <Text color="red" size="3">
              Une erreur est survenue lors du chargement des permanences.
            </Text>
          </Flex>
        ) : isPrinting ? (
          <AccordionRoot type="multiple" value={filteredUsers.map((u) => u.id)}>
            {filteredUsers.map((user) => (
              <ListItem key={user.id} user={user} />
            ))}
          </AccordionRoot>
        ) : (
          <AccordionRoot
            type="single"
            value={openAccordionId}
            onValueChange={setOpenAccordionId}
          >
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key -- no other key to use
                  <ListItem key={String(index)} loading />
                ))
              : filteredUsers.map((user) => (
                  <ListItem key={user.id} user={user} />
                ))}
          </AccordionRoot>
        )}
        {!isLoading && !isError && filteredUsers.length === 0 && (
          <Flex align="center" direction="column" gap="2" p="6">
            <Text size="3">
              {searchValue
                ? 'Aucun résultat pour cette recherche.'
                : 'Aucune permanence pour cette date.'}
            </Text>
          </Flex>
        )}
      </Box>
      <FooterActions
        onDateChange={handleDateChange}
        onPrintClick={handlePrintClick}
        onSearchChange={handleSearchChange}
      />
    </>
  );
};

export default Home;
