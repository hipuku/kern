import { useId, type ReactNode, type ComponentPropsWithRef } from 'react'
import { cn } from '../lib/utils'
import { Label } from '../atoms/Label'

export interface FieldProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  label: string
  /**
   * Receives props to spread straight onto the control. They are named exactly
   * as the DOM expects, so `{...control}` wires the label and the error message
   * without the caller restating anything. Taking a render function rather than
   * plain children is what makes that wiring impossible to forget.
   */
  children: (control: { id: string; 'aria-describedby'?: string }) => ReactNode
  /** Shown below the control, and announced via `aria-describedby`. */
  error?: string
  /** Shown below the control when there is no error. */
  hint?: string
  /**
   * Trailing content in the label row, set hard right: a live count, a detected
   * format, a status. Style it yourself (`type-annotation text-ink-muted`); the
   * field only places it. Purely visual meta, so it is *not* wired into the
   * control's accessible description: the label row would otherwise read the
   * count aloud as part of the field's name.
   */
  aside?: ReactNode
}

/**
 * A labelled form control with its error and hint text.
 *
 * The house pattern for this was documented in prose, and prose cannot enforce
 * the part that actually matters: connecting the label to the control. Every
 * hand-rolled copy had to remember `htmlFor`, a matching `id`, and
 * `aria-describedby` for the error, three things that fail silently when
 * missed, because the field still looks correct.
 *
 * The render-prop shape means the ids are generated here and handed to the
 * control, so they cannot disagree:
 *
 * ```tsx
 * <Field label="Hex code" error={error}>
 *   {(control) => <Input value={value} onChange={…} {...control} />}
 * </Field>
 * ```
 */
export function Field({ label, children, error, hint, aside, className, ...props }: FieldProps) {
  const id = useId()
  const messageId = `${id}-message`
  const message = error ?? hint

  return (
    <div className={cn('flex flex-col gap-field', className)} {...props}>
      {aside != null ? (
        <div className="flex items-baseline justify-between gap-2">
          <Label htmlFor={id}>{label}</Label>
          {aside}
        </div>
      ) : (
        <Label htmlFor={id}>{label}</Label>
      )}
      {children({ id, 'aria-describedby': message ? messageId : undefined })}
      {message && (
        <p
          id={messageId}
          // Announce an error when it appears; a hint is static and does not
          // need interrupting for.
          role={error ? 'alert' : undefined}
          className={cn('type-annotation', error ? 'text-flare' : 'text-ink-muted')}
        >
          {message}
        </p>
      )}
    </div>
  )
}
