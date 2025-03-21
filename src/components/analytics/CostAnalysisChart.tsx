
import React, { useState, useEffect } from 'react';
import { 
  BarChartIcon, 
  DollarSign,
  ChevronDown,
  RefreshCw
} from 'lucide-react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { generateCostData } from '@/utils/mockDataGenerator';

type TimeRange = 'monthly' | 'quarterly';

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-md p-3 shadow-md">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}: ${entry.value.toLocaleString()}</span>
          </div>
        ))}
        
        {payload.length >= 2 && (
          <div className="mt-2 pt-2 border-t text-sm">
            <div className="flex justify-between font-medium">
              <span>Potential Savings:</span>
              <span className="text-success">
                ${(payload[0].value - payload[1].value).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default function CostAnalysisChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState<any[]>([]);
  
  // Load initial data
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      const rawData = generateCostData();
      
      if (timeRange === 'quarterly') {
        // Aggregate monthly data into quarters
        const q1 = rawData.slice(0, 3);
        const q2 = rawData.slice(3, 6);
        const q3 = rawData.slice(6, 9);
        const q4 = rawData.slice(9, 12);
        
        const quarterlyData = [
          {
            quarter: 'Q1',
            energyCost: q1.reduce((sum, item) => sum + item.energyCost, 0),
            projectedCost: q1.reduce((sum, item) => sum + item.projectedCost, 0),
            savings: q1.reduce((sum, item) => sum + item.savings, 0)
          },
          {
            quarter: 'Q2',
            energyCost: q2.reduce((sum, item) => sum + item.energyCost, 0),
            projectedCost: q2.reduce((sum, item) => sum + item.projectedCost, 0),
            savings: q2.reduce((sum, item) => sum + item.savings, 0)
          },
          {
            quarter: 'Q3',
            energyCost: q3.reduce((sum, item) => sum + item.energyCost, 0),
            projectedCost: q3.reduce((sum, item) => sum + item.projectedCost, 0),
            savings: q3.reduce((sum, item) => sum + item.savings, 0)
          },
          {
            quarter: 'Q4',
            energyCost: q4.reduce((sum, item) => sum + item.energyCost, 0),
            projectedCost: q4.reduce((sum, item) => sum + item.projectedCost, 0),
            savings: q4.reduce((sum, item) => sum + item.savings, 0)
          }
        ];
        
        setData(quarterlyData);
      } else {
        setData(rawData);
      }
      
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [timeRange]);
  
  // Function to handle data refresh
  const refreshData = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      const rawData = generateCostData();
      
      if (timeRange === 'quarterly') {
        // Aggregate monthly data into quarters
        const q1 = rawData.slice(0, 3);
        const q2 = rawData.slice(3, 6);
        const q3 = rawData.slice(6, 9);
        const q4 = rawData.slice(9, 12);
        
        const quarterlyData = [
          {
            quarter: 'Q1',
            energyCost: q1.reduce((sum, item) => sum + item.energyCost, 0),
            projectedCost: q1.reduce((sum, item) => sum + item.projectedCost, 0),
            savings: q1.reduce((sum, item) => sum + item.savings, 0)
          },
          {
            quarter: 'Q2',
            energyCost: q2.reduce((sum, item) => sum + item.energyCost, 0),
            projectedCost: q2.reduce((sum, item) => sum + item.projectedCost, 0),
            savings: q2.reduce((sum, item) => sum + item.savings, 0)
          },
          {
            quarter: 'Q3',
            energyCost: q3.reduce((sum, item) => sum + item.energyCost, 0),
            projectedCost: q3.reduce((sum, item) => sum + item.projectedCost, 0),
            savings: q3.reduce((sum, item) => sum + item.savings, 0)
          },
          {
            quarter: 'Q4',
            energyCost: q4.reduce((sum, item) => sum + item.energyCost, 0),
            projectedCost: q4.reduce((sum, item) => sum + item.projectedCost, 0),
            savings: q4.reduce((sum, item) => sum + item.savings, 0)
          }
        ];
        
        setData(quarterlyData);
      } else {
        setData(rawData);
      }
      
      setIsRefreshing(false);
    }, 800);
  };
  
  // Calculate total annual savings
  const getTotalSavings = () => {
    if (data.length === 0) return 0;
    return data.reduce((sum, item) => sum + item.savings, 0);
  };
  
  return (
    <DashboardCard
      title="Energy Cost Analysis"
      description="Comparison of actual vs. projected costs with implemented optimizations"
      icon={DollarSign}
    >
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <span className="capitalize">{timeRange} View</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup 
                  value={timeRange} 
                  onValueChange={(value) => setTimeRange(value as TimeRange)}
                >
                  <DropdownMenuRadioItem value="monthly">Monthly View</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="quarterly">Quarterly View</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1.5"
              onClick={refreshData}
              disabled={isRefreshing}
            >
              <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
              <span>{isRefreshing ? "Updating..." : "Refresh"}</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary/80" />
              <span>Actual Cost</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-success/80" />
              <span>Projected with Optimization</span>
            </div>
          </div>
        </div>
        
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis 
                dataKey={timeRange === 'monthly' ? 'month' : 'quarter'} 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fontSize: 12 }}
                width={65}
                tickFormatter={(value) => `$${value / 1000}k`}
                label={{ 
                  value: 'Cost ($)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fontSize: 12, opacity: 0.7 }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                yAxisId="left"
                dataKey="energyCost" 
                name="Actual Cost" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]} 
                fillOpacity={0.8}
                barSize={timeRange === 'monthly' ? 15 : 30}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="projectedCost" 
                name="Projected with Optimization" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                dot={{ stroke: 'hsl(var(--success))', fill: 'white', strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Projected annual savings with optimizations:
              </p>
            </div>
            <div className="text-right mt-2 sm:mt-0">
              <p className="text-2xl font-bold text-success">
                ${getTotalSavings().toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Based on current implementation progress</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
