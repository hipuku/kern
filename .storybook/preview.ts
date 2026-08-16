import type { Preview } from '@storybook/react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'void',
      values: [
        { name: 'void',    value: '#121213' },
        { name: 'surface', value: '#1F1F20' },
      ],
    },
    layout: 'padded',
    options: {
      storySort: {
        // Lead each group sensibly: the Icons catalog opens Atoms (the shared
        // vocabulary), then the rest alphabetically.
        order: ['Tokens', 'Atoms', ['Icons', '*'], 'Molecules', 'Organisms'],
      },
    },
  },
}

export default preview
