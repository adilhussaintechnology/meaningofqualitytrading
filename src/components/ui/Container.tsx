"use client";

import type { PropsWithChildren, HTMLAttributes } from "react";
import clsx from "clsx";

export default function Container({
  children,
  className,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
