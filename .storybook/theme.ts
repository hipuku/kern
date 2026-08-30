import { create } from 'storybook/theming'
import { voidScale, palette, fonts } from '../src/tokens/tokens'

/**
 * kern's Storybook theme, built from the token source rather than a second set
 * of hardcoded hexes.
 *
 * Used in two places: the manager chrome (sidebar, toolbar) and the docs pages.
 * The docs pages need it explicitly. Without a theme they render in
 * Storybook's default light palette, which on a dark-only design system means
 * the documentation contradicts the thing it documents.
 */
export const kernTheme = create({
  base: 'dark',

  brandTitle: 'kern',
  brandImage: '/brand/wordmark.svg',
  brandUrl: 'https://kern.hipuku.dev',
  brandTarget: '_self',

  fontBase: fonts.sans,
  fontCode: fonts.mono,

  colorPrimary: palette.pulsar.base,
  colorSecondary: palette.pulsar.base,

  appBg: voidScale[0],
  appContentBg: voidScale[0],
  appPreviewBg: voidScale[0],
  appBorderColor: voidScale[20],
  appBorderRadius: 12,

  textColor: voidScale[90],
  textInverseColor: voidScale[0],
  textMutedColor: voidScale[50],

  barBg: voidScale[0],
  barTextColor: voidScale[60],
  barSelectedColor: palette.pulsar.base,
  barHoverColor: voidScale[90],

  inputBg: voidScale[10],
  inputBorder: voidScale[30],
  inputTextColor: voidScale[90],
  inputBorderRadius: 8,
})
