
import React from 'react';
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

export default function Machines() {
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
          <Button className="shrink-0 gap-1.5 self-start md:self-auto">
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
            />
          </div>
          
          <div className="md:col-span-3 lg:col-span-2">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-4 lg:col-span-2">
            <Select defaultValue="all">
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
            <MachineStatusGrid />
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-medium text-sm">Name</th>
                    <th className="text-left p-3 font-medium text-sm">Status</th>
                    <th className="text-left p-3 font-medium text-sm">Power Usage</th>
                    <th className="text-left p-3 font-medium text-sm">Efficiency</th>
                    <th className="text-left p-3 font-medium text-sm">Temperature</th>
                    <th className="text-left p-3 font-medium text-sm">Alerts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">CNC Mill A</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-success"></span>
                        <span>Online</span>
                      </div>
                    </td>
                    <td className="p-3">45.2 kWh</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-efficiency-high"></span>
                        <span>High</span>
                      </div>
                    </td>
                    <td className="p-3">72.5°F</td>
                    <td className="p-3">0</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Packaging Line B</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-success"></span>
                        <span>Online</span>
                      </div>
                    </td>
                    <td className="p-3">36.8 kWh</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-efficiency-medium"></span>
                        <span>Medium</span>
                      </div>
                    </td>
                    <td className="p-3">68.3°F</td>
                    <td className="p-3">0</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Assembly Robot C</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-warning"></span>
                        <span>Idle</span>
                      </div>
                    </td>
                    <td className="p-3">12.3 kWh</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-efficiency-medium"></span>
                        <span>Medium</span>
                      </div>
                    </td>
                    <td className="p-3">65.2°F</td>
                    <td className="p-3">0</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Injection Molder D</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-success"></span>
                        <span>Online</span>
                      </div>
                    </td>
                    <td className="p-3">78.5 kWh</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-efficiency-low"></span>
                        <span>Low</span>
                      </div>
                    </td>
                    <td className="p-3">86.7°F</td>
                    <td className="p-3 text-warning font-medium">1</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Welding Robot E</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-info"></span>
                        <span>Maintenance</span>
                      </div>
                    </td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-efficiency-high"></span>
                        <span>High</span>
                      </div>
                    </td>
                    <td className="p-3">45.0°F</td>
                    <td className="p-3 text-warning font-medium">2</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Heat Treatment F</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-destructive"></span>
                        <span>Offline</span>
                      </div>
                    </td>
                    <td className="p-3">—</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-efficiency-medium"></span>
                        <span>Medium</span>
                      </div>
                    </td>
                    <td className="p-3">32.1°F</td>
                    <td className="p-3">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
