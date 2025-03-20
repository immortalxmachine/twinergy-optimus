
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MachineStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
}

export default function MachineStatCard({ icon: Icon, label, value, unit }: MachineStatCardProps) {
  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Icon className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-2xl font-semibold">{value}{unit}</div>
    </div>
  );
}
