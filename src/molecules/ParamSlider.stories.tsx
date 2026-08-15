import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ParamSlider } from './ParamSlider'

const meta = {
  title: 'Molecules/ParamSlider',
  component: ParamSlider,
} satisfies Meta<typeof ParamSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [f, setF] = useState(0.035)
    return (
      <div className="w-56 flex flex-col gap-4">
        <ParamSlider label="f — feed rate" value={f} min={0.01} max={0.08} step={0.001} onChange={setF} />
      </div>
    )
  },
}

export const MultipleSliders: Story = {
  render: () => {
    const [f,  setF]  = useState(0.035)
    const [k,  setK]  = useState(0.065)
    const [du, setDu] = useState(0.2097)
    const [dv, setDv] = useState(0.1050)
    return (
      <div className="w-56 flex flex-col gap-4">
        <ParamSlider label="f — feed rate"     value={f}  min={0.01}  max={0.08}  step={0.001}  onChange={setF}  />
        <ParamSlider label="k — kill rate"     value={k}  min={0.04}  max={0.075} step={0.001}  onChange={setK}  />
        <ParamSlider label="Du — substrate"    value={du} min={0.05}  max={0.50}  step={0.001}  onChange={setDu} />
        <ParamSlider label="Dv — activator"    value={dv} min={0.025} max={0.25}  step={0.0005} onChange={setDv} format={v => v.toFixed(4)} />
      </div>
    )
  },
}

export const CustomFormat: Story = {
  render: () => {
    const [v, setV] = useState(42)
    return (
      <div className="w-56">
        <ParamSlider
          label="Threshold"
          value={v}
          min={0}
          max={100}
          step={1}
          onChange={setV}
          format={n => `${n}%`}
        />
      </div>
    )
  },
}
