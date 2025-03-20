
import React from 'react';
import MachineStatCard from './MachineStatCard';
import { Bolt, Thermometer, Clock, BarChart3 } from 'lucide-react';

interface MachineStatsProps {
  machine: {
    powerConsumption: number;
    temperature: number;
    uptime: number;
    efficiency: number;
  };
}

export default function MachineStats({ machine }: MachineStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <MachineStatCard 
        icon={Bolt} 
        label="Power Consumption" 
        value={machine.powerConsumption} 
        unit=" kW" 
      />
      
      <MachineStatCard 
        icon={Thermometer} 
        label="Temperature" 
        value={machine.temperature} 
        unit="°C" 
      />
      
      <MachineStatCard 
        icon={Clock} 
        label="Uptime" 
        value={machine.uptime} 
        unit="%" 
      />
      
      <MachineStatCard 
        icon={BarChart3} 
        label="Efficiency" 
        value={machine.efficiency} 
        unit="%" 
      />
    </div>
  );
}
