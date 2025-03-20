
import React, { useState } from 'react';
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

// Sample data
const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  current: Math.round(40 + Math.random() * 30),
  predicted: Math.round(38 + Math.random() * 28),
  optimized: Math.round(30 + Math.random() * 20),
}));

const dailyData = Array.from({ length: 7 }, (_, i) => {
  const day = new Date();
  day.setDate(day.getDate() - 6 + i);
  return {
    time: day.toLocaleDateString('en-US', { weekday: 'short' }),
    current: Math.round(250 + Math.random() * 150),
    predicted: Math.round(240 + Math.random() * 140),
    optimized: Math.round(200 + Math.random() * 100),
  };
});

const weeklyData = Array.from({ length: 4 }, (_, i) => {
  return {
    time: `Week ${i + 1}`,
    current: Math.round(1200 + Math.random() * 600),
    predicted: Math.round(1150 + Math.random() * 550),
    optimized: Math.round(900 + Math.random() * 400),
  };
});

const monthlyData = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setMonth(i);
  return {
    time: date.toLocaleDateString('en-US', { month: 'short' }),
    current: Math.round(5000 + Math.random() * 2000),
    predicted: Math.round(4800 + Math.random() * 1800),
    optimized: Math.round(4000 + Math.random() * 1500),
  };
});

const datasets = {
  hourly: hourlyData,
  daily: dailyData,
  weekly: weeklyData,
  monthly: monthlyData,
};

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
  const data = datasets[timeRange];
  
  const getYAxisDomain = (dataMin: number, dataMax: number) => {
    const min = Math.max(0, dataMin - (dataMax - dataMin) * 0.1);
    const max = dataMax + (dataMax - dataMin) * 0.1;
    return [min, max];
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
            domain={getYAxisDomain}
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
