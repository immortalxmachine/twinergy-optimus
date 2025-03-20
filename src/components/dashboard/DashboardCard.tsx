
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  isGlass?: boolean;
  isHoverable?: boolean;
}

export default function DashboardCard({
  title,
  description,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  children,
  footer,
  isGlass = false,
  isHoverable = false,
}: DashboardCardProps) {
  return (
    <Card 
      className={cn(
        "border overflow-hidden transition-all duration-300 animate-scale",
        isGlass && "glass-card",
        isHoverable && "hoverable-card",
        className
      )}
    >
      <CardHeader className={cn("pb-2", headerClassName)}>
        {title && <CardTitle className="text-lg font-medium">{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={cn("pt-2", contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn("border-t bg-muted/30 py-3", footerClassName)}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
