
import React from 'react';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  trend?: 'positive' | 'negative' | 'neutral';
  subtitle?: string;
  className?: string;
}

export default function MetricCard({
  title,
  value,
  icon,
  change,
  trend = 'neutral',
  subtitle,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden border bg-card px-4 py-4 transition-all duration-300 hover:shadow-sm animate-scale",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
          
          {change && (
            <div className="mt-1 flex items-center gap-1">
              {change.type === 'increase' && (
                <ArrowUp 
                  size={14} 
                  className={cn(
                    trend === 'positive' ? 'text-success' : 'text-destructive',
                    trend === 'neutral' && 'text-muted-foreground'
                  )} 
                />
              )}
              
              {change.type === 'decrease' && (
                <ArrowDown 
                  size={14} 
                  className={cn(
                    trend === 'positive' ? 'text-success' : 'text-destructive',
                    trend === 'neutral' && 'text-muted-foreground'
                  )} 
                />
              )}
              
              {change.type === 'neutral' && (
                <Minus 
                  size={14} 
                  className="text-muted-foreground" 
                />
              )}
              
              <span 
                className={cn(
                  "text-xs font-medium",
                  change.type === 'increase' && trend === 'positive' && 'text-success',
                  change.type === 'decrease' && trend === 'negative' && 'text-success',
                  change.type === 'increase' && trend === 'negative' && 'text-destructive',
                  change.type === 'decrease' && trend === 'positive' && 'text-destructive',
                  change.type === 'neutral' && 'text-muted-foreground'
                )}
              >
                {change.value > 0 ? `${change.value}%` : 'No change'}
              </span>
              
              {subtitle && (
                <span className="text-xs text-muted-foreground">
                  {subtitle}
                </span>
              )}
            </div>
          )}
        </div>
        
        {icon && (
          <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
