
import React, { useEffect, useState } from 'react';
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
import { 
  generateDepartmentData,
  generateHourlyData,
  generateDailyData,
  generateMonthlyData,
  randomNumber
} from '@/utils/mockDataGenerator';

interface EnergyTrendsChartProps {
  className?: string;
  chartType: 'pie' | 'bar' | 'line';
  metric?: 'power' | 'efficiency' | 'cost' | 'cost-savings';
}

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
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Generate data based on chart type and metric
    setTimeout(() => {
      let newData;
      if (chartType === 'pie') {
        if (metric === 'efficiency') {
          newData = generateDepartmentData(4);
        } else if (metric === 'cost') {
          newData = [
            { name: 'Electricity', value: randomNumber(55, 65), color: 'hsl(var(--primary))' },
            { name: 'Natural Gas', value: randomNumber(20, 30), color: 'hsl(var(--info))' },
            { name: 'Water', value: randomNumber(5, 15), color: 'hsl(var(--success))' },
          ];
        } else {
          newData = generateDepartmentData(4);
        }
      } else if (chartType === 'bar') {
        if (metric === 'efficiency') {
          newData = [
            { department: 'Assembly', efficiency: randomNumber(60, 75) },
            { department: 'Heating', efficiency: randomNumber(55, 70) },
            { department: 'Packaging', efficiency: randomNumber(70, 85) },
            { department: 'Quality', efficiency: randomNumber(75, 90) },
          ];
        } else {
          newData = generateHourlyData(50, 15, false).filter((_, i) => i % 3 === 0).map(item => ({
            time: item.time,
            consumption: item.current
          }));
        }
      } else if (chartType === 'line') {
        if (metric === 'efficiency') {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
          const startEff = randomNumber(55, 65);
          newData = months.map((month, i) => ({
            month,
            efficiency: Math.round(startEff + (i * randomNumber(2, 4)))
          }));
        } else if (metric === 'cost-savings') {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
          const startSavings = randomNumber(1800, 2200);
          const growth = randomNumber(150, 250);
          newData = months.map((month, i) => ({
            month,
            savings: Math.round(startSavings + (i * growth) + randomNumber(-100, 100))
          }));
        } else {
          const monthlyData = generateMonthlyData();
          newData = monthlyData.slice(0, 6).map(item => ({
            month: item.month,
            current: item.current,
            optimized: item.optimized
          }));
        }
      }
      
      setData(newData);
      setIsLoading(false);
    }, 500);
  }, [chartType, metric]);
  
  const COLORS = [
    'hsl(var(--primary))', 
    'hsl(var(--warning))', 
    'hsl(var(--success))',
    'hsl(var(--info))',
    'hsl(var(--destructive))'
  ];
  
  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={1}
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
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
      <LineChart data={data}>
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

  // Placeholder when chart is loading
  const renderPlaceholder = () => (
    <div className="h-full flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="h-12 w-12 mx-auto rounded-full bg-muted"></div>
        <p className="mt-2 text-muted-foreground">Loading chart data...</p>
      </div>
    </div>
  );

  return (
    <div className={cn("h-[320px] p-4", className)}>
      {isLoading ? renderPlaceholder() : (
        <>
          {chartType === 'pie' && renderPieChart()}
          {chartType === 'bar' && renderBarChart()}
          {chartType === 'line' && renderLineChart()}
        </>
      )}
    </div>
  );
}
