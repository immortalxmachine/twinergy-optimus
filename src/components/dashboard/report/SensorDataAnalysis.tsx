
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function SensorDataAnalysis() {
  return (
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
  );
}
