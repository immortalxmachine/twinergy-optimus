
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import StatusIndicator from '../ui/StatusIndicator';
import DashboardCard from './DashboardCard';
import { cn } from '@/lib/utils';
import { MachineType } from '../machines/MachineData';

interface MachineStatusGridProps {
  className?: string;
  limit?: number;
  machines: MachineType[];
}

export default function MachineStatusGrid({ className, limit, machines = [] }: MachineStatusGridProps) {
  const displayedMachines = limit ? machines.slice(0, limit) : machines;

  // Helper functions to map data
  const getEfficiencyLevel = (efficiency: number): 'high' | 'medium' | 'low' => {
    if (efficiency >= 90) return 'high';
    if (efficiency >= 70) return 'medium';
    return 'low';
  };

  const getAlertCount = (machine: MachineType): number => {
    return machine.alerts ? machine.alerts.length : 0;
  };

  if (displayedMachines.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <h3 className="text-lg font-medium text-muted-foreground">No machines found</h3>
        <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {displayedMachines.map((machine) => (
        <Link 
          key={machine.id} 
          to={`/machines/${machine.id}`}
          className="focus:outline-none focus:ring-2 focus:ring-primary rounded-lg group"
        >
          <DashboardCard
            title={machine.name}
            isHoverable={true}
            className={cn(
              "h-full",
              getAlertCount(machine) > 0 && "border-warning/50"
            )}
            contentClassName="py-4"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <StatusIndicator status={machine.status} />
                
                {getAlertCount(machine) > 0 && (
                  <div className="flex items-center gap-1 text-warning">
                    <AlertTriangle size={16} />
                    <span className="text-sm font-medium">
                      {getAlertCount(machine)} {getAlertCount(machine) === 1 ? 'alert' : 'alerts'}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="space-y-0.5">
                  <p className="text-muted-foreground">Power</p>
                  <p className="font-medium">
                    {machine.status === 'offline' || machine.status === 'maintenance'
                      ? '—'
                      : `${machine.powerConsumption} kW`}
                  </p>
                </div>
                
                <div className="space-y-0.5">
                  <p className="text-muted-foreground">Efficiency</p>
                  <div className="font-medium flex items-center gap-1.5">
                    <span 
                      className={cn(
                        "inline-block h-2.5 w-2.5 rounded-full",
                        getEfficiencyLevel(machine.efficiency) === 'high' && "bg-efficiency-high",
                        getEfficiencyLevel(machine.efficiency) === 'medium' && "bg-efficiency-medium",
                        getEfficiencyLevel(machine.efficiency) === 'low' && "bg-efficiency-low",
                      )} 
                    />
                    <span className="capitalize">{getEfficiencyLevel(machine.efficiency)}</span>
                  </div>
                </div>
                
                <div className="space-y-0.5">
                  <p className="text-muted-foreground">Temperature</p>
                  <p className="font-medium">
                    {machine.status === 'offline'
                      ? '—'
                      : `${machine.temperature}°C`}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-3">
              <ArrowRight 
                size={16} 
                className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" 
              />
            </div>
          </DashboardCard>
        </Link>
      ))}
    </div>
  );
}
