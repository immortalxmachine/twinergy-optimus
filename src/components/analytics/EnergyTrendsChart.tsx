
import React from 'react';
import {
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';

interface EnergyTrendsChartProps {
  className?: string;
  chartType: 'pie' | 'bar' | 'line';
  metric?: 'power' | 'efficiency' | 'cost' | 'cost-savings';
}

// Sample data for different chart types
const pieData = [
  { name: 'Assembly Line', value: 42, color: 'hsl(var(--primary))' },
  { name: 'Heating & Cooling', value: 30, color: 'hsl(var(--info))' },
  { name: 'Packaging Unit', value: 17, color: 'hsl(var(--success))' },
  { name: 'Quality Control', value: 11, color: 'hsl(var(--warning))' },
];

const pieDataEfficiency = [
  { name: 'Assembly Line', value: 68, color: 'hsl(var(--primary))' },
  { name: 'Heating & Cooling', value: 62, color: 'hsl(var(--info))' },
  { name: 'Packaging Unit', value: 76, color: 'hsl(var(--success))' },
  { name: 'Quality Control', value: 82, color: 'hsl(var(--warning))' },
];

const pieDataCost = [
  { name: 'Electricity', value: 65, color: 'hsl(var(--primary))' },
  { name: 'Natural Gas', value: 25, color: 'hsl(var(--info))' },
  { name: 'Water', value: 10, color: 'hsl(var(--success))' },
];

const barData = [
  { time: '06:00', consumption: 45 },
  { time: '08:00', consumption: 85 },
  { time: '10:00', consumption: 90 },
  { time: '12:00', consumption: 70 },
  { time: '14:00', consumption: 95 },
  { time: '16:00', consumption: 80 },
  { time: '18:00', consumption: 60 },
  { time: '20:00', consumption: 40 },
];

const barDataEfficiency = [
  { department: 'Assembly', efficiency: 68 },
  { department: 'Heating', efficiency: 62 },
  { department: 'Packaging', efficiency: 76 },
  { department: 'Quality', efficiency: 82 },
];

const lineData = [
  { month: 'Jan', current: 420, optimized: 380 },
  { month: 'Feb', current: 380, optimized: 340 },
  { month: 'Mar', current: 450, optimized: 390 },
  { month: 'Apr', current: 470, optimized: 410 },
  { month: 'May', current: 500, optimized: 430 },
  { month: 'Jun', current: 520, optimized: 450 },
];

const lineDataEfficiency = [
  { month: 'Jan', efficiency: 60 },
  { month: 'Feb', efficiency: 62 },
  { month: 'Mar', efficiency: 65 },
  { month: 'Apr', efficiency: 70 },
  { month: 'May', efficiency: 72 },
  { month: 'Jun', efficiency: 75 },
];

const lineDataCostSavings = [
  { month: 'Jan', savings: 2100 },
  { month: 'Feb', savings: 2300 },
  { month: 'Mar', savings: 2450 },
  { month: 'Apr', savings: 2600 },
  { month: 'May', savings: 2850 },
  { month: 'Jun', savings: 3050 },
];

// Simple tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-card border rounded-md shadow-sm">
        <p className="text-sm font-medium">{label || payload[0].name}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color || entry.fill }}>
            {entry.name || entry.dataKey}: {entry.value} {entry.unit || ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function EnergyTrendsChart({ className, chartType, metric = 'power' }: EnergyTrendsChartProps) {
  // Decide which data to use based on metric
  const getPieData = () => {
    if (metric === 'efficiency') return pieDataEfficiency;
    if (metric === 'cost') return pieDataCost;
    return pieData;
  };

  const getBarData = () => {
    if (metric === 'efficiency') return barDataEfficiency;
    return barData;
  };

  const getLineData = () => {
    if (metric === 'efficiency') return lineDataEfficiency;
    if (metric === 'cost-savings') return lineDataCostSavings;
    return lineData;
  };

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={getPieData()}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={1}
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {getPieData().map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={getBarData()}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis 
          dataKey={metric === 'efficiency' ? 'department' : 'time'} 
          tick={{ fontSize: 12 }} 
        />
        <YAxis 
          tick={{ fontSize: 12 }} 
          label={{ 
            value: metric === 'efficiency' ? 'Efficiency (%)' : 'Consumption (kW)', 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle', fontSize: 12 }
          }} 
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey={metric === 'efficiency' ? 'efficiency' : 'consumption'} 
          fill="hsl(var(--primary))" 
          radius={[4, 4, 0, 0]} 
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={getLineData()}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis 
          tick={{ fontSize: 12 }}
          label={{ 
            value: metric === 'efficiency' 
              ? 'Efficiency (%)' 
              : metric === 'cost-savings' 
                ? 'Savings ($)' 
                : 'Consumption (kW)', 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle', fontSize: 12 }
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {metric === 'efficiency' ? (
          <Line 
            type="monotone" 
            dataKey="efficiency" 
            stroke="hsl(var(--primary))" 
            dot={{ stroke: 'hsl(var(--primary))', fill: 'white', strokeWidth: 2, r: 4 }} 
            activeDot={{ r: 6 }} 
          />
        ) : metric === 'cost-savings' ? (
          <Line
            type="monotone"
            dataKey="savings"
            stroke="hsl(var(--success))"
            dot={{ stroke: 'hsl(var(--success))', fill: 'white', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        ) : (
          <>
            <Line 
              type="monotone" 
              dataKey="current" 
              stroke="hsl(var(--primary))" 
              dot={{ stroke: 'hsl(var(--primary))', fill: 'white', strokeWidth: 2, r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              dataKey="optimized" 
              stroke="hsl(var(--success))" 
              dot={{ stroke: 'hsl(var(--success))', fill: 'white', strokeWidth: 2, r: 4 }} 
              activeDot={{ r: 6 }}
              strokeDasharray="5 5"
            />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  );

  // Placeholder when chart is loading or there's an error
  const renderPlaceholder = (Icon: any) => (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <Icon className="h-12 w-12 mx-auto text-muted-foreground/40" />
        <p className="mt-2 text-muted-foreground">Chart data loading...</p>
      </div>
    </div>
  );

  return (
    <div className={cn("h-[320px] p-4", className)}>
      {chartType === 'pie' && renderPieChart()}
      {chartType === 'bar' && renderBarChart()}
      {chartType === 'line' && renderLineChart()}
    </div>
  );
}
