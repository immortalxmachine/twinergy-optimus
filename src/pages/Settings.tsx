
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Save, 
  User, 
  Shield, 
  Bell, 
  Gauge, 
  Cable,
  Cloud
} from 'lucide-react';

export default function Settings() {
  return (
    <Layout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure your application preferences and system settings
            </p>
          </div>
        </div>
        
        {/* Settings Content */}
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 space-y-4">
            <Tabs defaultValue="profile" orientation="vertical" className="w-full">
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
          
          {/* Main Content */}
          <div className="col-span-12 md:col-span-9">
            <Card>
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
              
              <TabsContent value="security" className="m-0">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and access controls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch id="two-factor" />
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
              
              <TabsContent value="notifications" className="m-0">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications on your device
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive urgent notifications via SMS
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
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
