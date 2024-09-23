import { AppShell, Burger, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, PropsWithChildren } from 'react';

interface Props {
  noNavbar?: boolean;
}

export const PageLayout: FC<PropsWithChildren<Props>> = props => {
  const { noNavbar, children } = props;

  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{
        height: 60,
      }}
      navbar={
        noNavbar
          ? undefined
          : {
              width: 240,
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }
      }
      padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={1} size="h3">
            PLAT4M
          </Title>
        </Group>
      </AppShell.Header>
      {!noNavbar && <AppShell.Navbar p="md">Navbar</AppShell.Navbar>}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
