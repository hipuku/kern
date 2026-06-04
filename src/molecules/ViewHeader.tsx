interface ViewHeaderProps {
  title: string
  description: string
}

export function ViewHeader({ title, description }: ViewHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="type-h4 text-void-90">{title}</h1>
      <p className="type-p-sm text-void-70">{description}</p>
    </div>
  )
}
