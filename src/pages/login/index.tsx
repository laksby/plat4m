import {
  Button,
  Center,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconLock, IconUser } from '@tabler/icons-react';
import { FC } from 'react';
import { useLogin } from '../../hooks';

export const LoginPage: FC = () => {
  const theme = useMantineTheme();

  const { form, onSubmit } = useLogin();

  return (
    <Center className="tw-h-screen" bg={theme.colors.gray[0]}>
      <Paper shadow="md" radius="md" p="xl" w={400}>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Title order={1} size="h3">
            <Group justify="center">Login</Group>
          </Title>

          <Divider my="lg" />

          <Stack gap="lg">
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              key={form.key('email')}
              leftSection={<IconUser />}
              {...form.getInputProps('email')}
            />

            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="••••••••"
              key={form.key('password')}
              leftSection={<IconLock />}
              {...form.getInputProps('password')}
            />
          </Stack>

          <Group mt={48}>
            <Button type="submit" fullWidth>
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
};

export default LoginPage;
