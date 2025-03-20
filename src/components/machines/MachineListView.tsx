
import React from 'react';
import { Link } from 'react-router-dom';
import { MachineType } from './MachineData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusIndicator from '@/components/ui/StatusIndicator';

interface MachineListViewProps {
  machines: MachineType[];
}

export default function MachineListView({ machines }: MachineListViewProps) {
  // Helper functions
  const getEfficiencyLevel = (efficiency: number): 'high' | 'medium' | 'low' => {
    if (efficiency >= 90) return 'high';
    if (efficiency >= 70) return 'medium';
    return 'low';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  if (machines.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <h3 className="text-lg font-medium text-muted-foreground">No machines found</h3>
        <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Power Usage</TableHead>
            <TableHead>Efficiency</TableHead>
            <TableHead>Temperature</TableHead>
            <TableHead>Last Maintenance</TableHead>
            <TableHead>Alerts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {machines.map((machine) => (
            <TableRow key={machine.id}>
              <TableCell className="font-medium">
                <Link 
                  to={`/machines/${machine.id}`}
                  className="text-primary hover:underline"
                >
                  {machine.name}
                </Link>
              </TableCell>
              <TableCell>{machine.type}</TableCell>
              <TableCell>
                <StatusIndicator status={machine.status} />
              </TableCell>
              <TableCell>
                {machine.status === 'offline' || machine.status === 'maintenance'
                  ? '—'
                  : `${machine.powerConsumption} kW`}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  <span 
                    className={`inline-block h-2.5 w-2.5 rounded-full bg-efficiency-${getEfficiencyLevel(machine.efficiency)}`} 
                  />
                  <span className="capitalize">{getEfficiencyLevel(machine.efficiency)}</span>
                </div>
              </TableCell>
              <TableCell>
                {machine.status === 'offline'
                  ? '—'
                  : `${machine.temperature}°C`}
              </TableCell>
              <TableCell>{formatDate(machine.lastMaintenance)}</TableCell>
              <TableCell className={machine.alerts.length > 0 ? "text-warning font-medium" : ""}>
                {machine.alerts.length}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
