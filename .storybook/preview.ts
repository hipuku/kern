import type { Preview } from '@storybook/react-vite'
import { voidScale } from '../src/tokens/tokens'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    // Read from the token source rather than repeating the hexes: the two
    // surfaces a kern component is ever placed on are the page background and
    // the raised surface, and both are void steps.
    backgrounds: {
      options: {
        void:    { name: 'void (page)',     value: voidScale[0] },
        surface: { name: 'void-10 (raised)', value: voidScale[10] },
      },
    },
    layout: 'padded',
    options: {
      storySort: {
        // Docs first, then the system bottom-up: tokens, then each atomic tier.
        // Within Atoms the Icons catalog leads, since it is the shared vocabulary
        // the other components draw on.
        order: [
          'Getting started',
          'Tokens',
          'Atoms', ['Icons', '*'],
          'Molecules',
          'Organisms',
          'Templates',
          'Utilities',
        ],
      },
    },
    a11y: {
      // Surface violations in the panel; the axe smoke tests in *.test.tsx are
      // what actually gate CI.
      test: 'todo',
    },
  },

  initialGlobals: {
    backgrounds: { value: 'void' },
  },
}

export default preview
