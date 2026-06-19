'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React from 'react';

/** Light by default; user can switch to dark (persisted by next-themes). */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
