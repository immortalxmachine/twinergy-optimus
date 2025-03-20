
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PowerConsumptionReportProps {
  onClose: () => void;
}

export default function PowerConsumptionReport({ onClose }: PowerConsumptionReportProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg">
        <CardHeader className="sticky top-0 bg-card z-10 border-b pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Factory Power Consumption Monitoring & Optimization Report</CardTitle>
              <CardDescription>
                Insights and recommendations for achieving a 20% reduction in power consumption
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X size={18} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="py-6 space-y-8 text-sm">
          {/* Overview section */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p>
              This report provides insights into your factory&apos;s power consumption trends, identifies inefficiencies, 
              and recommends actionable strategies to achieve a <strong>20% reduction in power consumption</strong>.
            </p>
          </div>

          <hr className="border-t border-border" />

          {/* 1. Current Power Consumption Analysis */}
          <div>
            <h2 className="text-xl font-semibold mb-4">1. Current Power Consumption Analysis</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Total Energy Consumption (Monthly)</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>January:</strong> 52,400 kWh</li>
                  <li><strong>February:</strong> 48,900 kWh</li>
                  <li><strong>March:</strong> 50,200 kWh</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Top Energy Consuming Departments</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Energy Usage (kWh)</TableHead>
                        <TableHead>Percentage of Total Consumption</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Assembly Line</TableCell>
                        <TableCell>21,000 kWh</TableCell>
                        <TableCell>42%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Heating & Cooling</TableCell>
                        <TableCell>15,300 kWh</TableCell>
                        <TableCell>30%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Packaging Unit</TableCell>
                        <TableCell>8,700 kWh</TableCell>
                        <TableCell>17%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Quality Control</TableCell>
                        <TableCell>5,200 kWh</TableCell>
                        <TableCell>11%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-t border-border" />

          {/* 2. Key Sensor Data Analysis */}
          <div>
            <h2 className="text-xl font-semibold mb-4">2. Key Sensor Data Analysis</h2>
            <h3 className="text-lg font-medium mb-2">Sensor Metrics</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sensor Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Temperature Sensor</TableCell>
                    <TableCell>28°C</TableCell>
                    <TableCell>Stable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Vibration Sensor</TableCell>
                    <TableCell>0.05g</TableCell>
                    <TableCell>Normal</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Voltage Sensor</TableCell>
                    <TableCell>220V</TableCell>
                    <TableCell>Stable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Pressure Sensor</TableCell>
                    <TableCell>4.2 MPa</TableCell>
                    <TableCell>Within Range</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <hr className="border-t border-border" />

          {/* 3. Identified Inefficiencies */}
          <div>
            <h2 className="text-xl font-semibold mb-4">3. Identified Inefficiencies</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Excessive energy usage</strong> detected in assembly line motor systems.</li>
              <li><strong>Heating system overuse</strong> during non-operational hours.</li>
              <li><strong>Idle machines consuming standby power</strong> leading to wasted energy.</li>
            </ul>
          </div>

          <hr className="border-t border-border" />

          {/* 4. Recommended Optimization Strategies */}
          <div>
            <h2 className="text-xl font-semibold mb-4">4. Recommended Optimization Strategies</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Short-Term Actions</h3>
                <ul className="space-y-1">
                  <li className="flex items-baseline gap-2">
                    <span className="text-success">✓</span>
                    <span>Adjust heating system schedules to align with production hours.</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="text-success">✓</span>
                    <span>Implement automatic power-down for idle machines.</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="text-success">✓</span>
                    <span>Optimize conveyor belt motor speed for lower power draw.</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Long-Term Actions</h3>
                <ul className="space-y-1">
                  <li className="flex items-baseline gap-2">
                    <span className="text-success">✓</span>
                    <span>Upgrade assembly line motors to high-efficiency models.</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="text-success">✓</span>
                    <span>Introduce predictive maintenance for HVAC systems.</span>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="text-success">✓</span>
                    <span>Integrate renewable energy sources like solar panels.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="border-t border-border" />

          {/* 5. Projected Impact */}
          <div>
            <h2 className="text-xl font-semibold mb-4">5. Projected Impact</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Estimated Power Reduction:</strong> 21%</li>
              <li><strong>Cost Savings:</strong> $4,200 per month</li>
              <li><strong>Environmental Impact:</strong> 15 tons of CO₂ reduction annually</li>
            </ul>
          </div>

          <hr className="border-t border-border" />

          {/* 6. Next Steps */}
          <div>
            <h2 className="text-xl font-semibold mb-4">6. Next Steps</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Implement recommended strategies in phases.</li>
              <li>Conduct monthly audits to track progress.</li>
              <li>Utilize real-time sensor data visualization for ongoing optimization.</li>
            </ul>
          </div>

          <hr className="border-t border-border" />

          {/* Footer */}
          <div className="text-sm text-muted-foreground">
            <p><strong>Prepared By:</strong> Smart Factory Analytics</p>
            <p><strong>Date:</strong> {currentDate}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
