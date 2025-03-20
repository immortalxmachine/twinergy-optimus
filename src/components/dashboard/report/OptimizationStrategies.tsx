
import React from 'react';

export default function OptimizationStrategies() {
  return (
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
  );
}
