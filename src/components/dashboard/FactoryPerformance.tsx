
import React from 'react';
import { Factory } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';

export default function FactoryPerformance() {
  return (
    <DashboardCard
      title="Factory Performance"
      description="Overall efficiency and production metrics"
      isGlass={true}
    >
      <div className="flex flex-col md:flex-row items-center gap-6 py-4">
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="hsl(var(--muted))" 
                strokeWidth="10" 
              />
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="10" 
                strokeDasharray="282.7"
                strokeDashoffset="56.6" 
                transform="rotate(-90 50 50)" 
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-semibold">80%</span>
              <span className="text-xs text-muted-foreground">Efficiency</span>
            </div>
          </div>
        </div>
        
        <div className="flex-grow grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          <div className="space-y-1 text-center p-3 bg-muted/30 rounded-md">
            <p className="text-muted-foreground text-xs">Production Rate</p>
            <p className="text-lg font-medium">125 units/h</p>
            <p className="text-xs text-success">+5.2%</p>
          </div>
          
          <div className="space-y-1 text-center p-3 bg-muted/30 rounded-md">
            <p className="text-muted-foreground text-xs">Uptime</p>
            <p className="text-lg font-medium">94.8%</p>
            <p className="text-xs text-success">+1.2%</p>
          </div>
          
          <div className="space-y-1 text-center p-3 bg-muted/30 rounded-md">
            <p className="text-muted-foreground text-xs">Quality Rate</p>
            <p className="text-lg font-medium">99.2%</p>
            <p className="text-xs text-success">+0.5%</p>
          </div>
          
          <div className="space-y-1 text-center p-3 bg-muted/30 rounded-md">
            <p className="text-muted-foreground text-xs">Energy per Unit</p>
            <p className="text-lg font-medium">3.2 kWh</p>
            <p className="text-xs text-success">-8.5%</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-2">
        <Button variant="outline" className="gap-1.5">
          <Factory size={16} />
          <span>Factory Floor View</span>
        </Button>
      </div>
    </DashboardCard>
  );
}
