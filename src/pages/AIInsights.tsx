
import React from 'react';
import Layout from '@/components/layout/Layout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import AIRecommendations from '@/components/dashboard/AIRecommendations';
import AIPredictions from '@/components/dashboard/AIPredictions';
import AIAnalysis from '@/components/dashboard/AIAnalysis';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BrainCircuit, 
  Download, 
  ListFilter, 
  RefreshCw, 
  Sparkles, 
  Lightbulb
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function AIInsights() {
  const { toast } = useToast();

  const handleRefresh = () => {
    toast({
      title: "AI Insights Refreshed",
      description: "All insights and recommendations have been updated with the latest data.",
      duration: 3000,
    });
  };
  
  return (
    <Layout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">AI Insights</h1>
            <p className="text-muted-foreground mt-1">
              Machine learning powered recommendations and insights
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-1.5" onClick={handleRefresh}>
              <RefreshCw size={16} />
              <span>Refresh</span>
            </Button>
            <Button variant="outline" className="gap-1.5">
              <Download size={16} />
              <span>Export</span>
            </Button>
          </div>
        </div>
        
        {/* Controls and Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Tabs defaultValue="recommendations" className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
              <TabsList className="grid grid-cols-3 w-full sm:w-[400px]">
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="predictions">Predictions</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm" className="gap-1.5 w-full sm:w-auto">
                <ListFilter size={16} />
                <span>Filter</span>
              </Button>
            </div>
            
            {/* Main Content */}
            <TabsContent value="recommendations" className="mt-6 space-y-6">
              <DashboardCard
                title="AI Recommendations"
                description="Actionable insights to improve factory efficiency and reduce power consumption"
                icon={Sparkles}
              >
                <AIRecommendations limit={10} />
              </DashboardCard>
              
              <DashboardCard
                title="How Recommendations Work"
                description="Understanding how our AI generates optimization recommendations"
                icon={Lightbulb}
              >
                <div className="p-6 text-center">
                  <BrainCircuit className="h-16 w-16 mx-auto text-primary/50 mb-4" />
                  <h3 className="text-xl font-medium mb-3">Advanced Machine Learning</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Our AI analyzes thousands of data points from your factory's sensor network, 
                    identifying patterns and inefficiencies that aren't visible to the human eye. 
                    It continuously learns from your facility's unique operational profile to 
                    suggest improvements tailored to your specific environment.
                  </p>
                </div>
              </DashboardCard>
            </TabsContent>
            
            <TabsContent value="predictions" className="mt-6">
              <DashboardCard
                title="AI Predictions"
                description="Forecasting future energy consumption based on historical patterns"
                icon={BrainCircuit}
              >
                <div className="p-4">
                  <AIPredictions />
                </div>
              </DashboardCard>
            </TabsContent>
            
            <TabsContent value="analysis" className="mt-6">
              <DashboardCard
                title="Deep Analysis"
                description="AI-powered insights into your energy usage patterns and anomalies"
                icon={BrainCircuit}
              >
                <div className="p-4">
                  <AIAnalysis />
                </div>
              </DashboardCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
