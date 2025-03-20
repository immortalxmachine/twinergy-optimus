
import React from 'react';
import { Zap, TrendingDown, Cpu, BellRing } from 'lucide-react';
import MetricCard from '@/components/dashboard/MetricCard';

export default function MetricsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard 
        title="Power Consumption"
        value="2,456 kWh"
        icon={<Zap size={18} />}
        change={{ value: 12.5, type: 'decrease' }}
        trend="positive"
        subtitle="vs. last month"
      />
      
      <MetricCard 
        title="Cost Savings"
        value="$4,350"
        icon={<TrendingDown size={18} />}
        change={{ value: 8.3, type: 'increase' }}
        trend="positive"
        subtitle="vs. last month"
      />
      
      <MetricCard 
        title="Active Machines"
        value="14 / 18"
        icon={<Cpu size={18} />}
        change={{ value: 0, type: 'neutral' }}
        trend="neutral"
      />
      
      <MetricCard 
        title="Alerts"
        value="3"
        icon={<BellRing size={18} />}
        change={{ value: 2, type: 'decrease' }}
        trend="positive"
        subtitle="vs. yesterday"
      />
    </div>
  );
}
