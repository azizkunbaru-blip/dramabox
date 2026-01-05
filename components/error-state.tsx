'use client';

import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button className="mt-4" onClick={onRetry}>
          Coba lagi
        </Button>
      )}
    </div>
  );
}
