
import React, { useState } from 'react';
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

// Sample data
const monthlyData = [
  { month: 'Jan', energyCost: 12400, projectedCost: 12400, savings: 0 },
  { month: 'Feb', energyCost: 11800, projectedCost: 11800, savings: 0 },
  { month: 'Mar', energyCost: 12200, projectedCost: 12200, savings: 0 },
  { month: 'Apr', energyCost: 13100, projectedCost: 13100, savings: 0 },
  { month: 'May', energyCost: 13600, projectedCost: 13600, savings: 0 },
  { month: 'Jun', energyCost: 14100, projectedCost: 13300, savings: 800 },
  { month: 'Jul', energyCost: 14600, projectedCost: 13100, savings: 1500 },
  { month: 'Aug', energyCost: 14800, projectedCost: 12900, savings: 1900 },
  { month: 'Sep', energyCost: 14400, projectedCost: 12100, savings: 2300 },
  { month: 'Oct', energyCost: 13900, projectedCost: 11300, savings: 2600 },
  { month: 'Nov', energyCost: 13200, projectedCost: 10400, savings: 2800 },
  { month: 'Dec', energyCost: 12800, projectedCost: 9800, savings: 3000 },
];

const quarterlyData = [
  { quarter: 'Q1', energyCost: 36400, projectedCost: 36400, savings: 0 },
  { quarter: 'Q2', energyCost: 40800, projectedCost: 39400, savings: 1400 },
  { quarter: 'Q3', energyCost: 43800, projectedCost: 38100, savings: 5700 },
  { quarter: 'Q4', energyCost: 39900, projectedCost: 31500, savings: 8400 },
];

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
  
  // Select data based on time range
  const data = timeRange === 'monthly' ? monthlyData : quarterlyData;
  
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
              <p className="text-2xl font-bold text-success">$15,500</p>
              <p className="text-xs text-muted-foreground">Based on current implementation progress</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
