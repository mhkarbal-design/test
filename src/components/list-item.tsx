import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Box,
  Button,
  Flex,
  Icon,
  Skeleton,
  Text,
} from '@ftv/ui';

interface User {
  id: string;
  name: string;
  description: string;
  bureau?: string | null;
  telephone?: string | null;
  portable?: string | null;
  professionnel?: string | null;
}

interface PhoneRowProps {
  iconColor: string;
  label: string;
  number: string;
}

const PhoneRow: React.FC<PhoneRowProps> = ({ iconColor, label, number }) => (
  <Flex align="center" justify="between" mt="3">
    <Flex align="center">
      <Icon color={iconColor} height="24" name="phone" width="24" />
      <Text ml="1" size="2">
        {label}
      </Text>
    </Flex>
    <Button
      color="yellow"
      label={number}
      onClick={() => window.open(`tel:${number}`)}
      variant="solid"
    />
  </Flex>
);

interface ListItemProps {
  user?: User;
  loading?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({ user, loading = false }) => (
  <Box bg="white" borderCorner="all" m="3" p="3" data-print-item>
    <Skeleton loading={loading}>
      <AccordionItem value={user?.id ?? ''}>
        <AccordionTrigger asChild>
          <Flex align="center" justify="between">
            <Flex align="center" gap="3">
              <Box>
                <Text as="p" size="3" weight="bold">
                  {user?.name}
                </Text>
                <Text as="p" size="2" title={user?.bureau ?? undefined}>
                  {user?.description}
                </Text>
              </Box>
            </Flex>
            <Button className="no-print" label="Contact" variant="solid" />
          </Flex>
        </AccordionTrigger>
        <AccordionContent>
          <Box bg="light-gray" borderCorner="all" mt="3" p="3" className="accordion-print-content">
            <Text size="3" weight="bold">Contact</Text>
            {user?.telephone && (
              <PhoneRow iconColor="gray" label="Téléphone" number={user.telephone} />
            )}
            {user?.portable && (
              <PhoneRow iconColor="blue" label="Portable" number={user.portable} />
            )}
            {user?.professionnel && (
              <PhoneRow iconColor="red" label="Professionnel" number={user.professionnel} />
            )}
          </Box>
        </AccordionContent>
      </AccordionItem>
    </Skeleton>
  </Box>
);
