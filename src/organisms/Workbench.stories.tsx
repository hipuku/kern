import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Workbench } from './Workbench'
import { CanvasStage } from '../molecules/CanvasStage'
import { ChipGroup } from '../molecules/ChipGroup'
import { ParamSlider } from '../molecules/ParamSlider'
import { TransportControls } from '../molecules/TransportControls'
import { ToggleChip } from '../atoms/ToggleChip'

const meta = {
  title: 'Organisms/Workbench',
  component: Workbench,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The stage-and-rail region a simulation view is built from: a `CanvasStage` taking the free width beside ' +
          'a control rail of `ChipGroup`, `ParamSlider` and `TransportControls`. The organism owns the two-column ' +
          'arrangement; the view fills the two slots.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

const PRESETS = ['Coral', 'Leopard', 'Mitosis']

const FakeCanvas = () => (
  <div
    className="w-full h-full"
    style={{ background: 'radial-gradient(circle at 40% 40%, var(--color-nebula), var(--color-background) 65%)' }}
  />
)

export const Default: Story = {
  render: () => {
    const [preset, setPreset] = useState('Coral')
    const [running, setRunning] = useState(true)
    const [f, setF] = useState(0.037)
    const [k, setK] = useState(0.06)
    return (
      <div className="h-screen p-10 bg-background flex flex-col">
        <Workbench
          stage={
            <CanvasStage className="h-full">
              <FakeCanvas />
            </CanvasStage>
          }
          controls={
            <>
              <ChipGroup label="Pattern">
                {PRESETS.map((p) => (
                  <ToggleChip key={p} active={preset === p} onClick={() => setPreset(p)}>
                    {p}
                  </ToggleChip>
                ))}
              </ChipGroup>
              <ParamSlider label="f (feed)" value={f} min={0.01} max={0.08} step={0.001} onChange={setF} />
              <ParamSlider label="k (kill)" value={k} min={0.04} max={0.075} step={0.001} onChange={setK} />
              <TransportControls
                running={running}
                onToggle={() => setRunning((r) => !r)}
                onReset={() => setRunning(true)}
                resetLabel="Reset simulation"
              />
            </>
          }
        />
      </div>
    )
  },
}
