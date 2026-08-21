import type { Preview } from '@storybook/react-vite'
import { voidScale } from '../src/tokens/tokens'
import { kernTheme } from './theme'
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
        // The nested arrays pin the order inside a group; without them the
        // sidebar falls back to alphabetical, which puts Contributing before
        // Introduction and buries the front door.
        order: [
          'Getting started', ['Introduction', 'Composition', 'Installation', 'Contributing'],
          'Tokens', ['Colours', 'Semantic roles', 'Typography', 'Spacing', 'Radius', 'Layout', 'Motion'],
          'Atoms', ['Icons', '*'],
          'Molecules',
          'Organisms',
          'Templates',
          'Utilities',
        ],
      },
    },
    docs: {
      // Without an explicit theme the docs pages render in Storybook's default
      // light palette — the documentation for a dark-only system, on white.
      theme: kernTheme,
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
