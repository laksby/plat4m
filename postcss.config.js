const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const postcssPresetMantine = require('postcss-preset-mantine');
const postcssImport = require('postcss-import');
const postcssSimpleVars = require('postcss-simple-vars');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    postcssImport,
    tailwind,
    autoprefixer,
    postcssPresetMantine,
    postcssPresetEnv({
      stage: 0,
    }),
    postcssSimpleVars({
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    }),
    cssnano({
      preset: 'default',
    }),
  ],
};
