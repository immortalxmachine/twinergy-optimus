
import React from 'react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import PowerConsumptionChart from '@/components/dashboard/PowerConsumptionChart';

export default function PerformanceTab() {
  return (
    <DashboardCard
      title="Power Consumption"
      description="Historical and predicted power usage with optimization potential"
    >
      <PowerConsumptionChart className="h-[400px]" />
    </DashboardCard>
  );
}
