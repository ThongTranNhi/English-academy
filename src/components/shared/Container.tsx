import * as React from "react";
import { cn } from "@/lib/utils";

/** Container chuẩn 1280px với gutter responsive. */
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8", className)} {...props} />;
}
