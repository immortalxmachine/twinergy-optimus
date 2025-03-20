
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MachineStatusGrid from '@/components/dashboard/MachineStatusGrid';

export default function MachineStatusSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold tracking-tight">Machine Status</h2>
            <Badge variant="outline" className="text-xs font-normal">6 of 18</Badge>
          </div>
          <p className="text-muted-foreground mt-1">Monitor the real-time status of your machines</p>
        </div>
        
        <Link to="/machines">
          <Button variant="ghost" size="sm" className="gap-1">
            <span>View All</span>
            <ChevronRight size={16} />
          </Button>
        </Link>
      </div>
      
      <MachineStatusGrid limit={6} />
    </div>
  );
}
