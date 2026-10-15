import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Nút 3D kiểu Duolingo: bóng đáy đặc, bấm thì lún xuống. */
const press = "active:translate-y-[3px] disabled:shadow-none";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-extrabold tracking-wide transition-[transform,box-shadow,background-color,color,border-color,filter] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: cn(press, "bg-primary text-white shadow-[0_4px_0_var(--color-primary-shade)] hover:brightness-110 active:shadow-[0_1px_0_var(--color-primary-shade)]"),
        accent: cn(press, "bg-sun text-navy shadow-[0_4px_0_var(--color-sun-shade)] hover:brightness-105 active:shadow-[0_1px_0_var(--color-sun-shade)]"),
        success: cn(press, "bg-leaf text-navy shadow-[0_4px_0_var(--color-leaf-shade)] hover:brightness-105 active:shadow-[0_1px_0_var(--color-leaf-shade)]"),
        outline: cn(press, "border-2 border-slate-200 bg-white text-navy shadow-[0_4px_0_#e2e8f0] hover:border-primary/40 hover:bg-primary-soft hover:text-primary active:shadow-[0_1px_0_#e2e8f0]"),
        secondary: cn(press, "bg-primary-soft text-primary shadow-[0_4px_0_#c9d3ff] hover:bg-[#dbe3ff] active:shadow-[0_1px_0_#c9d3ff]"),
        ghost: "text-navy hover:bg-primary-soft hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        white: cn(press, "bg-white text-navy shadow-[0_4px_0_rgb(15_23_42/0.22)] hover:bg-slate-50 active:shadow-[0_1px_0_rgb(15_23_42/0.22)]"),
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3.5 text-[13px]",
        lg: "h-13 px-7 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { buttonVariants };
