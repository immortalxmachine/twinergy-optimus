
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AddMachineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSuccess: () => void;
}

export default function AddMachineDialog({ open, onOpenChange, onAddSuccess }: AddMachineDialogProps) {
  const [machineName, setMachineName] = useState('');
  const [machineType, setMachineType] = useState('');
  const [status, setStatus] = useState('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate adding a machine
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      resetForm();
      onAddSuccess();
    }, 1000);
  };

  const resetForm = () => {
    setMachineName('');
    setMachineType('');
    setStatus('idle');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Machine</DialogTitle>
          <DialogDescription>
            Enter the details for the new machine you want to add to the system.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Machine Name</Label>
            <Input
              id="name"
              value={machineName}
              onChange={(e) => setMachineName(e.target.value)}
              placeholder="e.g. CNC Machine #4"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Machine Type</Label>
            <Input
              id="type"
              value={machineType}
              onChange={(e) => setMachineType(e.target.value)}
              placeholder="e.g. CNC, Robot, Injection Molder"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Initial Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Online</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter className="pt-4">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Machine'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
