import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        void: { name: 'void',    value: '#121213' },
        surface: { name: 'surface', value: '#1F1F20' }
      }
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

  initialGlobals: {
    backgrounds: {
      value: 'void'
    }
  }
}

export default preview
