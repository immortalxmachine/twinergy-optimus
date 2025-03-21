
import React, { useState, useEffect } from 'react';
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
import { 
  generateAnomalyData, 
  generateCorrelationData,
  generateFeatureImportanceData
} from '@/utils/mockDataGenerator';

const COLORS = [
  'hsl(var(--primary))', 
  'hsl(var(--warning))', 
  'hsl(var(--success))',
  'hsl(var(--info))',
  'hsl(var(--destructive))'
];

export default function AIAnalysis() {
  // State for the data of each tab
  const [anomalyData, setAnomalyData] = useState<any[]>([]);
  const [correlationData, setCorrelationData] = useState<any[]>([]);
  const [featureImportanceData, setFeatureImportanceData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('anomalies');
  const [isLoading, setIsLoading] = useState(true);

  // Load data for the active tab
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      if (activeTab === 'anomalies' && anomalyData.length === 0) {
        setAnomalyData(generateAnomalyData());
      } else if (activeTab === 'correlations' && correlationData.length === 0) {
        setCorrelationData(generateCorrelationData());
      } else if (activeTab === 'importance' && featureImportanceData.length === 0) {
        setFeatureImportanceData(generateFeatureImportanceData());
      }
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Get the anomaly point from the data
  const getAnomalyPoint = () => {
    if (anomalyData.length === 0) return null;
    return anomalyData.find(point => !point.normal);
  };

  const anomalyPoint = getAnomalyPoint();

  return (
    <div className="space-y-6">
      <Tabs 
        defaultValue="anomalies" 
        value={activeTab}
        onValueChange={setActiveTab}
      >
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
                              cx={`${(index / (anomalyData.length - 1)) * 100}%`}
                              cy={`${100 - ((entry.value / 100) * 100)}%`}
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
              
              {anomalyPoint && (
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-destructive text-xs">!</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Anomaly Detected at {anomalyPoint.time}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Power consumption exceeded expected range by {Math.round((anomalyPoint.value / 70 - 1) * 100)}%. 
                        This may indicate equipment malfunction or unauthorized usage.
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
              )}
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
                  {featureImportanceData.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full" 
                           style={{ backgroundColor: `${COLORS[index]}/20` }}
                           className="flex items-center justify-center shrink-0 mt-0.5">
                        <span style={{ color: COLORS[index] }} className="text-xs">{index + 1}</span>
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">{feature.name}</span> is 
                        {index === 0 ? " the most significant factor" : " an important factor"} 
                        ({feature.value}%), 
                        {index === 0 && " suggesting schedule optimization could yield substantial savings."}
                        {index === 1 && " confirming the strong correlation shown in the previous analysis."}
                        {index === 2 && " showing that energy consumption scales with output, but efficiency improvements are possible during low-volume periods."}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
