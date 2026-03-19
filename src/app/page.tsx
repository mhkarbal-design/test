'use client';
import React, { useMemo, useState } from 'react';
import { AccordionRoot, Box, Flex, Text } from '@ftv/ui';
import { FooterActions } from '../components/footer-actions';
import { ListItem } from '../components/list-item';
import { useGetShiftsQuery } from '../models/graphql-types-hooks';
import { formatDateForQuery } from '../helpers/date-formatter';

const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState(new Date());
  const [openAccordionId, setOpenAccordionId] = useState('');

  const { data, isLoading, isError } = useGetShiftsQuery({
    date: formatDateForQuery(date),
  });

  const users = useMemo(
    () =>
      (data?.shifts ?? []).map((shift, index) => ({
        id: `shift-${index}`,
        name: `${shift.sPrenom ?? ''} ${shift.sNom}`.trim(),
        description: shift.sFonction,
        bureau: shift.sBureau,
        telephone: shift.sTelephone,
        portable: shift.sPortable,
        professionnel: shift.sProfessionnel,
      })),
    [data],
  );

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.description.toLowerCase().includes(q),
    );
  }, [users, search]);

  if (isError) {
    return (
      <Flex align="center" direction="column" p="6">
        <Text color="red" size="3">
          Une erreur est survenue lors du chargement des permanences.
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <Box pb="8">
        <AccordionRoot type="single" value={openAccordionId} onValueChange={setOpenAccordionId}>
          {isLoading
            ? Array.from({ length: 10 }, (_, i) => <ListItem key={i} loading />)
            : filteredUsers.map((user) => <ListItem key={user.id} user={user} />)}
        </AccordionRoot>
        {!isLoading && filteredUsers.length === 0 && (
          <Flex align="center" direction="column" p="6">
            <Text size="3">
              {search
                ? 'Aucun résultat pour cette recherche.'
                : 'Aucune permanence pour cette date.'}
            </Text>
          </Flex>
        )}
      </Box>
      <FooterActions
        onDateChange={setDate}
        onPrintClick={() => window.print()}
        onSearchChange={setSearch}
      />
    </>
  );
};

export default Home;
