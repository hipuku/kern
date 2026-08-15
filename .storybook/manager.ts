import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming'

// kern's Storybook is the public face of the library. Dark to match the
// experiments' void surface; pulsar (the --primary token) as the accent.
const theme = create({
  base: 'dark',
  brandTitle: 'kern',
  brandImage: '/brand/wordmark.svg',
  brandUrl: 'https://kern.hipuku.dev',
  brandTarget: '_self',
  colorPrimary: '#7193ED',
  colorSecondary: '#7193ED',
})

addons.setConfig({ theme })
