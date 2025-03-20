
import React from 'react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wrench, Check } from 'lucide-react';

interface MaintenanceTabProps {
  machine: {
    nextMaintenance: string;
    lastMaintenance: string;
  };
}

export default function MaintenanceTab({ machine }: MaintenanceTabProps) {
  return (
    <DashboardCard
      title="Maintenance Schedule"
      description="Past and upcoming maintenance activities for this machine"
    >
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Next Scheduled Maintenance</h3>
          <div className="flex items-start gap-4 p-4 border rounded-lg bg-muted/10">
            <div className="flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center shrink-0">
              <Wrench className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Routine Maintenance</p>
              <p className="text-sm text-muted-foreground mt-1">Scheduled for {machine.nextMaintenance}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm">Reschedule</Button>
                <Button size="sm" variant="outline">Details</Button>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Maintenance History</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="flex h-8 w-8 rounded-full bg-success/10 items-center justify-center shrink-0">
                <Check className="h-4 w-4 text-success" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">Preventive Maintenance</p>
                  <Badge variant="outline" className="text-xs">Completed</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Completed on {machine.lastMaintenance}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="flex h-8 w-8 rounded-full bg-success/10 items-center justify-center shrink-0">
                <Check className="h-4 w-4 text-success" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">Parts Replacement</p>
                  <Badge variant="outline" className="text-xs">Completed</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Completed on 2023-09-10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
