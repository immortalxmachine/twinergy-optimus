
import React from 'react';
import Layout from '@/components/layout/Layout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import AIRecommendations from '@/components/dashboard/AIRecommendations';
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

export default function AIInsights() {
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
            <Button variant="outline" className="gap-1.5">
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
              <div className="h-96 flex items-center justify-center border rounded-lg bg-muted/20">
                <div className="text-center p-6">
                  <BrainCircuit className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-xl font-medium mt-4">Predictive Analytics</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    AI-powered predictions and forecasts will appear here. This section is currently under development.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analysis" className="mt-6">
              <div className="h-96 flex items-center justify-center border rounded-lg bg-muted/20">
                <div className="text-center p-6">
                  <BrainCircuit className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-xl font-medium mt-4">Deep Analysis</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Advanced AI analysis and insights will appear here. This section is currently under development.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
