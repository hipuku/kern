import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  staticDirs: [
    { from: '../logo.svg', to: '/favicon.svg' },
    { from: '../logo.svg', to: '/brand/logo.svg' },
    { from: '../wordmark.svg', to: '/brand/wordmark.svg' },
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.plugins = [...(config.plugins ?? []), tailwindcss()]
    config.resolve = {
      ...config.resolve,
      alias: {
        '@': path.resolve(__dirname, '../src'),
      },
    }
    return config
  },
}

export default config
