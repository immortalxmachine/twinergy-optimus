
import React from 'react';
import { Gauge, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import DashboardCard from '@/components/dashboard/DashboardCard';

export default function EfficiencyMetrics() {
  const departments = [
    { name: 'Assembly Line', efficiency: 68, trend: '+3.2%', color: 'bg-primary/80' },
    { name: 'Packaging Unit', efficiency: 76, trend: '+1.8%', color: 'bg-success/80' },
    { name: 'Heating & Cooling', efficiency: 62, trend: '+4.5%', color: 'bg-warning/80' },
    { name: 'Quality Control', efficiency: 82, trend: '+0.9%', color: 'bg-info/80' },
  ];

  const getEfficiencyColor = (value: number) => {
    if (value >= 80) return 'bg-success text-success-foreground';
    if (value >= 70) return 'bg-info text-info-foreground';
    if (value >= 60) return 'bg-warning text-warning-foreground';
    return 'bg-destructive text-destructive-foreground';
  };

  return (
    <DashboardCard
      title="Factory Efficiency Overview"
      description="Current operational efficiency across all departments"
      icon={Gauge}
    >
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Efficiency Gauge */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle 
                  cx="60" 
                  cy="60" 
                  r="54" 
                  fill="none" 
                  stroke="hsl(var(--muted))" 
                  strokeWidth="12" 
                />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="54" 
                  fill="none" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="12" 
                  strokeDasharray="339.3"
                  strokeDashoffset="88.2" 
                  transform="rotate(-90 60 60)" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold">72%</span>
                <span className="text-sm text-muted-foreground mt-1">Overall Efficiency</span>
                <span className="text-sm text-success flex items-center mt-1">
                  <ArrowUpRight size={14} className="mr-1" />
                  +2.8% vs last month
                </span>
              </div>
            </div>
          </div>

          {/* Department Efficiency Metrics */}
          <div className="space-y-4">
            {departments.map((dept, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{dept.name}</span>
                  <div className="flex items-center">
                    <span className={`text-xs py-0.5 px-2 rounded-full ${getEfficiencyColor(dept.efficiency)}`}>
                      {dept.efficiency}%
                    </span>
                    <span className="text-xs text-success ml-2 flex items-center">
                      {dept.trend}
                    </span>
                  </div>
                </div>
                <div className="relative pt-1">
                  <Progress value={dept.efficiency} className="h-2" />
                </div>
              </div>
            ))}

            <div className="pt-4 mt-4 border-t flex justify-end">
              <button className="text-sm text-primary flex items-center hover:underline">
                <span>View detailed metrics</span>
                <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
