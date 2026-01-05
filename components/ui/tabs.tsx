import * as React from 'react';
import { cn } from '@/lib/utils';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return <div data-value={value}>{children}</div>;
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TabsList({ className, ...props }: TabsListProps) {
  return <div className={cn('inline-flex gap-2 rounded-lg bg-muted p-1', className)} {...props} />;
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  active?: boolean;
  onSelect?: (value: string) => void;
}

export function TabsTrigger({ className, value, active, onSelect, ...props }: TabsTriggerProps) {
  return (
    <button
      type="button"
      className={cn(
        'rounded-md px-3 py-1.5 text-sm font-medium transition',
        active ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
        className
      )}
      onClick={() => onSelect?.(value)}
      {...props}
    />
  );
}
