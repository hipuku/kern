import { addons } from 'storybook/manager-api'
import { kernTheme } from './theme'

// kern's Storybook is the public face of the library, so the chrome around the
// stories is part of the design system's presentation, not neutral furniture.
addons.setConfig({ theme: kernTheme })
