import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

// main.ts is ESM (package.json "type": "module"), so __dirname is unavailable.
const srcDir = fileURLToPath(new URL('../src', import.meta.url))

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(ts|tsx)',
  ],
  staticDirs: [
    { from: '../logo.svg', to: '/favicon.svg' },
    { from: '../logo.svg', to: '/brand/logo.svg' },
    { from: '../wordmark.svg', to: '/brand/wordmark.svg' },
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // kern's Storybook is a published reference site, not a working Storybook.
  // Suppress the first-run affordances Storybook shows by default — the
  // onboarding checklist and update toasts are noise for a visitor who is here
  // to read the system, and there is no local project for them to onboard to.
  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
  },
  features: {
    sidebarOnboardingChecklist: false,
    menuOnboardingChecklist: false,
  },
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins ?? []), tailwindcss()]
    config.resolve = {
      ...config.resolve,
      alias: { '@': srcDir },
    }
    return config
  },
}

export default config
