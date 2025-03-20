
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { machineData } from '@/components/machines/MachineData';
import MachineDetailsHeader from '@/components/machines/MachineDetailsHeader';
import MachineStats from '@/components/machines/MachineStats';
import MachineTabs from '@/components/machines/MachineTabs';

export default function MachineDetails() {
  const { id } = useParams<{ id: string }>();
  
  // Get machine data for the specified ID, or show a default state
  const machine = id && machineData[id as keyof typeof machineData];
  
  if (!machine) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
          <AlertCircle className="h-16 w-16 text-muted-foreground/50" />
          <h2 className="text-2xl font-medium">Machine Not Found</h2>
          <p className="text-muted-foreground">The machine with ID {id} could not be found.</p>
          <Button asChild>
            <Link to="/machines" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Machines
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-8 animate-slide-up">
        <MachineDetailsHeader machine={machine} />
        <MachineStats machine={machine} />
        <MachineTabs machine={machine} />
      </div>
    </Layout>
  );
}
