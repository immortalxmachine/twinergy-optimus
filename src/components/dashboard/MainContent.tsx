
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import PowerConsumptionChart from '@/components/dashboard/PowerConsumptionChart';
import AIRecommendations from '@/components/dashboard/AIRecommendations';

export default function MainContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Power Consumption Chart */}
      <DashboardCard
        title="Power Consumption"
        description="Historical and predicted energy usage with AI optimized suggestions"
        className="lg:col-span-2"
      >
        <PowerConsumptionChart />
      </DashboardCard>
      
      {/* AI Recommendations */}
      <DashboardCard
        title="AI Recommendations"
        description="Optimize your energy usage with these insights"
        footer={
          <Link to="/ai-insights" className="inline-flex items-center text-sm text-primary hover:underline gap-1">
            <span>View all recommendations</span>
            <ArrowRight size={14} />
          </Link>
        }
      >
        <AIRecommendations limit={3} />
      </DashboardCard>
    </div>
  );
}
