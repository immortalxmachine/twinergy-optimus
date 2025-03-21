
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { 
  generateHourlyData, 
  generateDailyData, 
  generateWeeklyData, 
  generateMonthlyData 
} from '@/utils/mockDataGenerator';

type TimeRange = 'hourly' | 'daily' | 'weekly' | 'monthly';

interface PowerConsumptionChartProps {
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-md shadow-md p-3 text-sm">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="flex items-center gap-2">
            <div 
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="capitalize">{entry.name}: </span>
            <span className="font-medium">{entry.value} kWh</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default function PowerConsumptionChart({ className }: PowerConsumptionChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Generate fresh data when time range changes
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      let newData;
      switch (timeRange) {
        case 'hourly':
          newData = generateHourlyData();
          break;
        case 'daily':
          newData = generateDailyData();
          break;
        case 'weekly':
          newData = generateWeeklyData();
          break;
        case 'monthly':
          newData = generateMonthlyData();
          break;
        default:
          newData = generateDailyData();
      }
      
      setData(newData);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [timeRange]);
  
  // Calculate Y-axis domain based on data
  const getYAxisDomain = () => {
    if (isLoading || data.length === 0) {
      return [0, 100];
    }
    
    // Find min and max values across all data series
    let minValue = Number.MAX_VALUE;
    let maxValue = Number.MIN_VALUE;
    
    data.forEach(item => {
      const currentMin = Math.min(item.current, item.predicted, item.optimized);
      const currentMax = Math.max(item.current, item.predicted, item.optimized);
      
      if (currentMin < minValue) minValue = currentMin;
      if (currentMax > maxValue) maxValue = currentMax;
    });
    
    // Add 10% padding
    const padding = (maxValue - minValue) * 0.1;
    return [Math.max(0, minValue - padding), maxValue + padding];
  };
  
  return (
    <div className={cn("h-[400px] w-full", className)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 px-3 flex items-center gap-1">
                <span className="capitalize">{timeRange}</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[120px]">
              <DropdownMenuRadioGroup value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
                <DropdownMenuRadioItem value="hourly">Hourly</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="daily">Daily</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="weekly">Weekly</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="monthly">Monthly</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary/80" />
            <span>Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-info/70" />
            <span>Predicted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-success/70" />
            <span>Optimized</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }}
            tickLine={{ opacity: 0.5 }}
            axisLine={{ opacity: 0.5 }}
          />
          <YAxis 
            domain={getYAxisDomain()}
            tick={{ fontSize: 12 }}
            tickLine={{ opacity: 0.5 }}
            axisLine={{ opacity: 0.5 }}
            width={40}
            label={{ 
              value: 'kWh', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 12, opacity: 0.7 }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="current" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorCurrent)"
            animationDuration={1000}
          />
          <Area 
            type="monotone" 
            dataKey="predicted" 
            stroke="hsl(var(--info))" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorPredicted)"
            animationDuration={1500}
          />
          <Area 
            type="monotone" 
            dataKey="optimized" 
            stroke="hsl(var(--success))" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorOptimized)"
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
