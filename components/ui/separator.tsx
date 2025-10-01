import * as React from "react";
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
};

export function Separator({
  className,
  orientation = "horizontal",
  ...props
}: Props) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={clsx(
        "bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
}
