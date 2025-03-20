
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Save } from 'lucide-react';

export function ProfileSettings() {
  return (
    <TabsContent value="profile" className="m-0">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Manage your profile information and account preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="Factory Admin" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue="admin@twinergy.com" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" defaultValue="Operations Manager" />
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
