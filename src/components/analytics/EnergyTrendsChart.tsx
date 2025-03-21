
import React, { useState, useEffect } from 'react';
import {
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  RefreshCw
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
import { Button } from '@/components/ui/button';
import { 
  generateDepartmentEfficiency, 
  generateHourlyData, 
  generateMonthlyData,
  getRandomNumber 
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
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // State for different chart data
  const [pieData, setPieData] = useState<any[]>([]);
  const [barData, setBarData] = useState<any[]>([]);
  const [lineData, setLineData] = useState<any[]>([]);
  
  // Load initial data based on chart type and metric
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      generateChartData();
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [chartType, metric]);
  
  // Function to generate data for different chart types
  const generateChartData = () => {
    // Generate pie chart data
    if (chartType === 'pie' || isLoading) {
      if (metric === 'efficiency') {
        const departments = generateDepartmentEfficiency(70);
        setPieData(departments.map(dept => ({
          name: dept.name,
          value: dept.efficiency,
          color: dept.color.replace('bg-', 'hsl(var(--')
            .replace('/80', '))'),
        })));
      } else if (metric === 'cost') {
        setPieData([
          { name: 'Electricity', value: getRandomNumber(60, 70), color: 'hsl(var(--primary))' },
          { name: 'Natural Gas', value: getRandomNumber(20, 30), color: 'hsl(var(--info))' },
          { name: 'Water', value: getRandomNumber(8, 12), color: 'hsl(var(--success))' },
        ]);
      } else {
        // Default power consumption by department
        setPieData([
          { name: 'Assembly Line', value: getRandomNumber(38, 45), color: 'hsl(var(--primary))' },
          { name: 'Heating & Cooling', value: getRandomNumber(25, 35), color: 'hsl(var(--info))' },
          { name: 'Packaging Unit', value: getRandomNumber(15, 20), color: 'hsl(var(--success))' },
          { name: 'Quality Control', value: getRandomNumber(8, 15), color: 'hsl(var(--warning))' },
        ]);
      }
    }
    
    // Generate bar chart data
    if (chartType === 'bar' || isLoading) {
      if (metric === 'efficiency') {
        const departments = generateDepartmentEfficiency(70);
        setBarData(departments.map(dept => ({
          department: dept.name.split(' ')[0],
          efficiency: dept.efficiency
        })));
      } else {
        // Default hourly consumption
        setBarData(generateHourlyData(8, 70, 30)
          .map(item => ({
            time: item.time,
            consumption: item.current
          })));
      }
    }
    
    // Generate line chart data
    if (chartType === 'line' || isLoading) {
      if (metric === 'efficiency') {
        // Efficiency trend over time
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const startEfficiency = getRandomNumber(58, 62);
        
        setLineData(months.map((month, index) => ({
          month,
          efficiency: Math.round(startEfficiency + (index * getRandomNumber(2, 3, 1)))
        })));
      } else if (metric === 'cost-savings') {
        // Cost savings trend
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const baseSavings = getRandomNumber(1800, 2200);
        
        setLineData(months.map((month, index) => ({
          month,
          savings: Math.round(baseSavings + (index * getRandomNumber(150, 250)))
        })));
      } else {
        // Current vs optimized consumption
        const monthlyData = generateMonthlyData(6, 450, 20);
        setLineData(monthlyData.map(item => ({
          month: item.time,
          current: item.current,
          optimized: item.optimized
        })));
      }
    }
  };
  
  // Function to refresh data
  const refreshData = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      generateChartData();
      setIsRefreshing(false);
    }, 600);
  };
  
  // Decide which data to use based on metric
  const getPieData = () => pieData;
  const getBarData = () => barData;
  const getLineData = () => lineData;

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
    <div className={cn("h-[320px] p-4 relative", className)}>
      <div className="absolute top-2 right-2 z-10">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={refreshData}
          disabled={isRefreshing}
        >
          <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
          <span className="sr-only">Refresh Chart</span>
        </Button>
      </div>
      
      {isLoading ? (
        chartType === 'pie' 
          ? renderPlaceholder(PieChartIcon)
          : chartType === 'bar' 
            ? renderPlaceholder(BarChartIcon)
            : renderPlaceholder(LineChartIcon)
      ) : (
        <>
          {chartType === 'pie' && renderPieChart()}
          {chartType === 'bar' && renderBarChart()}
          {chartType === 'line' && renderLineChart()}
        </>
      )}
    </div>
  );
}
