
import React from 'react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { XCircle, History } from 'lucide-react';

export default function HistoryTab() {
  return (
    <DashboardCard
      title="Operation History"
      description="Historical data and past operations of this machine"
      icon={History}
    >
      <div className="p-4 flex items-center justify-center h-72">
        <div className="text-center">
          <XCircle className="h-12 w-12 mx-auto text-muted-foreground/40" />
          <h3 className="text-lg font-medium mt-4">History Data Unavailable</h3>
          <p className="text-muted-foreground mt-2 max-w-md">
            Detailed historical data for this machine is not available at this time.
            Please check back later.
          </p>
        </div>
      </div>
    </DashboardCard>
  );
}
