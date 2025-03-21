/**
 * Mock data generator utility for simulating dynamic and fluctuating data values
 * for various charts and visualizations across the application.
 */

// Helper to generate a random number between min and max with decimal precision
export const getRandomNumber = (min: number, max: number, decimals = 0): number => {
  const value = Math.random() * (max - min) + min;
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

// Generate a random fluctuation to add to a base value (for time-series data)
const getFluctuation = (baseValue: number, maxPercent = 15): number => {
  const fluctuationPercent = getRandomNumber(-maxPercent, maxPercent, 1);
  return baseValue * (fluctuationPercent / 100);
};

// Generate timestamps for various time intervals
export const generateTimeStamps = (count: number, interval: 'hour' | 'day' | 'week' | 'month'): string[] => {
  const timestamps: string[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(now);
    
    switch (interval) {
      case 'hour':
        date.setHours(date.getHours() - i);
        timestamps.push(`${date.getHours()}:00`);
        break;
      case 'day':
        date.setDate(date.getDate() - i);
        timestamps.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
        break;
      case 'week':
        date.setDate(date.getDate() - (i * 7));
        timestamps.push(`Week ${i + 1}`);
        break;
      case 'month':
        date.setMonth(date.getMonth() - i);
        timestamps.push(date.toLocaleDateString('en-US', { month: 'short' }));
        break;
    }
  }
  
  return timestamps.reverse();
};

// Generate hourly power consumption data with fluctuations
export const generateHourlyData = (hours = 24, baseValue = 45, fluctuationPercent = 20) => {
  const timestamps = generateTimeStamps(hours, 'hour');
  
  return timestamps.map(time => {
    const current = baseValue + getFluctuation(baseValue, fluctuationPercent);
    // Make the predicted and optimized values proportional to current but different
    const predicted = current * getRandomNumber(0.95, 1.05, 2);
    const optimized = current * getRandomNumber(0.75, 0.85, 2);
    
    return {
      time,
      current: Math.round(current),
      predicted: Math.round(predicted),
      optimized: Math.round(optimized)
    };
  });
};

// Generate daily power consumption data
export const generateDailyData = (days = 7, baseValue = 250, fluctuationPercent = 25) => {
  const timestamps = generateTimeStamps(days, 'day');
  
  return timestamps.map(time => {
    const current = baseValue + getFluctuation(baseValue, fluctuationPercent);
    // Make the predicted and optimized values proportional to current but different
    const predicted = current * getRandomNumber(0.95, 1.05, 2);
    const optimized = current * getRandomNumber(0.75, 0.85, 2);
    
    return {
      time,
      current: Math.round(current),
      predicted: Math.round(predicted),
      optimized: Math.round(optimized)
    };
  });
};

// Generate weekly power consumption data
export const generateWeeklyData = (weeks = 4, baseValue = 1400, fluctuationPercent = 25) => {
  const timestamps = generateTimeStamps(weeks, 'week');
  
  return timestamps.map(time => {
    const current = baseValue + getFluctuation(baseValue, fluctuationPercent);
    const predicted = current * getRandomNumber(0.95, 1.05, 2);
    const optimized = current * getRandomNumber(0.75, 0.85, 2);
    
    return {
      time,
      current: Math.round(current),
      predicted: Math.round(predicted),
      optimized: Math.round(optimized)
    };
  });
};

// Generate monthly power consumption data
export const generateMonthlyData = (months = 12, baseValue = 5000, fluctuationPercent = 25) => {
  const timestamps = generateTimeStamps(months, 'month');
  
  return timestamps.map(time => {
    const current = baseValue + getFluctuation(baseValue, fluctuationPercent);
    const predicted = current * getRandomNumber(0.95, 1.05, 2);
    const optimized = current * getRandomNumber(0.75, 0.85, 2);
    
    return {
      time,
      current: Math.round(current),
      predicted: Math.round(predicted),
      optimized: Math.round(optimized)
    };
  });
};

// Generate department efficiency data
export const generateDepartmentEfficiency = (baseEfficiency = 72) => {
  const departments = [
    { name: 'Assembly Line', color: 'bg-primary/80' },
    { name: 'Packaging Unit', color: 'bg-success/80' },
    { name: 'Heating & Cooling', color: 'bg-warning/80' },
    { name: 'Quality Control', color: 'bg-info/80' },
  ];
  
  return departments.map(dept => ({
    ...dept,
    efficiency: getRandomNumber(baseEfficiency - 10, baseEfficiency + 10, 1),
    trend: `+${getRandomNumber(0.5, 5, 1)}%`
  }));
};

// Generate AI predictions data with fluctuations
export const generatePredictionData = () => {
  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const baseValue = 48000;
  
  return months.map((month, index) => {
    const actual = index < 3 
      ? baseValue + getFluctuation(baseValue, 5) 
      : null;
    
    const monthValue = baseValue + (index * 1000) + getFluctuation(baseValue, 8);
    const predicted = monthValue;
    const optimized = monthValue * getRandomNumber(0.8, 0.9, 2);
    
    return {
      month,
      actual,
      predicted: Math.round(predicted),
      optimized: Math.round(optimized)
    };
  });
};

// Generate correlation data between temperature and power consumption
export const generateCorrelationData = () => {
  const hours = Array.from({ length: 12 }, (_, i) => `${i * 2}:00`);
  const baseTemp = 20;
  const basePower = 40;
  
  return hours.map(hour => {
    // Create a temperature curve that peaks in the middle of the day
    const hourNum = parseInt(hour);
    const tempDelta = Math.abs(hourNum - 12) < 6 
      ? (6 - Math.abs(hourNum - 12)) * 1.5 
      : 0;
    
    const temperature = baseTemp + tempDelta + getFluctuation(baseTemp, 5);
    
    // Make power consumption correlate with temperature but with some randomness
    const powerCorrelationFactor = 1.5; // Higher means stronger correlation
    const powerConsumption = basePower + (tempDelta * powerCorrelationFactor) + getFluctuation(basePower, 10);
    
    return {
      hour,
      temperature: Math.round(temperature * 10) / 10,
      consumption: Math.round(powerConsumption)
    };
  });
};

// Generate anomaly detection data
export const generateAnomalyData = () => {
  const hours = Array.from({ length: 12 }, (_, i) => `${i * 2}:00`);
  const baseValue = 45;
  
  // Pick a random hour for the anomaly
  const anomalyIndex = getRandomNumber(6, 8, 0);
  
  return hours.map((time, index) => {
    // Create a power consumption curve that follows a daily pattern
    const hourNum = parseInt(time);
    const timeOfDayFactor = hourNum >= 6 && hourNum <= 18 ? 1.5 : 0.8;
    
    let value = baseValue * timeOfDayFactor + getFluctuation(baseValue, 10);
    let normal = true;
    
    // Create an anomaly at the selected index
    if (index === anomalyIndex) {
      value = value * getRandomNumber(1.3, 1.5, 2); // Spike 30-50% higher
      normal = false;
    }
    
    return {
      time,
      value: Math.round(value),
      normal
    };
  });
};

// Generate feature importance data
export const generateFeatureImportanceData = () => {
  // Base importance values that sum to 100
  const baseValues = [35, 25, 20, 12, 8];
  
  const features = [
    'Operating Hours',
    'Ambient Temperature',
    'Production Volume',
    'Machine Age',
    'Maintenance Frequency'
  ];
  
  // Add small fluctuations while keeping the sum close to 100
  const values = baseValues.map(value => {
    const fluctuation = getRandomNumber(-2, 2, 1);
    return Math.max(1, value + fluctuation); // Ensure minimum of 1%
  });
  
  // Normalize to ensure sum is exactly 100
  const sum = values.reduce((a, b) => a + b, 0);
  const normalizedValues = values.map(value => Math.round(value * 100 / sum));
  
  return features.map((name, index) => ({
    name,
    value: normalizedValues[index]
  }));
};

// Generate cost savings data
export const generateCostData = () => {
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(i);
    return date.toLocaleDateString('en-US', { month: 'short' });
  });
  
  const baseCost = 12000;
  const implementationMonth = 5; // June (0-indexed)
  
  return months.map((month, index) => {
    // Actual energy cost increases slightly over the year
    const monthFactor = 1 + (index * 0.01); // 1% increase per month
    const energyCost = Math.round(baseCost * monthFactor + getFluctuation(baseCost, 5));
    
    // Projected cost is the same as actual until implementation, then it decreases
    let projectedCost = energyCost;
    let savings = 0;
    
    if (index >= implementationMonth) {
      // After implementation, projected cost decreases and savings increase
      const monthsSinceImplementation = index - implementationMonth;
      const savingsPercent = Math.min(25, 5 + (monthsSinceImplementation * 2.5)); // Up to 25% savings
      projectedCost = Math.round(energyCost * (1 - savingsPercent / 100));
      savings = energyCost - projectedCost;
    }
    
    return {
      month,
      energyCost,
      projectedCost,
      savings
    };
  });
};
