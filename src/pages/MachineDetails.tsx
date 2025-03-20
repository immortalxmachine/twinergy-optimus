
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import PowerConsumptionChart from '@/components/dashboard/PowerConsumptionChart';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import StatusIndicator from '@/components/ui/StatusIndicator';
import { 
  ArrowLeft,
  Download,
  AlertCircle,
  History,
  Bolt,
  Clock,
  Thermometer,
  Wrench,
  Cog,
  Check,
  XCircle,
  BarChart3
} from 'lucide-react';

// Mock machine data - in a real app, this would come from an API
const machineData = {
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

export default function MachineDetails() {
  const { id } = useParams<{ id: string }>();
  
  // Get machine data for the specified ID, or show a default state
  const machine = id && machineData[id as keyof typeof machineData];
  
  if (!machine) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
          <AlertCircle className="h-16 w-16 text-muted-foreground/50" />
          <h2 className="text-2xl font-medium">Machine Not Found</h2>
          <p className="text-muted-foreground">The machine with ID {id} could not be found.</p>
          <Button asChild>
            <Link to="/machines" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Machines
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'maintenance':
        return 'warning';
      case 'idle':
        return 'secondary';
      case 'offline':
        return 'destructive';
      default:
        return 'secondary';
    }
  };
  
  return (
    <Layout>
      <div className="space-y-8 animate-slide-up">
        {/* Header with back button */}
        <div className="flex items-center gap-2 mb-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/machines">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </Link>
          </Button>
        </div>
        
        {/* Machine Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-semibold tracking-tight">{machine.name}</h1>
              <StatusIndicator status={getStatusColor(machine.status)} />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="capitalize">
                {machine.type}
              </Badge>
              <Badge variant="outline" className="capitalize">
                ID: {machine.id}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <Button variant="outline" className="gap-1.5" size="sm">
              <Wrench className="h-4 w-4" />
              <span>Maintenance</span>
            </Button>
            <Button variant="outline" className="gap-1.5" size="sm">
              <Cog className="h-4 w-4" />
              <span>Configure</span>
            </Button>
            <Button className="gap-1.5" size="sm">
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </Button>
          </div>
        </div>
        
        {/* Machine Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg border p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Bolt className="h-4 w-4" />
              <span className="text-sm">Power Consumption</span>
            </div>
            <div className="text-2xl font-semibold">{machine.powerConsumption} kW</div>
          </div>
          
          <div className="bg-card rounded-lg border p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Thermometer className="h-4 w-4" />
              <span className="text-sm">Temperature</span>
            </div>
            <div className="text-2xl font-semibold">{machine.temperature}°C</div>
          </div>
          
          <div className="bg-card rounded-lg border p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Uptime</span>
            </div>
            <div className="text-2xl font-semibold">{machine.uptime}%</div>
          </div>
          
          <div className="bg-card rounded-lg border p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm">Efficiency</span>
            </div>
            <div className="text-2xl font-semibold">{machine.efficiency}%</div>
          </div>
        </div>
        
        {/* Machine Data Tabs */}
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid grid-cols-3 sm:grid-cols-4 w-full md:w-[600px]">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="mt-6">
            <DashboardCard
              title="Power Consumption"
              description="Historical and predicted power usage with optimization potential"
            >
              <PowerConsumptionChart className="h-[400px]" />
            </DashboardCard>
          </TabsContent>
          
          <TabsContent value="maintenance" className="mt-6">
            <DashboardCard
              title="Maintenance Schedule"
              description="Past and upcoming maintenance activities for this machine"
            >
              <div className="p-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Next Scheduled Maintenance</h3>
                  <div className="flex items-start gap-4 p-4 border rounded-lg bg-muted/10">
                    <div className="flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center shrink-0">
                      <Wrench className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Routine Maintenance</p>
                      <p className="text-sm text-muted-foreground mt-1">Scheduled for {machine.nextMaintenance}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm">Reschedule</Button>
                        <Button size="sm" variant="outline">Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Maintenance History</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex h-8 w-8 rounded-full bg-success/10 items-center justify-center shrink-0">
                        <Check className="h-4 w-4 text-success" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Preventive Maintenance</p>
                          <Badge variant="outline" className="text-xs">Completed</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Completed on {machine.lastMaintenance}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex h-8 w-8 rounded-full bg-success/10 items-center justify-center shrink-0">
                        <Check className="h-4 w-4 text-success" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Parts Replacement</p>
                          <Badge variant="outline" className="text-xs">Completed</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Completed on 2023-09-10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </TabsContent>
          
          <TabsContent value="alerts" className="mt-6">
            <DashboardCard
              title="Machine Alerts"
              description="Recent warnings and alerts for this machine"
            >
              <div className="p-4">
                {machine.alerts.length > 0 ? (
                  <div className="space-y-4">
                    {machine.alerts.map(alert => (
                      <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg bg-warning/5 border-warning/20">
                        <div className="flex h-8 w-8 rounded-full bg-warning/10 items-center justify-center shrink-0">
                          <AlertCircle className="h-4 w-4 text-warning" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{alert.message}</p>
                            <Badge variant="outline" className={`text-xs bg-${alert.severity}/10 text-${alert.severity}`}>
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(alert.timestamp).toLocaleString()}
                          </p>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline">Investigate</Button>
                            <Button size="sm" variant="ghost">Dismiss</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-12 w-12 rounded-full bg-success/10 items-center justify-center mb-4">
                      <Check className="h-6 w-6 text-success" />
                    </div>
                    <h3 className="text-lg font-medium">No Active Alerts</h3>
                    <p className="text-muted-foreground mt-1 max-w-md">
                      This machine is currently operating normally with no active alerts or warnings.
                    </p>
                  </div>
                )}
              </div>
            </DashboardCard>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <DashboardCard
              title="Operation History"
              description="Historical data and past operations of this machine"
              icon={History}
            >
              <div className="p-4 flex items-center justify-center h-72">
                <div className="text-center">
                  <XCircle className="h-12 w-12 mx-auto text-muted-foreground/40" />
                  <h3 className="text-lg font-medium mt-4">History Data Unavailable</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Detailed historical data for this machine is not available at this time.
                    Please check back later.
                  </p>
                </div>
              </div>
            </DashboardCard>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
