
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Calendar } from 'lucide-react';
import { generatePredictionData } from '@/utils/mockDataGenerator';

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-md p-3">
        <p className="font-medium">{label}</p>
        <div className="space-y-1 mt-2">
          {payload.map((entry, index) => {
            if (entry.value !== null) {
              return (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-sm text-muted-foreground">{entry.name}:</span>
                  <span className="text-sm font-medium">{entry.value} kWh</span>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default function AIPredictions() {
  const [predictionData, setPredictionData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call delay
    setIsLoading(true);
    setTimeout(() => {
      setPredictionData(generatePredictionData());
      setIsLoading(false);
    }, 500);
  }, []);
  
  // Calculate totals for the summary cards
  const currentTotal = predictionData
    .filter(d => d.actual === null)
    .reduce((sum, d) => sum + d.predicted, 0);
    
  const optimizedTotal = predictionData
    .filter(d => d.actual === null)
    .reduce((sum, d) => sum + d.optimized, 0);
    
  const potentialSavings = Math.round((currentTotal - optimizedTotal) * 0.12 * 1000) / 1000;
  const currentQuarter = `Q${Math.floor(new Date().getMonth() / 3) + 1} ${new Date().getFullYear()}`;
  
  const reductionPercentage = 
    currentTotal > 0 
      ? Math.round((currentTotal - optimizedTotal) / currentTotal * 1000) / 10 
      : 0;

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-muted-foreground">Loading prediction data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Power Consumption Forecast</h3>
          <p className="text-muted-foreground mt-1">
            Projected consumption for the next 3 months with AI-optimized scenarios
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Calendar size={16} />
            <span>{currentQuarter}</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download size={16} />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <div className="flex flex-wrap gap-3 mb-4">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            Actual Energy Usage
          </Badge>
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
            Predicted Energy Usage
          </Badge>
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            AI-Optimized Scenario
          </Badge>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={predictionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
            <YAxis stroke="hsl(var(--foreground))" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="actual" name="Actual" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="predicted" name="Predicted" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="optimized" name="AI-Optimized" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="text-sm font-medium text-muted-foreground">Current Trajectory</h4>
          <div className="mt-2">
            <p className="text-2xl font-bold">{currentTotal.toLocaleString()} kWh</p>
            <p className="text-sm text-muted-foreground mt-1">{currentQuarter} predicted</p>
          </div>
          <p className="text-sm text-warning flex items-center mt-2">
            +4.2% vs. last quarter
          </p>
        </div>
        
        <div className="border rounded-lg p-4">
          <h4 className="text-sm font-medium text-muted-foreground">AI-Optimized Scenario</h4>
          <div className="mt-2">
            <p className="text-2xl font-bold">{optimizedTotal.toLocaleString()} kWh</p>
            <p className="text-sm text-muted-foreground mt-1">{currentQuarter} potential</p>
          </div>
          <p className="text-sm text-success flex items-center mt-2">
            -{reductionPercentage}% reduction potential
          </p>
        </div>
        
        <div className="border rounded-lg p-4">
          <h4 className="text-sm font-medium text-muted-foreground">Potential Savings</h4>
          <div className="mt-2">
            <p className="text-2xl font-bold">${potentialSavings.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">{currentQuarter} estimated</p>
          </div>
          <Button variant="link" className="px-0 text-sm h-auto flex items-center gap-1 mt-2">
            <span>View detailed breakdown</span>
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
