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
        order: ['Tokens', 'Atoms', 'Molecules', 'Organisms'],
      },
    },
  },
}

export default preview
