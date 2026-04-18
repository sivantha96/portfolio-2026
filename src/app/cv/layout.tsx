import type { Viewport } from 'next';
import React from 'react';

export const viewport: Viewport = {
  width: 920,
  initialScale: 1,
};

export default function CVLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
