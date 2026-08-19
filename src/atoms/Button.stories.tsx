import type { Meta, StoryObj } from '@storybook/react-vite'
import { Play, Trash2 } from 'lucide-react'
import { Button } from './Button'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Compare colours' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['surface', 'accent', 'ghost', 'link'],
      description: 'Visual treatment. `surface` is the default control; `accent` marks the one primary action in a view.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'icon'],
      description: '`icon` is square, for a single glyph — prefer the IconButton wrapper, which also requires an aria-label.',
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The button primitive. It extends the native `<button>`, so `type`, `disabled`, `title`, `aria-*` and every ' +
          'event handler pass through — kern previously had no Button at all, and the three places that hand-rolled ' +
          'one each accepted only `onClick`.',
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="surface">Surface</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="icon" aria-label="Run simulation"><Play className="w-4 h-4" /></Button>
    </div>
  ),
}

export const Disabled: Story = {
  name: 'Disabled state',
  parameters: {
    docs: {
      description: {
        story:
          'Disabling was impossible before this atom existed: the previous buttons exposed only `onClick`, so the ' +
          'only way to switch one off was to pass a no-op handler, which leaves it focusable and announced as ' +
          'enabled.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Surface</Button>
      <Button variant="accent" disabled>Accent</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button size="icon" aria-label="Delete" disabled><Trash2 className="w-4 h-4" /></Button>
    </div>
  ),
}

export const InAForm: Story = {
  name: 'Submitting a form',
  parameters: {
    docs: {
      description: {
        story:
          'Buttons default to `type="button"`, because an unspecified `type` inside a form is `"submit"` per the ' +
          'HTML spec — which silently reloads the page when a design-system button is used for anything else. ' +
          'Opt in with `type="submit"` when you do want to submit.',
      },
    },
  },
  render: () => (
    <form
      onSubmit={(e) => { e.preventDefault(); alert('submitted') }}
      className="flex items-center gap-3"
    >
      <Button type="submit" variant="accent">Submit</Button>
      <Button>Does not submit</Button>
    </form>
  ),
}
