import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import type { GatsbyBrowser } from 'gatsby';
import './src/styles/index.css';
import { theme } from './src/theme';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = args => {
  return <MantineProvider theme={theme}>{args.element}</MantineProvider>;
};
