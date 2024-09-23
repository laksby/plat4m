import { Button, Center, Stack, Title, useMantineTheme } from '@mantine/core';
import { IconGhost2 } from '@tabler/icons-react';
import { Link } from 'gatsby';
import { FC } from 'react';

export const NotFoundPage: FC = () => {
  const theme = useMantineTheme();

  return (
    <Center className="tw-h-screen" bg={theme.colors.gray[0]}>
      <Stack align="center" gap="lg">
        <IconGhost2 color={theme.colors.gray[3]} size={128} stroke={1} />
        <Title order={1} size="h3">
          Sorry! Requested page not found
        </Title>
        <Button variant="filled" component={Link} to="/">
          Return to Home Page
        </Button>
      </Stack>
    </Center>
  );
};

export default NotFoundPage;
