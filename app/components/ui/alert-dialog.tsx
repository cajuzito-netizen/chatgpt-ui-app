import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'
import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'

export function AlertDialog(props: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root {...props} />
}

export function AlertDialogContent({
  className,
  ...props
}: AlertDialogPrimitive.Popup.Props) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/40" />
      <AlertDialogPrimitive.Popup
        className={cn(
          'fixed top-1/2 left-1/2 z-50 w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl outline-none dark:bg-dark-surface-secondary',
          className,
        )}
        {...props}
      />
    </AlertDialogPrimitive.Portal>
  )
}

export function AlertDialogTitle({
  className,
  ...props
}: AlertDialogPrimitive.Title.Props) {
  return (
    <AlertDialogPrimitive.Title
      className={cn('text-center text-2xl font-semibold', className)}
      {...props}
    />
  )
}

export function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return <Button className={cn('w-full', className)} {...props} />
}

export function AlertDialogCancel({
  className,
  ...props
}: AlertDialogPrimitive.Close.Props) {
  return (
    <AlertDialogPrimitive.Close
      className={cn(
        'inline-flex h-11 w-full items-center justify-center rounded-full border border-black/15 bg-white text-sm font-medium hover:bg-[#f9f9f9] dark:border-white/15 dark:bg-transparent',
        className,
      )}
      {...props}
    />
  )
}
