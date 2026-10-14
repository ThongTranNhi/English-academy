import { StrictMode, type ReactNode } from "react";

/** Nơi gom các provider toàn cục (theme, i18n, query client… khi cần). */
export function AppProviders({ children }: { children: ReactNode }) {
  return <StrictMode>{children}</StrictMode>;
}
