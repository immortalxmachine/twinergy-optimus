
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

interface ReportHeaderProps {
  onClose: () => void;
}

export default function ReportHeader({ onClose }: ReportHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <CardTitle className="text-2xl">Factory Power Consumption Monitoring & Optimization Report</CardTitle>
        <CardDescription>
          Insights and recommendations for achieving a 20% reduction in power consumption
        </CardDescription>
      </div>
      <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
        <X size={18} />
      </Button>
    </div>
  );
}
