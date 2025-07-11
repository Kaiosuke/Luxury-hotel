import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center select-none justify-center onl gap-2 transition-all duration-300 ease-in-out whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        primary:
          "bg-blue-500 text-destructive-foreground shadow-sm hover:bg-destructive/90",
        destructive:
          "bg-red-500 text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent text-primary shadow-sm hover:bg-primary-foreground hover:text-primary border-primary",
        third:
          "border border-input bg-transparent text-secondary shadow-sm hover:bg-secondary hover:text-primary border-secondary",
        four: "border border-input bg-transparent text-primary shadow-sm hover:bg-primary-foreground hover:text-primary border-primary",
        secondary:
          "bg-secondary text-primary shadow-sm hover:bg-primary hover:text-secondary border hover:border-secondary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-secondary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "px-5 py-1 text-sm sm:px-6 sm:py-1.5 sm:text-base lg:px-8 lg:py-2.5 lg:text-lg",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
