
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import MachineStatusGrid from '@/components/dashboard/MachineStatusGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, PlusCircle } from 'lucide-react';
import { machineData, MachineType } from '@/components/machines/MachineData';
import MachineListView from '@/components/machines/MachineListView';
import { useToast } from '@/hooks/use-toast';
import AddMachineDialog from '@/components/machines/AddMachineDialog';

export default function Machines() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [efficiencyFilter, setEfficiencyFilter] = useState('all');
  const [filteredMachines, setFilteredMachines] = useState<MachineType[]>([]);
  const [showAddMachineDialog, setShowAddMachineDialog] = useState(false);

  // Convert machine data object to array
  const machinesArray = Object.values(machineData);

  // Filter machines based on search query and filters
  useEffect(() => {
    let result = [...machinesArray];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(machine => 
        machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        machine.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(machine => machine.status === statusFilter);
    }
    
    // Apply efficiency filter
    if (efficiencyFilter !== 'all') {
      // Map efficiency ranges to numeric values
      const efficiencyMap: Record<string, [number, number]> = {
        'high': [90, 100],
        'medium': [70, 89.9],
        'low': [0, 69.9]
      };
      
      if (efficiencyFilter in efficiencyMap) {
        const [min, max] = efficiencyMap[efficiencyFilter];
        result = result.filter(machine => 
          machine.efficiency >= min && machine.efficiency <= max
        );
      }
    }
    
    setFilteredMachines(result);
  }, [searchQuery, statusFilter, efficiencyFilter, machinesArray]);

  const handleAddMachine = () => {
    setShowAddMachineDialog(true);
  };

  return (
    <Layout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Machines</h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage all machines in your factory
            </p>
          </div>
          <Button className="shrink-0 gap-1.5 self-start md:self-auto" onClick={handleAddMachine}>
            <PlusCircle size={16} />
            <span>Add Machine</span>
          </Button>
        </div>
        
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5 lg:col-span-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search machines..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="md:col-span-3 lg:col-span-2">
            <Select 
              defaultValue="all"
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-4 lg:col-span-2">
            <Select 
              defaultValue="all"
              value={efficiencyFilter}
              onValueChange={setEfficiencyFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Efficiency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Efficiency</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="lg:col-span-4 hidden lg:block">
            <div className="flex justify-end">
              <Tabs defaultValue="grid">
                <TabsList className="grid grid-cols-2 w-[160px]">
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Machine List */}
        <Tabs defaultValue="grid" className="mt-6">
          <TabsList className="lg:hidden grid grid-cols-2 w-[160px] mb-6">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid" className="mt-0">
            <MachineStatusGrid machines={filteredMachines} />
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <MachineListView machines={filteredMachines} />
          </TabsContent>
        </Tabs>

        {/* Add Machine Dialog */}
        <AddMachineDialog 
          open={showAddMachineDialog} 
          onOpenChange={setShowAddMachineDialog}
          onAddSuccess={() => {
            toast({
              title: "Machine Added",
              description: "The new machine has been added successfully.",
            });
          }} 
        />
      </div>
    </Layout>
  );
}
