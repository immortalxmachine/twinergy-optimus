
import React, { useState } from 'react';
import { Gauge, ArrowRight, ArrowUpRight, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardCard from '@/components/dashboard/DashboardCard';

export default function EfficiencyMetrics() {
  const [timeframe, setTimeframe] = useState('current');
  
  const timeframeData = {
    'current': {
      overall: 72,
      trend: '+2.8%',
      departments: [
        { name: 'Assembly Line', efficiency: 68, trend: '+3.2%', color: 'bg-primary/80' },
        { name: 'Packaging Unit', efficiency: 76, trend: '+1.8%', color: 'bg-success/80' },
        { name: 'Heating & Cooling', efficiency: 62, trend: '+4.5%', color: 'bg-warning/80' },
        { name: 'Quality Control', efficiency: 82, trend: '+0.9%', color: 'bg-info/80' },
      ]
    },
    'previous': {
      overall: 69,
      trend: '+1.5%',
      departments: [
        { name: 'Assembly Line', efficiency: 65, trend: '+2.1%', color: 'bg-primary/80' },
        { name: 'Packaging Unit', efficiency: 74, trend: '+0.8%', color: 'bg-success/80' },
        { name: 'Heating & Cooling', efficiency: 58, trend: '+2.2%', color: 'bg-warning/80' },
        { name: 'Quality Control', efficiency: 81, trend: '+0.5%', color: 'bg-info/80' },
      ]
    },
    'target': {
      overall: 80,
      trend: '+8.0%',
      departments: [
        { name: 'Assembly Line', efficiency: 78, trend: '+10.0%', color: 'bg-primary/80' },
        { name: 'Packaging Unit', efficiency: 85, trend: '+9.0%', color: 'bg-success/80' },
        { name: 'Heating & Cooling', efficiency: 75, trend: '+13.0%', color: 'bg-warning/80' },
        { name: 'Quality Control', efficiency: 90, trend: '+8.0%', color: 'bg-info/80' },
      ]
    }
  };
  
  const currentData = timeframeData[timeframe as keyof typeof timeframeData];
  
  const getEfficiencyColor = (value: number) => {
    if (value >= 80) return 'bg-success text-success-foreground';
    if (value >= 70) return 'bg-info text-info-foreground';
    if (value >= 60) return 'bg-warning text-warning-foreground';
    return 'bg-destructive text-destructive-foreground';
  };
  
  const calculateStrokeDashoffset = (percentage: number) => {
    // Circle circumference is 2πr, where r=54
    const circumference = 2 * Math.PI * 54;
    return circumference - (circumference * percentage / 100);
  };

  return (
    <DashboardCard
      title="Factory Efficiency Overview"
      description="Current operational efficiency across all departments"
      icon={Gauge}
      footer={
        <div className="flex justify-end px-4 py-2 border-t">
          <Button variant="link" className="gap-1.5 text-sm h-auto">
            <span>View detailed metrics</span>
            <ArrowRight size={14} />
          </Button>
        </div>
      }
    >
      <div className="p-4">
        <Tabs value={timeframe} onValueChange={setTimeframe} className="mb-4">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="previous">Previous Month</TabsTrigger>
            <TabsTrigger value="target">Target</TabsTrigger>
          </TabsList>
        </Tabs>
        
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
                  strokeDashoffset={calculateStrokeDashoffset(currentData.overall)} 
                  transform="rotate(-90 60 60)" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold">{currentData.overall}%</span>
                <span className="text-sm text-muted-foreground mt-1">Overall Efficiency</span>
                <span className="text-sm text-success flex items-center mt-1">
                  <ArrowUpRight size={14} className="mr-1" />
                  {currentData.trend} vs last month
                </span>
              </div>
            </div>
            
            <div className="flex items-center mt-4 text-sm text-muted-foreground">
              <Calendar size={14} className="mr-1" />
              <span>
                {timeframe === 'current' && 'June 2023'}
                {timeframe === 'previous' && 'May 2023'}
                {timeframe === 'target' && 'December 2023 (Projected)'}
              </span>
            </div>
          </div>

          {/* Department Efficiency Metrics */}
          <div className="space-y-4">
            {currentData.departments.map((dept, index) => (
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
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
