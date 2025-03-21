
/**
 * Utility functions for generating realistic mock data for charts and graphs
 */

// Generate random number within a range
export const randomNumber = (min: number, max: number, decimals = 0): number => {
  const value = Math.random() * (max - min) + min;
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
};

// Generate a time series with random values and optional trend
export const generateTimeSeries = (
  points: number,
  minValue: number, 
  maxValue: number,
  trend: 'up' | 'down' | 'stable' | 'volatile' = 'stable',
  decimals = 0
): number[] => {
  const values: number[] = [];
  let currentValue = randomNumber(minValue, maxValue, decimals);
  
  for (let i = 0; i < points; i++) {
    values.push(currentValue);
    
    // Apply trend to next value
    let change: number;
    switch (trend) {
      case 'up':
        change = randomNumber(0, (maxValue - minValue) * 0.05, decimals);
        break;
      case 'down':
        change = -randomNumber(0, (maxValue - minValue) * 0.05, decimals);
        break;
      case 'volatile':
        change = randomNumber(-(maxValue - minValue) * 0.08, (maxValue - minValue) * 0.08, decimals);
        break;
      default: // stable
        change = randomNumber(-(maxValue - minValue) * 0.02, (maxValue - minValue) * 0.02, decimals);
    }
    
    currentValue += change;
    // Ensure value stays within bounds
    currentValue = Math.max(minValue, Math.min(maxValue, currentValue));
  }
  
  return values;
};

// Generate hourly data for a day
export const generateHourlyData = (
  baseValue: number,
  variance: number,
  withOptimization = true
) => {
  return Array.from({ length: 24 }, (_, i) => {
    // Create a realistic pattern with morning and evening peaks
    let modifier = 1;
    if (i >= 7 && i <= 10) modifier = 1.5; // Morning peak
    if (i >= 17 && i <= 21) modifier = 1.8; // Evening peak
    if (i >= 0 && i <= 5) modifier = 0.6; // Night time low
    
    const current = Math.round(baseValue * modifier + randomNumber(-variance, variance));
    const predicted = Math.round(current * (1 + randomNumber(-0.05, 0.05)));
    const optimized = withOptimization ? Math.round(current * (1 - randomNumber(0.1, 0.2))) : null;
    
    return {
      time: `${i}:00`,
      current,
      predicted,
      optimized
    };
  });
};

// Generate daily data
export const generateDailyData = (
  days: number,
  baseValue: number,
  variance: number,
  withOptimization = true
) => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1) + i);
    
    // Weekend vs weekday
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const modifier = isWeekend ? 0.7 : 1;
    
    const current = Math.round(baseValue * modifier + randomNumber(-variance, variance));
    const predicted = Math.round(current * (1 + randomNumber(-0.05, 0.05)));
    const optimized = withOptimization ? Math.round(current * (1 - randomNumber(0.1, 0.25))) : null;
    
    return {
      time: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toISOString().split('T')[0],
      current,
      predicted,
      optimized
    };
  });
};

// Generate monthly data
export const generateMonthlyData = (withOptimization = true) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Seasonal pattern with higher usage in summer/winter
  const seasonalFactors = [0.9, 0.85, 0.8, 0.85, 0.9, 1.1, 1.2, 1.2, 1.0, 0.9, 0.95, 1.0];
  
  return months.map((month, i) => {
    const baseValue = 5000;
    const current = Math.round(baseValue * seasonalFactors[i] + randomNumber(-300, 300));
    
    // Increasing optimization benefits over time
    const optimizationFactor = i < 5 ? 0 : ((i - 4) * 0.025);
    const predicted = Math.round(current * (1 + randomNumber(-0.03, 0.03)));
    const optimized = withOptimization 
      ? Math.round(current * (1 - (0.1 + optimizationFactor)))
      : null;
    
    return {
      time: month,
      month,
      current,
      predicted,
      optimized,
      // Add cost data as well
      energyCost: Math.round(current * 0.12),
      projectedCost: Math.round(optimized ? optimized * 0.12 : current * 0.12),
      savings: optimized ? Math.round((current - optimized) * 0.12) : 0
    };
  });
};

