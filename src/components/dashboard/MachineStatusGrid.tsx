
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import StatusIndicator from '../ui/StatusIndicator';
import DashboardCard from './DashboardCard';
import { cn } from '@/lib/utils';

// Sample machine data
const machines = [
  { 
    id: 1, 
    name: 'CNC Mill A', 
    status: 'online',
    powerUsage: 45.2,
    efficiency: 'high',
    temperature: 72.5,
    alerts: 0 
  },
  { 
    id: 2, 
    name: 'Packaging Line B', 
    status: 'online',
    powerUsage: 36.8,
    efficiency: 'medium',
    temperature: 68.3,
    alerts: 0 
  },
  { 
    id: 3, 
    name: 'Assembly Robot C', 
    status: 'idle',
    powerUsage: 12.3,
    efficiency: 'medium',
    temperature: 65.2,
    alerts: 0 
  },
  { 
    id: 4, 
    name: 'Injection Molder D', 
    status: 'online',
    powerUsage: 78.5,
    efficiency: 'low',
    temperature: 86.7,
    alerts: 1 
  },
  { 
    id: 5, 
    name: 'Welding Robot E', 
    status: 'maintenance',
    powerUsage: 0,
    efficiency: 'high',
    temperature: 45.0,
    alerts: 2 
  },
  { 
    id: 6, 
    name: 'Heat Treatment F', 
    status: 'offline',
    powerUsage: 0,
    efficiency: 'medium',
    temperature: 32.1,
    alerts: 0 
  },
];

interface MachineStatusGridProps {
  className?: string;
  limit?: number;
}

export default function MachineStatusGrid({ className, limit = 6 }: MachineStatusGridProps) {
  const displayedMachines = limit ? machines.slice(0, limit) : machines;

  return (
    <div className={cn("data-grid", className)}>
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
              machine.alerts > 0 && "border-warning/50"
            )}
            contentClassName="py-4"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <StatusIndicator status={machine.status} />
                
                {machine.alerts > 0 && (
                  <div className="flex items-center gap-1 text-warning">
                    <AlertTriangle size={16} />
                    <span className="text-sm font-medium">
                      {machine.alerts} {machine.alerts === 1 ? 'alert' : 'alerts'}
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
                      : `${machine.powerUsage} kWh`}
                  </p>
                </div>
                
                <div className="space-y-0.5">
                  <p className="text-muted-foreground">Efficiency</p>
                  <div className="font-medium flex items-center gap-1.5">
                    <span 
                      className={cn(
                        "inline-block h-2.5 w-2.5 rounded-full",
                        machine.efficiency === 'high' && "bg-efficiency-high",
                        machine.efficiency === 'medium' && "bg-efficiency-medium",
                        machine.efficiency === 'low' && "bg-efficiency-low",
                      )} 
                    />
                    <span className="capitalize">{machine.efficiency}</span>
                  </div>
                </div>
                
                <div className="space-y-0.5">
                  <p className="text-muted-foreground">Temperature</p>
                  <p className="font-medium">
                    {machine.status === 'offline'
                      ? '—'
                      : `${machine.temperature}°F`}
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
