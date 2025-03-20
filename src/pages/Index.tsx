
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  TrendingDown, 
  Cpu, 
  BellRing, 
  Factory, 
  ArrowRight,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import PowerConsumptionChart from '@/components/dashboard/PowerConsumptionChart';
import MachineStatusGrid from '@/components/dashboard/MachineStatusGrid';
import AIRecommendations from '@/components/dashboard/AIRecommendations';
import MetricCard from '@/components/dashboard/MetricCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PowerConsumptionReport from '@/components/dashboard/PowerConsumptionReport';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const [showReport, setShowReport] = useState(false);
  const { toast } = useToast();

  const handleGenerateReport = () => {
    // Show loading toast
    toast({
      title: "Generating Report",
      description: "Analyzing factory data and preparing your report...",
      duration: 1500,
    });
    
    // Simulate processing time then show the report
    setTimeout(() => {
      setShowReport(true);
    }, 1500);
  };

  return (
    <Layout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Monitor and optimize your factory's power consumption
            </p>
          </div>
          <Button size="sm" className="shrink-0 h-9 gap-1" onClick={handleGenerateReport}>
            <Sparkles size={16} />
            <span>Generate Report</span>
          </Button>
        </div>
        
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="Power Consumption"
            value="2,456 kWh"
            icon={<Zap size={18} />}
            change={{ value: 12.5, type: 'decrease' }}
            trend="positive"
            subtitle="vs. last month"
          />
          
          <MetricCard 
            title="Cost Savings"
            value="$4,350"
            icon={<TrendingDown size={18} />}
            change={{ value: 8.3, type: 'increase' }}
            trend="positive"
            subtitle="vs. last month"
          />
          
          <MetricCard 
            title="Active Machines"
            value="14 / 18"
            icon={<Cpu size={18} />}
            change={{ value: 0, type: 'neutral' }}
            trend="neutral"
          />
          
          <MetricCard 
            title="Alerts"
            value="3"
            icon={<BellRing size={18} />}
            change={{ value: 2, type: 'decrease' }}
            trend="positive"
            subtitle="vs. yesterday"
          />
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Power Consumption Chart */}
          <DashboardCard
            title="Power Consumption"
            description="Historical and predicted energy usage with AI optimized suggestions"
            className="lg:col-span-2"
          >
            <PowerConsumptionChart />
          </DashboardCard>
          
          {/* AI Recommendations */}
          <DashboardCard
            title="AI Recommendations"
            description="Optimize your energy usage with these insights"
            footer={
              <Link to="/ai-insights" className="inline-flex items-center text-sm text-primary hover:underline gap-1">
                <span>View all recommendations</span>
                <ArrowRight size={14} />
              </Link>
            }
          >
            <AIRecommendations limit={3} />
          </DashboardCard>
        </div>
        
        {/* Machine Status Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold tracking-tight">Machine Status</h2>
                <Badge variant="outline" className="text-xs font-normal">6 of 18</Badge>
              </div>
              <p className="text-muted-foreground mt-1">Monitor the real-time status of your machines</p>
            </div>
            
            <Link to="/machines">
              <Button variant="ghost" size="sm" className="gap-1">
                <span>View All</span>
                <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
          
          <MachineStatusGrid limit={6} />
        </div>
        
        {/* Factory Performance */}
        <DashboardCard
          title="Factory Performance"
          description="Overall efficiency and production metrics"
          isGlass={true}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 py-4">
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="hsl(var(--muted))" 
                    strokeWidth="10" 
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="10" 
                    strokeDasharray="282.7"
                    strokeDashoffset="56.6" 
                    transform="rotate(-90 50 50)" 
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-semibold">80%</span>
                  <span className="text-xs text-muted-foreground">Efficiency</span>
                </div>
              </div>
            </div>
            
            <div className="flex-grow grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              <div className="space-y-1 text-center p-3 bg-muted/30 rounded-md">
                <p className="text-muted-foreground text-xs">Production Rate</p>
                <p className="text-lg font-medium">125 units/h</p>
                <p className="text-xs text-success">+5.2%</p>
              </div>
              
              <div className="space-y-1 text-center p-3 bg-muted/30 rounded-md">
                <p className="text-muted-foreground text-xs">Uptime</p>
                <p className="text-lg font-medium">94.8%</p>
                <p className="text-xs text-success">+1.2%</p>
              </div>
              
              <div className="space-y-1 text-center p-3 bg-muted/30 rounded-md">
                <p className="text-muted-foreground text-xs">Quality Rate</p>
                <p className="text-lg font-medium">99.2%</p>
                <p className="text-xs text-success">+0.5%</p>
              </div>
              
              <div className="space-y-1 text-center p-3 bg-muted/30 rounded-md">
                <p className="text-muted-foreground text-xs">Energy per Unit</p>
                <p className="text-lg font-medium">3.2 kWh</p>
                <p className="text-xs text-success">-8.5%</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-2">
            <Button variant="outline" className="gap-1.5">
              <Factory size={16} />
              <span>Factory Floor View</span>
            </Button>
          </div>
        </DashboardCard>
      </div>

      {/* Render the report modal when showReport is true */}
      {showReport && <PowerConsumptionReport onClose={() => setShowReport(false)} />}
    </Layout>
  );
}
