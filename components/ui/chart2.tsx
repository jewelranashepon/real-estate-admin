"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

const Chart = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ className, ...props }, ref) => (
  <Slot className="relative" ref={ref} {...props} />
));
Chart.displayName = "Chart";

const ChartContainer = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ className, ...props }, ref) => (
  <Slot className="absolute inset-0" ref={ref} {...props} />
));
ChartContainer.displayName = "ChartContainer";

const ChartBars = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ className, ...props }, ref) => (
  <Slot className="flex items-center h-full w-full" ref={ref} {...props} />
));
ChartBars.displayName = "ChartBars";

const ChartBar = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ className, ...props }, ref) => (
  <Slot
    className="flex-1 flex items-center justify-center"
    ref={ref}
    {...props}
  />
));
ChartBar.displayName = "ChartBar";

const ChartTooltip = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ className, ...props }, ref) => (
  <Slot
    className="absolute z-10 opacity-0 transition-opacity duration-100 data-[state=open]:opacity-100"
    ref={ref}
    {...props}
  />
));
ChartTooltip.displayName = "ChartTooltip";

const ChartTooltipContent = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ className, ...props }, ref) => (
  <Slot
    className="rounded-md border bg-popover p-4 text-popover-foreground shadow-md"
    ref={ref}
    {...props}
  />
));
ChartTooltipContent.displayName = "ChartTooltipContent";

interface ChartTooltipItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number;
}

const ChartTooltipItem = React.forwardRef<
  HTMLDivElement,
  ChartTooltipItemProps
>(({ className, label, value, ...props }, ref) => {
  return (
    <div className="flex items-center justify-between" ref={ref} {...props}>
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm text-muted-foreground">{value}</span>
    </div>
  );
});
ChartTooltipItem.displayName = "ChartTooltipItem";

export {
  Chart,
  ChartContainer,
  ChartBars,
  ChartBar,
  ChartTooltip,
  ChartTooltipContent,
  ChartTooltipItem,
};
