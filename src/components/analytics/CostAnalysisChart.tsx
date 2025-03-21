
import React, { useState, useEffect } from 'react';
import { 
  BarChart as BarChartIcon, 
  DollarSign,
  ChevronDown
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
import { generateMonthlyData, generateQuarterlyData } from '@/utils/mockDataGenerator';

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
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [annualSavings, setAnnualSavings] = useState(0);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let newData;
      if (timeRange === 'monthly') {
        newData = generateMonthlyData().map(item => ({
          month: item.month,
          energyCost: item.energyCost,
          projectedCost: item.projectedCost,
          savings: item.savings
        }));
        
        // Calculate annual savings
        const totalSavings = newData.reduce((sum, item) => sum + item.savings, 0);
        setAnnualSavings(totalSavings);
      } else {
        newData = generateQuarterlyData();
        
        // Calculate annual savings
        const totalSavings = newData.reduce((sum, item) => sum + item.savings, 0);
        setAnnualSavings(totalSavings);
      }
      
      setData(newData);
      setIsLoading(false);
    }, 500);
  }, [timeRange]);
  
  return (
    <DashboardCard
      title="Energy Cost Analysis"
      description="Comparison of actual vs. projected costs with implemented optimizations"
      icon={DollarSign}
    >
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
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
        
        {isLoading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-pulse text-center">
              <p className="text-muted-foreground">Loading cost analysis data...</p>
            </div>
          </div>
        ) : (
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
        )}
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Projected annual savings with optimizations:
              </p>
            </div>
            <div className="text-right mt-2 sm:mt-0">
              <p className="text-2xl font-bold text-success">${annualSavings.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Based on current implementation progress</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
