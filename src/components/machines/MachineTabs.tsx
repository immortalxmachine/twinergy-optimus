
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PerformanceTab from './tabs/PerformanceTab';
import MaintenanceTab from './tabs/MaintenanceTab';
import AlertsTab from './tabs/AlertsTab';
import HistoryTab from './tabs/HistoryTab';

interface MachineTabsProps {
  machine: {
    nextMaintenance: string;
    lastMaintenance: string;
    alerts: Array<{
      id: string;
      message: string;
      severity: string;
      timestamp: string;
    }>;
  };
}

export default function MachineTabs({ machine }: MachineTabsProps) {
  return (
    <Tabs defaultValue="performance" className="w-full">
      <TabsList className="grid grid-cols-3 sm:grid-cols-4 w-full md:w-[600px]">
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        <TabsTrigger value="alerts">Alerts</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      
      <TabsContent value="performance" className="mt-6">
        <PerformanceTab />
      </TabsContent>
      
      <TabsContent value="maintenance" className="mt-6">
        <MaintenanceTab machine={machine} />
      </TabsContent>
      
      <TabsContent value="alerts" className="mt-6">
        <AlertsTab alerts={machine.alerts} />
      </TabsContent>
      
      <TabsContent value="history" className="mt-6">
        <HistoryTab />
      </TabsContent>
    </Tabs>
  );
}
