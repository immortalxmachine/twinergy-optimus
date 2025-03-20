
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import PowerConsumptionChart from '@/components/dashboard/PowerConsumptionChart';
import MetricsOverview from '@/components/dashboard/MetricsOverview';
import EnergyTrendsChart from '@/components/analytics/EnergyTrendsChart';
import CostAnalysisChart from '@/components/analytics/CostAnalysisChart';
import EfficiencyMetrics from '@/components/analytics/EfficiencyMetrics';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DownloadCloud, 
  Calendar, 
  PieChart, 
  BarChart, 
  LineChart,
  TrendingDown,
  Filter
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Analytics() {
  const [dateRange, setDateRange] = useState('30days');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    assembly: true,
    packaging: true,
    heating: true,
    qualityControl: true
  });

  const handleFilterChange = (key: string) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
        
        {/* Metrics Overview */}
        <MetricsOverview />
        
        {/* Controls and Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Tabs defaultValue="power" className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
              <TabsList className="grid grid-cols-3 w-full sm:w-[360px]">
                <TabsTrigger value="power">Power</TabsTrigger>
                <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
                <TabsTrigger value="cost">Cost</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <DropdownMenu open={filterOpen} onOpenChange={setFilterOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1.5 w-full sm:w-auto">
                      <Filter size={16} />
                      <span>Departments</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter Departments</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem 
                      checked={filters.assembly}
                      onCheckedChange={() => handleFilterChange('assembly')}
                    >
                      Assembly Line
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem 
                      checked={filters.packaging}
                      onCheckedChange={() => handleFilterChange('packaging')}
                    >
                      Packaging Unit
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem 
                      checked={filters.heating}
                      onCheckedChange={() => handleFilterChange('heating')}
                    >
                      Heating & Cooling
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem 
                      checked={filters.qualityControl}
                      onCheckedChange={() => handleFilterChange('qualityControl')}
                    >
                      Quality Control
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1.5 w-full sm:w-auto">
                      <Calendar size={16} />
                      <span>Last 30 Days</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem 
                      checked={dateRange === '7days'} 
                      onCheckedChange={() => setDateRange('7days')}
                    >
                      Last 7 Days
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem 
                      checked={dateRange === '30days'} 
                      onCheckedChange={() => setDateRange('30days')}
                    >
                      Last 30 Days
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem 
                      checked={dateRange === '90days'} 
                      onCheckedChange={() => setDateRange('90days')}
                    >
                      Last 90 Days
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem 
                      checked={dateRange === 'year'} 
                      onCheckedChange={() => setDateRange('year')}
                    >
                      Last Year
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Main Content */}
            <TabsContent value="power" className="mt-6 space-y-6">
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
                  <EnergyTrendsChart chartType="pie" />
                </DashboardCard>
                
                <DashboardCard
                  title="Peak Power Usage Times"
                  description="Identifying high consumption periods for potential optimization"
                >
                  <EnergyTrendsChart chartType="bar" />
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
            
            <TabsContent value="efficiency" className="mt-6 space-y-6">
              <EfficiencyMetrics />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard
                  title="Efficiency by Department"
                  description="Comparing operational efficiency across factory departments"
                >
                  <EnergyTrendsChart chartType="bar" metric="efficiency" />
                </DashboardCard>
                
                <DashboardCard
                  title="Efficiency Trends"
                  description="Tracking efficiency improvements over time"
                >
                  <EnergyTrendsChart chartType="line" metric="efficiency" />
                </DashboardCard>
              </div>
              
              <DashboardCard
                title="Efficiency Optimization Potential"
                description="Areas with highest improvement opportunity"
              >
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Assembly Line</span>
                        <span className="text-sm">68% → 85% potential</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-info rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Packaging Unit</span>
                        <span className="text-sm">76% → 90% potential</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-info rounded-full" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Heating & Cooling</span>
                        <span className="text-sm">62% → 80% potential</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-info rounded-full" style={{ width: '62%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Quality Control</span>
                        <span className="text-sm">82% → 95% potential</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-info rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </TabsContent>
            
            <TabsContent value="cost" className="mt-6 space-y-6">
              <CostAnalysisChart />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard
                  title="Energy Cost By Source"
                  description="Breakdown of energy costs by source and utility"
                >
                  <div className="p-4 h-[320px]">
                    <div className="h-full w-full">
                      <EnergyTrendsChart chartType="pie" metric="cost" />
                    </div>
                  </div>
                </DashboardCard>
                
                <DashboardCard
                  title="Cost Savings Projections"
                  description="Projected cost savings based on optimization strategies"
                >
                  <div className="p-4 h-[320px]">
                    <div className="h-full w-full">
                      <EnergyTrendsChart chartType="line" metric="cost-savings" />
                    </div>
                  </div>
                </DashboardCard>
              </div>
              
              <DashboardCard
                title="Cost Reduction Opportunities"
                description="Actionable strategies to reduce operational costs"
              >
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <h3 className="font-medium">Energy Rate Optimization</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Negotiating better energy rates during off-peak hours
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$2,450</p>
                      <p className="text-sm text-muted-foreground">Annual Savings</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <h3 className="font-medium">Equipment Upgrades</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Replacing older equipment with energy-efficient models
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$8,200</p>
                      <p className="text-sm text-muted-foreground">Annual Savings</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Process Optimization</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Streamlining production workflows to reduce energy waste
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$5,600</p>
                      <p className="text-sm text-muted-foreground">Annual Savings</p>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
