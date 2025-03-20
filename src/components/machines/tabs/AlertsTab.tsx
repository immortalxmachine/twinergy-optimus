
import React from 'react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Check } from 'lucide-react';

interface Alert {
  id: string;
  message: string;
  severity: string;
  timestamp: string;
}

interface AlertsTabProps {
  alerts: Alert[];
}

export default function AlertsTab({ alerts }: AlertsTabProps) {
  return (
    <DashboardCard
      title="Machine Alerts"
      description="Recent warnings and alerts for this machine"
    >
      <div className="p-4">
        {alerts.length > 0 ? (
          <div className="space-y-4">
            {alerts.map(alert => (
              <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg bg-warning/5 border-warning/20">
                <div className="flex h-8 w-8 rounded-full bg-warning/10 items-center justify-center shrink-0">
                  <AlertCircle className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{alert.message}</p>
                    <Badge variant="outline" className={`text-xs bg-${alert.severity}/10 text-${alert.severity}`}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">Investigate</Button>
                    <Button size="sm" variant="ghost">Dismiss</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-12 w-12 rounded-full bg-success/10 items-center justify-center mb-4">
              <Check className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-lg font-medium">No Active Alerts</h3>
            <p className="text-muted-foreground mt-1 max-w-md">
              This machine is currently operating normally with no active alerts or warnings.
            </p>
          </div>
        )}
      </div>
    </DashboardCard>
  );
}
