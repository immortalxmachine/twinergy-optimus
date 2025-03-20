
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PowerConsumptionReport from '@/components/dashboard/PowerConsumptionReport';
import { useToast } from '@/hooks/use-toast';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MetricsOverview from '@/components/dashboard/MetricsOverview';
import MainContent from '@/components/dashboard/MainContent';
import MachineStatusSection from '@/components/dashboard/MachineStatusSection';
import FactoryPerformance from '@/components/dashboard/FactoryPerformance';

export default function Index() {
  const [showReport, setShowReport] = useState(false);
  const { toast } = useToast();

  const handleGenerateReport = () => {
    // Show loading toast
    toast({
      title: "Generating Report",
      description: "Analyzing factory data and preparing your report...",
      duration: 1500,
    });
    
    // Simulate processing time then show the report
    setTimeout(() => {
      setShowReport(true);
    }, 1500);
  };

  return (
    <Layout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <DashboardHeader onGenerateReport={handleGenerateReport} />
        
        {/* Metrics Overview */}
        <MetricsOverview />
        
        {/* Main Content */}
        <MainContent />
        
        {/* Machine Status Section */}
        <MachineStatusSection />
        
        {/* Factory Performance */}
        <FactoryPerformance />
      </div>

      {/* Render the report modal when showReport is true */}
      {showReport && <PowerConsumptionReport onClose={() => setShowReport(false)} />}
    </Layout>
  );
}
