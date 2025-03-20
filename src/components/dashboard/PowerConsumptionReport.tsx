
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';

// Import refactored components
import ReportHeader from './report/ReportHeader';
import ReportOverview from './report/ReportOverview';
import ConsumptionAnalysis from './report/ConsumptionAnalysis';
import SensorDataAnalysis from './report/SensorDataAnalysis';
import IdentifiedInefficiencies from './report/IdentifiedInefficiencies';
import OptimizationStrategies from './report/OptimizationStrategies';
import ProjectedImpact from './report/ProjectedImpact';
import NextSteps from './report/NextSteps';
import ReportFooter from './report/ReportFooter';

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
          <ReportHeader onClose={onClose} />
        </CardHeader>
        <CardContent className="py-6 space-y-8 text-sm">
          {/* Overview section */}
          <ReportOverview />
          
          <hr className="border-t border-border" />
          
          {/* 1. Current Power Consumption Analysis */}
          <ConsumptionAnalysis />
          
          <hr className="border-t border-border" />
          
          {/* 2. Key Sensor Data Analysis */}
          <SensorDataAnalysis />
          
          <hr className="border-t border-border" />
          
          {/* 3. Identified Inefficiencies */}
          <IdentifiedInefficiencies />
          
          <hr className="border-t border-border" />
          
          {/* 4. Recommended Optimization Strategies */}
          <OptimizationStrategies />
          
          <hr className="border-t border-border" />
          
          {/* 5. Projected Impact */}
          <ProjectedImpact />
          
          <hr className="border-t border-border" />
          
          {/* 6. Next Steps */}
          <NextSteps />
          
          <hr className="border-t border-border" />
          
          {/* Footer */}
          <ReportFooter date={currentDate} />
        </CardContent>
      </Card>
    </div>
  );
}
