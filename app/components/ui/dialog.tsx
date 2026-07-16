/**
 * Dialog — Base UI anatomy (Root / Trigger / Portal / Backdrop / Popup / Title / Description / Close).
 * External names match shadcn for drop-in usage; implementation follows Base UI docs.
 * @see https://base-ui.com/react/components/dialog
 */
import * as React from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import { cn } from '~/lib/utils'

function Dialog(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal(props: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose(props: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        'fixed inset-0 z-50 min-h-dvh bg-black/40 transition-opacity duration-150',
        /* Base UI enter/exit (not tailwindcss-animate) */
        'data-starting-style:opacity-0 data-ending-style:opacity-0',
        /* iOS 26+ visual viewport — Base UI docs */
        'supports-[-webkit-touch-callout:none]:absolute',
        className,
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & { showCloseButton?: boolean }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          'fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
          'rounded-2xl bg-popover p-5 text-popover-foreground shadow-2xl outline-none',
          'origin-center transition-[opacity,transform] duration-150 ease-out',
          'data-starting-style:scale-[0.98] data-starting-style:opacity-0',
          'data-ending-style:scale-[0.98] data-ending-style:opacity-0',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className={cn(
              'absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-lg',
              'text-muted-foreground outline-none',
              'hover:bg-muted hover:text-foreground',
              'focus-visible:ring-2 focus-visible:ring-ring/50',
            )}
            aria-label="Close"
          >
            <X className="size-4" />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-1.5 text-left', className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-base font-semibold leading-none', className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
