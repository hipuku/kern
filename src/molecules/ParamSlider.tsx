interface ParamSliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  format?: (v: number) => string
}

const defaultFormat = (v: number) => v.toFixed(3)

export function ParamSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format = defaultFormat,
}: ParamSliderProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="type-annotation-sc text-void-60">{label}</span>
        <span className="type-code text-void-80">{format(value)}</span>
      </div>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full h-1 rounded-full appearance-none cursor-pointer bg-void-30 accent-(--primary)"
      />
    </div>
  )
}
