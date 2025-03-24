"use client"

import * as React from "react"
import { createContext, useContext } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

interface StepperContextValue {
  value: number
  isVertical: boolean
  isComplete: (index: number) => boolean
  isActive: (index: number) => boolean
  isInvalid: (index: number) => boolean
  isDisabled: (index: number) => boolean
  stepCount: number
  invalidSteps: Set<number>
  disabledSteps: Set<number>
  onChange: (index: number) => void
}

const StepperContext = createContext<StepperContextValue | null>(null)

function useStepper() {
  const context = useContext(StepperContext)
  if (!context) {
    throw new Error("useStepper must be used within a Stepper")
  }
  return context
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  onChange?: (index: number) => void
  orientation?: "horizontal" | "vertical"
  invalidSteps?: number[]
  disabledSteps?: number[]
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      value,
      onChange,
      orientation = "horizontal",
      invalidSteps = [],
      disabledSteps = [],
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isVertical = orientation === "vertical"
    const childArr = React.Children.toArray(children)
    const stepCount = childArr.length

    const isComplete = React.useCallback((index: number) => index < value, [value])

    const isActive = React.useCallback((index: number) => index === value, [value])

    const isInvalid = React.useCallback((index: number) => invalidSteps.includes(index), [invalidSteps])

    const isDisabled = React.useCallback((index: number) => disabledSteps.includes(index), [disabledSteps])

    const handleChange = React.useCallback(
      (index: number) => {
        if (isDisabled(index)) return
        onChange?.(index)
      },
      [onChange, isDisabled],
    )

    return (
      <StepperContext.Provider
        value={{
          value,
          isVertical,
          isComplete,
          isActive,
          isInvalid,
          isDisabled,
          stepCount,
          invalidSteps: new Set(invalidSteps),
          disabledSteps: new Set(disabledSteps),
          onChange: handleChange,
        }}
      >
        <div
          ref={ref}
          className={cn("flex w-full justify-between gap-2", isVertical ? "flex-col" : "flex-row", className)}
          {...props}
        >
          {children}
        </div>
      </StepperContext.Provider>
    )
  },
)
Stepper.displayName = "Stepper"

interface StepperItemContextValue {
  index: number
  status: "complete" | "active" | "incomplete" | "invalid" | "disabled"
}

const StepperItemContext = createContext<StepperItemContextValue | null>(null)

function useStepperItem() {
  const context = useContext(StepperItemContext)
  if (!context) {
    throw new Error("useStepperItem must be used within a StepperItem")
  }
  return context
}

interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
}

const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  ({ value, className, children, ...props }, ref) => {
    const { isComplete, isActive, isInvalid, isDisabled } = useStepper()

    const status = React.useMemo(() => {
      if (isDisabled(value)) return "disabled"
      if (isInvalid(value)) return "invalid"
      if (isActive(value)) return "active"
      if (isComplete(value)) return "complete"
      return "incomplete"
    }, [isActive, isComplete, isDisabled, isInvalid, value])

    return (
      <StepperItemContext.Provider value={{ index: value, status }}>
        <div ref={ref} data-state={status} className={cn("flex flex-1 gap-2", className)} {...props}>
          {children}
        </div>
      </StepperItemContext.Provider>
    )
  },
)
StepperItem.displayName = "StepperItem"

const stepperTriggerVariants = cva("flex flex-col items-center justify-center gap-1 text-center", {
  variants: {
    variant: {
      default: "h-full w-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface StepperTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof stepperTriggerVariants> {
  asChild?: boolean
}

const StepperTrigger = React.forwardRef<HTMLButtonElement, StepperTriggerProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const { index, status } = useStepperItem()
    const { onChange } = useStepper()
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        className={cn(stepperTriggerVariants({ variant }), className)}
        data-state={status}
        data-disabled={status === "disabled" || undefined}
        disabled={status === "disabled"}
        onClick={() => onChange(index)}
        {...props}
      />
    )
  },
)
StepperTrigger.displayName = "StepperTrigger"

const StepperContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { isVertical } = useStepper()
    const { status } = useStepperItem()

    if (!isVertical) {
      return null
    }

    return <div ref={ref} data-state={status} className={cn("ml-8 pb-8", className)} {...props} />
  },
)
StepperContent.displayName = "StepperContent"

const StepperIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { status } = useStepperItem()

    return (
      <div
        ref={ref}
        data-state={status}
        className={cn(
          "relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-input bg-background text-sm font-medium ring-offset-background transition-colors",
          status === "active" && "border-primary text-primary",
          status === "complete" && "border-primary bg-primary text-primary-foreground",
          status === "invalid" && "border-destructive text-destructive",
          className,
        )}
        {...props}
      />
    )
  },
)
StepperIcon.displayName = "StepperIcon"

const StepperLabel = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { status } = useStepperItem()

    return (
      <p
        ref={ref}
        data-state={status}
        className={cn(
          "text-sm font-medium text-muted-foreground",
          status === "active" && "text-foreground",
          status === "complete" && "text-foreground",
          status === "invalid" && "text-destructive",
          className,
        )}
        {...props}
      />
    )
  },
)
StepperLabel.displayName = "StepperLabel"

const StepperDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { status } = useStepperItem()

    return <p ref={ref} data-state={status} className={cn("text-sm text-muted-foreground", className)} {...props} />
  },
)
StepperDescription.displayName = "StepperDescription"

const StepperMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { status } = useStepperItem()

    if (!children || status !== "invalid") {
      return null
    }

    return (
      <p ref={ref} data-state={status} className={cn("text-sm font-medium text-destructive", className)} {...props}>
        {children}
      </p>
    )
  },
)
StepperMessage.displayName = "StepperMessage"

interface StepperStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  complete?: React.ReactNode
  incomplete?: React.ReactNode
  active?: React.ReactNode
  invalid?: React.ReactNode
  disabled?: React.ReactNode
}

const StepperStatus = React.forwardRef<HTMLDivElement, StepperStatusProps>(
  ({ complete, incomplete, active, invalid, disabled, className, ...props }, ref) => {
    const { status } = useStepperItem()
    const { index } = useStepperItem()

    return (
      <div ref={ref} data-state={status} className={cn("flex items-center justify-center", className)} {...props}>
        {status === "complete" && (complete || null)}
        {status === "incomplete" && (incomplete || index + 1)}
        {status === "active" && (active || index + 1)}
        {status === "invalid" && (invalid || index + 1)}
        {status === "disabled" && (disabled || index + 1)}
      </div>
    )
  },
)
StepperStatus.displayName = "StepperStatus"

export {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperContent,
  StepperIcon,
  StepperLabel,
  StepperDescription,
  StepperMessage,
  StepperStatus,
}

