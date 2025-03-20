
import React from 'react';
import { cn } from '@/lib/utils';

type Status = 'online' | 'offline' | 'maintenance' | 'idle' | 'warning';

interface StatusIndicatorProps {
  status: string;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusIndicator({ 
  status, 
  className,
  showLabel = true,
  size = 'md'
}: StatusIndicatorProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'online':
        return 'bg-success';
      case 'idle':
        return 'bg-warning';
      case 'offline':
        return 'bg-destructive';
      case 'maintenance':
        return 'bg-info';
      case 'warning':
        return 'bg-warning';
      default:
        return 'bg-muted-foreground';
    }
  };

  const sizeClasses = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3'
  };

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span 
        className={cn(
          "inline-block rounded-full animate-pulse-soft",
          getStatusColor(status),
          sizeClasses[size]
        )}
      />
      {showLabel && (
        <span className="text-sm capitalize">{status}</span>
      )}
    </div>
  );
}
