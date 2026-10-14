import type { ReactNode } from "react";
import { useLocation } from "react-router";

/** Only animate a new page; query filters and hash links retain local state. */
export function RouteFrame({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return <div key={pathname} className="route-frame">{children}</div>;
}
