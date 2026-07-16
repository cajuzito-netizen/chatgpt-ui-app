/**
 * Drawer — Base UI anatomy (Root / Trigger / Portal / Backdrop / Viewport / Popup / Content / …).
 * External names match common shadcn/sheet patterns for drop-in usage.
 * Positioning is style-driven; default is a left edge panel (mobile nav).
 * @see https://base-ui.com/react/components/drawer
 */
import * as React from 'react'
import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer'
import { cn } from '~/lib/utils'

function Drawer({
  swipeDirection = 'left',
  ...props
}: DrawerPrimitive.Root.Props) {
  return (
    <DrawerPrimitive.Root
      data-slot="drawer"
      swipeDirection={swipeDirection}
      {...props}
    />
  )
}

function DrawerTrigger(props: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal(props: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose(props: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        'fixed inset-0 z-50 min-h-dvh bg-black/40 transition-opacity duration-200 ease-out',
        'data-starting-style:opacity-0 data-ending-style:opacity-0',
        'data-swiping:duration-0',
        'supports-[-webkit-touch-callout:none]:absolute',
        className,
      )}
      {...props}
    />
  )
}

function DrawerViewport({
  className,
  ...props
}: DrawerPrimitive.Viewport.Props) {
  return (
    <DrawerPrimitive.Viewport
      data-slot="drawer-viewport"
      className={cn('fixed inset-0 z-50', className)}
      {...props}
    />
  )
}

const sidePopupClass: Record<'left' | 'right' | 'top' | 'bottom', string> = {
  left: [
    'inset-y-0 left-0 h-full w-[min(var(--sidebar-width),85vw)] max-w-[100vw]',
    '[transform:translateX(var(--drawer-swipe-movement-x,0px))]',
    'data-starting-style:translate-x-[-100%] data-ending-style:translate-x-[-100%]',
  ].join(' '),
  right: [
    'inset-y-0 right-0 h-full w-[min(var(--sidebar-width),85vw)] max-w-[100vw]',
    '[transform:translateX(var(--drawer-swipe-movement-x,0px))]',
    'data-starting-style:translate-x-full data-ending-style:translate-x-full',
  ].join(' '),
  top: [
    'inset-x-0 top-0 max-h-[85dvh] w-full',
    '[transform:translateY(var(--drawer-swipe-movement-y,0px))]',
    'data-starting-style:translate-y-[-100%] data-ending-style:translate-y-[-100%]',
  ].join(' '),
  bottom: [
    'inset-x-0 bottom-0 max-h-[85dvh] w-full',
    '[transform:translateY(calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px)))]',
    'data-starting-style:translate-y-full data-ending-style:translate-y-full',
  ].join(' '),
}

function DrawerContent({
  className,
  children,
  side = 'left',
  ...props
}: DrawerPrimitive.Popup.Props & {
  side?: 'left' | 'right' | 'top' | 'bottom'
}) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerViewport>
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          data-side={side}
          className={cn(
            'fixed z-50 flex flex-col bg-surface text-ink outline-none',
            'dark:bg-dark-surface dark:text-dark-ink',
            'transition-transform duration-200 ease-out',
            'data-swiping:duration-0',
            'motion-reduce:transition-none',
            sidePopupClass[side],
            className,
          )}
          {...props}
        >
          <DrawerPrimitive.Content
            data-slot="drawer-body"
            className="flex h-full min-h-0 w-full flex-col overflow-hidden"
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerViewport>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn('flex flex-col gap-1.5 p-4 text-left', className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn('text-base font-semibold leading-none', className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerClose,
  DrawerOverlay,
  DrawerViewport,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
