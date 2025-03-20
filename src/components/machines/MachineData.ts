
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
  }
};

export type MachineType = typeof machineData[keyof typeof machineData];
