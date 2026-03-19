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

interface ListItemProps {
  user?: User;
  key?: string;
  loading?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  user,
  key,
  loading = false,
}) => (
  <Box bg="white" borderCorner="all" m="3" p="3" data-print-item>
    <Skeleton loading={loading}>
      <AccordionItem value={user?.id || key || ''}>
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
            {user?.telephone ? (
              <Flex align="center" justify="between" mt="3">
                <Flex align="center">
                  <Icon color="gray" height="24" name="phone" width="24" />
                  <Text ml="1" size="2">
                    Téléphone
                  </Text>
                </Flex>
                <Button
                  color="yellow"
                  label={user.telephone}
                  onClick={() => window.open(`tel:${user.telephone}`)}
                  variant="solid"
                />
              </Flex>
            ) : null}
            {user?.portable ? (
              <Flex align="center" justify="between" mt="3">
                <Flex align="center">
                  <Icon color="blue" height="24" name="phone" width="24" />
                  <Text ml="1" size="2">
                    Portable
                  </Text>
                </Flex>
                <Button
                  color="yellow"
                  label={user.portable}
                  onClick={() => window.open(`tel:${user.portable}`)}
                  variant="solid"
                />
              </Flex>
            ) : null}
            {user?.professionnel ? (
              <Flex align="center" justify="between" mt="3">
                <Flex align="center">
                  <Icon color="red" height="24" name="phone" width="24" />
                  <Text ml="1" size="2">
                    Professionnel
                  </Text>
                </Flex>
                <Button
                  color="yellow"
                  label={user.professionnel}
                  onClick={() => window.open(`tel:${user.professionnel}`)}
                  variant="solid"
                />
              </Flex>
            ) : null}
          </Box>
        </AccordionContent>
      </AccordionItem>
    </Skeleton>
  </Box>
);