// Generate quarterly data based on monthly
export const generateQuarterlyData = () => {
  const monthlyData = generateMonthlyData();
  
  return [
    {
      quarter: 'Q1',
      energyCost: monthlyData.slice(0, 3).reduce((sum, m) => sum + m.energyCost, 0),
      projectedCost: monthlyData.slice(0, 3).reduce((sum, m) => sum + m.projectedCost, 0),
      savings: monthlyData.slice(0, 3).reduce((sum, m) => sum + m.savings, 0)
    },
    {
      quarter: 'Q2',
      energyCost: monthlyData.slice(3, 6).reduce((sum, m) => sum + m.energyCost, 0),
      projectedCost: monthlyData.slice(3, 6).reduce((sum, m) => sum + m.projectedCost, 0),
      savings: monthlyData.slice(3, 6).reduce((sum, m) => sum + m.savings, 0)
    },
    {
      quarter: 'Q3',
      energyCost: monthlyData.slice(6, 9).reduce((sum, m) => sum + m.energyCost, 0),
      projectedCost: monthlyData.slice(6, 9).reduce((sum, m) => sum + m.projectedCost, 0),
      savings: monthlyData.slice(6, 9).reduce((sum, m) => sum + m.savings, 0)
    },
    {
      quarter: 'Q4',
      energyCost: monthlyData.slice(9, 12).reduce((sum, m) => sum + m.energyCost, 0),
      projectedCost: monthlyData.slice(9, 12).reduce((sum, m) => sum + m.projectedCost, 0),
      savings: monthlyData.slice(9, 12).reduce((sum, m) => sum + m.savings, 0)
    }
  ];
};

// Generate departments data
export const generateDepartmentData = (count = 4) => {
  const departments = [
    { name: 'Assembly Line', color: 'bg-primary/80' },
    { name: 'Packaging Unit', color: 'bg-success/80' },
    { name: 'Heating & Cooling', color: 'bg-warning/80' },
    { name: 'Quality Control', color: 'bg-info/80' },
    { name: 'Logistics', color: 'bg-destructive/80' },
    { name: 'Warehouse', color: 'bg-purple-500/80' }
  ];
  
  return departments.slice(0, count).map(dept => ({
    ...dept,
    efficiency: randomNumber(60, 85),
    trend: `+${randomNumber(0.5, 4.5, 1)}%`,
    value: randomNumber(5, 45)
  }));
};

// Generate prediction data
export const generatePredictionData = () => {
  const currentMonth = new Date().getMonth();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Get 3 past months and 3 future months
  const showMonths = [];
  for (let i = -3; i <= 2; i++) {
    let monthIndex = (currentMonth + i) % 12;
    if (monthIndex < 0) monthIndex += 12;
    showMonths.push(months[monthIndex]);
  }
  
  return showMonths.map((month, index) => {
    const isHistory = index < 3;
    const baseValue = 49000 + randomNumber(-1000, 2000);
    
    return {
      month,
      actual: isHistory ? baseValue : null,
      predicted: baseValue + randomNumber(-500, 500),
      optimized: baseValue * 0.85 + randomNumber(-200, 200)
    };
  });
};

// Generate correlation data for temperature and consumption
export const generateCorrelationData = () => {
  return Array.from({ length: 12 }, (_, i) => {
    // Temperature follows a general bell curve during the day
    let temperature;
    if (i < 6) {
      temperature = 18 + i;
    } else if (i < 18) {
      temperature = 24 + randomNumber(-2, 2);
    } else {
      temperature = 24 - (i - 17);
    }
    
    // Consumption correlates with temperature but with some noise
    const baseConsumption = 40;
    const tempEffect = (temperature - 20) * 2;
    const consumption = baseConsumption + tempEffect + randomNumber(-5, 5);
    
    return {
      hour: `${i*2}:00`,
      temperature,
      consumption: Math.round(consumption)
    };
  });
};

// Generate anomaly data
export const generateAnomalyData = (anomalyHour = 12) => {
  return Array.from({ length: 12 }, (_, i) => {
    const hour = i * 2;
    
    // Create a realistic daily pattern
    let baseValue = 40;
    if (hour >= 8 && hour <= 18) {
      baseValue = 65;
    }
    if (hour >= 12 && hour <= 14) {
      baseValue = 70;
    }
    
    // Add anomaly at specified hour
    const isAnomaly = hour === anomalyHour;
    const value = isAnomaly 
      ? baseValue * 1.35 + randomNumber(-3, 3)
      : baseValue + randomNumber(-5, 5);
    
    return {
      time: `${hour}:00`,
      value: Math.round(value),
      normal: !isAnomaly
    };
  });
};

// Generate feature importance data
export const generateFeatureImportanceData = () => {
  const features = [
    { name: 'Operating Hours', color: 'hsl(var(--primary))' },
    { name: 'Ambient Temperature', color: 'hsl(var(--warning))' },
    { name: 'Production Volume', color: 'hsl(var(--success))' },
    { name: 'Machine Age', color: 'hsl(var(--info))' },
    { name: 'Maintenance Frequency', color: 'hsl(var(--destructive))' }
  ];
  
  const totalValue = 100;
  let remainingValue = totalValue;
  
  return features.map((feature, index) => {
    // Last item gets remaining value
    if (index === features.length - 1) {
      return { ...feature, value: remainingValue };
    }
    
    // Distribute values with some randomness but in descending order
    const maxPossible = remainingValue - (features.length - index - 1) * 5;
    const value = index === 0 
      ? randomNumber(30, 40) 
      : randomNumber(5, maxPossible / (features.length - index));
    
    remainingValue -= value;
    return { ...feature, value };
  });
};
