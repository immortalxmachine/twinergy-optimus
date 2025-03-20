
import React from 'react';
import Layout from '@/components/layout/Layout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import PowerConsumptionChart from '@/components/dashboard/PowerConsumptionChart';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DownloadCloud, 
  Calendar, 
  PieChart, 
  BarChart, 
  LineChart,
  TrendingDown
} from 'lucide-react';

export default function Analytics() {
  return (
    <Layout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Detailed analysis and insights for your factory
            </p>
          </div>
          <Button variant="outline" className="shrink-0 gap-1.5 self-start sm:self-auto">
            <DownloadCloud size={16} />
            <span>Export Report</span>
          </Button>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Tabs defaultValue="power" className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-3 w-full sm:w-[360px]">
              <TabsTrigger value="power">Power</TabsTrigger>
              <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
              <TabsTrigger value="cost">Cost</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="sm" className="gap-1.5 w-full sm:w-auto">
            <Calendar size={16} />
            <span>Last 30 Days</span>
          </Button>
        </div>
        
        {/* Main Content */}
        <TabsContent value="power" className="mt-0 space-y-6">
          <DashboardCard
            title="Power Consumption Analysis"
            description="Historical and predicted energy usage with optimization potential"
          >
            <PowerConsumptionChart className="h-[500px]" />
          </DashboardCard>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard
              title="Power Distribution by Machine Type"
              description="Percentage of total power consumed by each machine category"
            >
              <div className="flex justify-center py-4">
                <div className="relative h-64 w-64">
                  <PieChart className="absolute inset-0 text-muted-foreground/20" size={256} />
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <p className="text-lg font-medium">Chart Placeholder</p>
                  </div>
                </div>
              </div>
            </DashboardCard>
            
            <DashboardCard
              title="Peak Power Usage Times"
              description="Identifying high consumption periods for potential optimization"
            >
              <div className="flex justify-center py-4">
                <div className="relative h-64 w-full">
                  <BarChart className="absolute inset-0 text-muted-foreground/20" size={256} style={{ width: '100%' }} />
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <p className="text-lg font-medium">Chart Placeholder</p>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
          
          <DashboardCard
            title="Optimization Insights"
            description="AI-powered suggestions for reducing power consumption"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="border rounded-lg p-4 bg-muted/20">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium">Load Balancing</h3>
                  <TrendingDown className="text-success h-5 w-5" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Staggering startup sequences could reduce peak demand by up to 15% during morning shifts.
                </p>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Potential Savings:</span>
                    <span className="font-medium">420 kWh/month</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-muted/20">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium">Idle Detection</h3>
                  <TrendingDown className="text-success h-5 w-5" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Automated power reduction during detected idle periods could save energy on assembly lines.
                </p>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Potential Savings:</span>
                    <span className="font-medium">850 kWh/month</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-muted/20">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium">Off-Peak Operations</h3>
                  <TrendingDown className="text-success h-5 w-5" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Shifting high-energy processes to off-peak hours could reduce energy costs significantly.
                </p>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Potential Savings:</span>
                    <span className="font-medium">$625/month</span>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
        </TabsContent>
        
        <TabsContent value="efficiency" className="mt-0">
          <div className="h-96 flex items-center justify-center border rounded-lg bg-muted/20">
            <div className="text-center p-6">
              <LineChart className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="text-xl font-medium mt-4">Efficiency Analytics</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Detailed efficiency metrics and analysis will appear here. This section is currently under development.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="cost" className="mt-0">
          <div className="h-96 flex items-center justify-center border rounded-lg bg-muted/20">
            <div className="text-center p-6">
              <BarChart className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="text-xl font-medium mt-4">Cost Analytics</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Detailed cost breakdown and analysis will appear here. This section is currently under development.
              </p>
            </div>
          </div>
        </TabsContent>
      </div>
    </Layout>
  );
}
