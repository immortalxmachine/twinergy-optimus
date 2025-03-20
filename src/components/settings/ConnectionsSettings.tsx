
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Cloud, Shield, Bell } from 'lucide-react';

export function ConnectionsSettings() {
  return (
    <TabsContent value="connections" className="m-0">
      <CardHeader>
        <CardTitle>External Connections</CardTitle>
        <CardDescription>
          Manage integrations with other systems and services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex items-center gap-2">
              <Cloud className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Cloud Storage</p>
                <p className="text-sm text-muted-foreground">
                  Connected to AWS S3
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Connected to Auth0
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Notification Service</p>
                <p className="text-sm text-muted-foreground">
                  Connected to SendGrid
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        </div>
        
        <div className="pt-4">
          <Button variant="outline" className="w-full">
            <span>Add New Connection</span>
          </Button>
        </div>
      </CardContent>
    </TabsContent>
  );
}
