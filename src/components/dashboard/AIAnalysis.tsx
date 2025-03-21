
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  LineChart, Line, 
  AreaChart, Area, 
  XAxis, YAxis, 
  CartesianGrid, Tooltip, 
  ResponsiveContainer, 
  PieChart, Pie, Cell, 
  Legend
} from 'recharts';

// Sample data for anomaly detection
const anomalyData = [
  { time: '00:00', value: 42, normal: true },
  { time: '02:00', value: 38, normal: true },
  { time: '04:00', value: 35, normal: true },
  { time: '06:00', value: 37, normal: true },
  { time: '08:00', value: 68, normal: true },
  { time: '10:00', value: 72, normal: true },
  { time: '12:00', value: 95, normal: false },
  { time: '14:00', value: 75, normal: true },
  { time: '16:00', value: 71, normal: true },
  { time: '18:00', value: 66, normal: true },
  { time: '20:00', value: 48, normal: true },
  { time: '22:00', value: 45, normal: true },
];

// Sample data for correlation analysis
const correlationData = [
  { hour: '00:00', temperature: 21, consumption: 42 },
  { hour: '02:00', temperature: 20, consumption: 38 },
  { hour: '04:00', temperature: 19, consumption: 35 },
  { hour: '06:00', temperature: 20, consumption: 37 },
  { hour: '08:00', temperature: 23, consumption: 68 },
  { hour: '10:00', temperature: 25, consumption: 72 },
  { hour: '12:00', temperature: 27, consumption: 75 },
  { hour: '14:00', temperature: 26, consumption: 73 },
  { hour: '16:00', temperature: 25, consumption: 71 },
  { hour: '18:00', temperature: 24, consumption: 66 },
  { hour: '20:00', temperature: 22, consumption: 48 },
  { hour: '22:00', temperature: 21, consumption: 45 },
];

// Sample data for feature importance
const featureImportanceData = [
  { name: 'Operating Hours', value: 35 },
  { name: 'Ambient Temperature', value: 25 },
  { name: 'Production Volume', value: 20 },
  { name: 'Machine Age', value: 12 },
  { name: 'Maintenance Frequency', value: 8 },
];

const COLORS = [
  'hsl(var(--primary))', 
  'hsl(var(--warning))', 
  'hsl(var(--success))',
  'hsl(var(--info))',
  'hsl(var(--destructive))'
];

export default function AIAnalysis() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="anomalies">
        <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="correlations">Correlations</TabsTrigger>
          <TabsTrigger value="importance">Feature Importance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="anomalies" className="mt-6">
          <Card className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Power Consumption Anomalies</h3>
              <p className="text-muted-foreground mt-1">
                AI has identified unusual patterns in your energy consumption data
              </p>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-6">
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={anomalyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--foreground))" />
                    <YAxis stroke="hsl(var(--foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        borderColor: 'hsl(var(--border))' 
                      }}
                    />
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                    {anomalyData.map((entry, index) => {
                      if (!entry.normal) {
                        return (
                          <g key={index}>
                            <circle
                              cx={index * (100 / (anomalyData.length - 1)) + '%'}
                              cy={(100 - ((entry.value / 100) * 100)) + '%'}
                              r={6}
                              fill="hsl(var(--destructive))"
                              stroke="white"
                              strokeWidth={2}
                            />
                          </g>
                        );
                      }
                      return null;
                    })}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-destructive text-xs">!</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Anomaly Detected at 12:00</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Power consumption exceeded expected range by 35%. This may indicate equipment malfunction or unauthorized usage.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                        Unusual Spike
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        Assembly Line
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="correlations" className="mt-6">
          <Card className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Correlation Analysis</h3>
              <p className="text-muted-foreground mt-1">
                AI-detected relationships between external factors and energy consumption
              </p>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Temperature (°C)
                  </Badge>
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                    Power Consumption (kW)
                  </Badge>
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={correlationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hour" stroke="hsl(var(--foreground))" />
                    <YAxis yAxisId="left" stroke="hsl(var(--primary))" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--warning))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        borderColor: 'hsl(var(--border))' 
                      }}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="hsl(var(--primary))" 
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="consumption" 
                      stroke="hsl(var(--warning))" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-medium">Strong Positive Correlation</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    For every 1°C increase in temperature, power consumption increases by approximately 5.8 kW.
                  </p>
                  <p className="text-sm font-medium mt-2">
                    Correlation coefficient: <span className="text-primary">r = 0.92</span>
                  </p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-medium">Recommended Action</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Consider adjusting HVAC settings during peak temperature hours to optimize energy usage.
                  </p>
                  <p className="text-sm font-medium mt-2">
                    Potential savings: <span className="text-success">12% - 18%</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="importance" className="mt-6">
          <Card className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Energy Consumption Factors</h3>
              <p className="text-muted-foreground mt-1">
                Key factors influencing your facility's energy consumption patterns
              </p>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={featureImportanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {featureImportanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Key Insights</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-primary text-xs">1</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Operating Hours</span> is the most significant factor (35%), 
                      suggesting schedule optimization could yield substantial savings.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-warning/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-warning text-xs">2</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Ambient Temperature</span> accounts for 25% of energy consumption variability, 
                      confirming the strong correlation shown in the previous analysis.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-success text-xs">3</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Production Volume</span> (20%) shows that energy consumption scales with output, 
                      but efficiency improvements are possible during low-volume periods.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
