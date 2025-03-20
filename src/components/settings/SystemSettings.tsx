
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Save } from 'lucide-react';

export function SystemSettings() {
  return (
    <TabsContent value="system" className="m-0">
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>
          Configure global system behavior and performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatic Updates</Label>
              <p className="text-sm text-muted-foreground">
                Allow the system to update automatically
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Data Collection</Label>
              <p className="text-sm text-muted-foreground">
                Allow anonymous usage data collection
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>High Performance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Increases processing power but uses more resources
              </p>
            </div>
            <Switch />
          </div>
        </div>
        
        <Separator />
        
        <div className="flex justify-end">
          <Button className="gap-1.5">
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </Button>
        </div>
      </CardContent>
    </TabsContent>
  );
}
