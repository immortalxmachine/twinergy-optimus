
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  onGenerateReport: () => void;
}

export default function DashboardHeader({ onGenerateReport }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monitor and optimize your factory's power consumption
        </p>
      </div>
      <Button size="sm" className="shrink-0 h-9 gap-1" onClick={onGenerateReport}>
        <Sparkles size={16} />
        <span>Generate Report</span>
      </Button>
    </div>
  );
}
