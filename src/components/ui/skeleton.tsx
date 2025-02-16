import { cn } from '@/lib/utils';
import React from 'react';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-[calc(var(--radius)*1rem)] bg-muted',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
