/**
 * Alert Dialog — Base UI anatomy (same popup model as Dialog, non-dismissible backdrop intent).
 * External names match shadcn. Action/Cancel both use Close so the dialog always dismisses.
 * @see https://base-ui.com/react/components/alert-dialog
 */
import * as React from 'react'
import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'
import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'

function AlertDialog(props: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger(props: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal(props: AlertDialogPrimitive.Portal.Props) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        'fixed inset-0 z-50 min-h-dvh bg-black/40 transition-opacity duration-150',
        'data-starting-style:opacity-0 data-ending-style:opacity-0',
        'supports-[-webkit-touch-callout:none]:absolute',
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  ...props
}: AlertDialogPrimitive.Popup.Props) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        className={cn(
          'fixed top-1/2 left-1/2 z-50 w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2',
          'rounded-2xl bg-popover p-6 text-popover-foreground shadow-2xl outline-none',
          'origin-center transition-[opacity,transform] duration-150 ease-out',
          'data-starting-style:scale-[0.98] data-starting-style:opacity-0',
          'data-ending-style:scale-[0.98] data-ending-style:opacity-0',
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn('mt-5 flex flex-col gap-2.5', className)}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: AlertDialogPrimitive.Title.Props) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        'text-center text-2xl font-semibold leading-snug',
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: AlertDialogPrimitive.Description.Props) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

/**
 * Primary confirm. Renders Base UI Close with Button chrome so the dialog
 * always dismisses (Base UI has no separate Action part).
 */
function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-action"
      render={<Button className={cn('w-full', className)} {...props} />}
    />
  )
}

/** Secondary dismiss — Base UI Close with outline Button. */
function AlertDialogCancel({
  className,
  variant = 'outline',
  size = 'default',
  ...props
}: AlertDialogPrimitive.Close.Props &
  Pick<React.ComponentProps<typeof Button>, 'variant' | 'size'>) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      render={<Button variant={variant} size={size} className="w-full" />}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
