
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Shield, 
  Bell, 
  Gauge, 
  Cable
} from 'lucide-react';

interface SettingsSidebarProps {
  defaultValue?: string;
}

export function SettingsSidebar({ defaultValue = "profile" }: SettingsSidebarProps) {
  return (
    <div className="col-span-12 md:col-span-3 space-y-4">
      <Tabs defaultValue={defaultValue} orientation="vertical" className="w-full">
        <TabsList className="flex flex-col h-auto bg-background p-0 justify-start space-y-1">
          <TabsTrigger value="profile" className="w-full justify-start text-left px-3 py-2 data-[state=active]:bg-primary/10">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="w-full justify-start text-left px-3 py-2 data-[state=active]:bg-primary/10">
            <Shield className="mr-2 h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="w-full justify-start text-left px-3 py-2 data-[state=active]:bg-primary/10">
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="w-full justify-start text-left px-3 py-2 data-[state=active]:bg-primary/10">
            <Gauge className="mr-2 h-4 w-4" />
            <span>System</span>
          </TabsTrigger>
          <TabsTrigger value="connections" className="w-full justify-start text-left px-3 py-2 data-[state=active]:bg-primary/10">
            <Cable className="mr-2 h-4 w-4" />
            <span>Connections</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
