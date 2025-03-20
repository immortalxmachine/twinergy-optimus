
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ConsumptionAnalysis() {
  return (
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
  );
}
