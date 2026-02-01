"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "destructive" | "outline";

interface BaseProps {
  variant?: Variant;
  fullWidth?: boolean;
  asChild?: boolean; // render anchor instead of button
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({
  variant = "primary",
  fullWidth = false,
  asChild = false,
  className,
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2";

  const variants: Record<Variant, string> = {
    primary:
      "bg-primary text-primary-foreground hover:opacity-90 focus-visible:ring-primary",
    secondary:
      "bg-muted text-foreground hover:bg-muted/80 focus-visible:ring-muted",
ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-800",


    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500",
  };

  const classes = clsx(base, variants[variant], fullWidth && "w-full", className);

  if (asChild) {
    // Render as anchor (expects href in props)
    return <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</a>;
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
