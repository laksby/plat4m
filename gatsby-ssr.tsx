import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import type { GatsbySSR } from 'gatsby';
import { theme } from './src/theme';

export const onPreRenderHTML: GatsbySSR['onPreRenderHTML'] = args => {
  const headComponents = args.getHeadComponents();
  args.replaceHeadComponents([...headComponents, <ColorSchemeScript key="color-scheme-script" />]);
};

export const wrapPageElement: GatsbySSR['wrapPageElement'] = args => {
  return <MantineProvider theme={theme}>{args.element}</MantineProvider>;
};
