
// Mock machine data - in a real app, this would come from an API
export const machineData = {
  'm001': {
    id: 'm001',
    name: 'CNC Machine #1',
    type: 'CNC',
    status: 'active',
    powerConsumption: 3.2,
    temperature: 42.5,
    uptime: 97.8,
    lastMaintenance: '2023-12-15',
    nextMaintenance: '2024-06-15',
    efficiency: 89.5,
    alerts: [
      { id: 'a1', message: 'Temperature spike detected', severity: 'medium', timestamp: '2024-05-10T14:32:00Z' }
    ]
  },
  'm002': {
    id: 'm002',
    name: 'Injection Molder #2',
    type: 'Injection Molder',
    status: 'maintenance',
    powerConsumption: 1.5,
    temperature: 38.2,
    uptime: 82.3,
    lastMaintenance: '2024-04-01',
    nextMaintenance: '2024-07-01',
    efficiency: 75.2,
    alerts: []
  },
  'm003': {
    id: 'm003',
    name: 'Assembly Robot #3',
    type: 'Robot',
    status: 'idle',
    powerConsumption: 0.8,
    temperature: 31.5,
    uptime: 99.1,
    lastMaintenance: '2024-02-20',
    nextMaintenance: '2024-08-20',
    efficiency: 95.7,
    alerts: []
  },
  'm004': {
    id: 'm004',
    name: 'Laser Cutter #4',
    type: 'Laser Cutter',
    status: 'active',
    powerConsumption: 4.7,
    temperature: 48.3,
    uptime: 91.2,
    lastMaintenance: '2024-03-10',
    nextMaintenance: '2024-09-10',
    efficiency: 92.8,
    alerts: []
  },
  'm005': {
    id: 'm005',
    name: 'Packaging Line #5',
    type: 'Packaging',
    status: 'active',
    powerConsumption: 2.1,
    temperature: 35.6,
    uptime: 94.5,
    lastMaintenance: '2024-01-25',
    nextMaintenance: '2024-07-25',
    efficiency: 88.3,
    alerts: []
  },
  'm006': {
    id: 'm006',
    name: 'Conveyor System #6',
    type: 'Conveyor',
    status: 'offline',
    powerConsumption: 0,
    temperature: 22.0,
    uptime: 76.4,
    lastMaintenance: '2023-11-05',
    nextMaintenance: '2024-05-05',
    efficiency: 65.9,
    alerts: [
      { id: 'a2', message: 'Motor failure detected', severity: 'high', timestamp: '2024-05-08T09:15:00Z' },
      { id: 'a3', message: 'Maintenance overdue', severity: 'medium', timestamp: '2024-05-05T00:00:00Z' }
    ]
  }
};

export type MachineType = typeof machineData[keyof typeof machineData];

export type MachineStatus = 'active' | 'idle' | 'maintenance' | 'offline';

export type Alert = {
  id: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
};
