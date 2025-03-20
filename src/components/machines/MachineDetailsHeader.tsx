
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StatusIndicator from '@/components/ui/StatusIndicator';
import { ArrowLeft, Wrench, Cog, Download } from 'lucide-react';

interface MachineDetailsHeaderProps {
  machine: {
    name: string;
    status: string;
    type: string;
    id: string;
  };
}

export default function MachineDetailsHeader({ machine }: MachineDetailsHeaderProps) {
  return (
    <>
      {/* Header with back button */}
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/machines">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back</span>
          </Link>
        </Button>
      </div>
      
      {/* Machine Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">{machine.name}</h1>
            <StatusIndicator status={getStatusColor(machine.status)} />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="capitalize">
              {machine.type}
            </Badge>
            <Badge variant="outline" className="capitalize">
              ID: {machine.id}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Button variant="outline" className="gap-1.5" size="sm">
            <Wrench className="h-4 w-4" />
            <span>Maintenance</span>
          </Button>
          <Button variant="outline" className="gap-1.5" size="sm">
            <Cog className="h-4 w-4" />
            <span>Configure</span>
          </Button>
          <Button className="gap-1.5" size="sm">
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </Button>
        </div>
      </div>
    </>
  );
}

// Helper function to determine status color
function getStatusColor(status: string) {
  switch (status) {
    case 'active':
      return 'success';
    case 'maintenance':
      return 'warning';
    case 'idle':
      return 'secondary';
    case 'offline':
      return 'destructive';
    default:
      return 'secondary';
  }
}
