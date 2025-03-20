
import React, { useState } from 'react';
import { Check, ArrowRight, Lightbulb, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Sample recommendation data
const recommendations = [
  {
    id: 1,
    title: 'Reduce Injection Molder D power during idle periods',
    description: 'Setting the machine to low-power mode during detected idle periods could save 12.5% energy.',
    impact: 'high',
    savingsKwh: 780,
    savingsCost: 156,
    isImplemented: false,
    category: 'optimization',
  },
  {
    id: 2,
    title: 'Optimize CNC Mill A startup sequence',
    description: 'Staggering the startup sequence can reduce peak power demand by up to 8.3%.',
    impact: 'medium',
    savingsKwh: 425,
    savingsCost: 85,
    isImplemented: true,
    category: 'scheduling',
  },
  {
    id: 3,
    title: 'Schedule maintenance for Welding Robot E',
    description: 'Efficiency has dropped 5.2% below baseline, suggesting maintenance is required.',
    impact: 'high',
    savingsKwh: 950,
    savingsCost: 190,
    isImplemented: false,
    category: 'maintenance',
  },
  {
    id: 4,
    title: 'Adjust cooling parameters for Assembly Line C',
    description: 'Reducing cooling duration by 15% would maintain quality while saving energy.',
    impact: 'low',
    savingsKwh: 210,
    savingsCost: 42,
    isImplemented: false,
    category: 'optimization',
  },
];

interface AIRecommendationsProps {
  className?: string;
  limit?: number;
}

export default function AIRecommendations({ className, limit = 3 }: AIRecommendationsProps) {
  const [openRecommendation, setOpenRecommendation] = useState<number | null>(null);
  const [implementedIds, setImplementedIds] = useState<number[]>(
    recommendations.filter(r => r.isImplemented).map(r => r.id)
  );
  
  const displayedRecommendations = limit 
    ? recommendations.slice(0, limit) 
    : recommendations;
  
  const handleToggleRecommendation = (id: number) => {
    setOpenRecommendation(openRecommendation === id ? null : id);
  };
  
  const handleImplement = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setImplementedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };
  
  return (
    <div className={cn("space-y-3", className)}>
      {displayedRecommendations.map((recommendation) => {
        const isOpen = openRecommendation === recommendation.id;
        const isImplemented = implementedIds.includes(recommendation.id);
        
        return (
          <div 
            key={recommendation.id}
            className={cn(
              "border rounded-lg overflow-hidden transition-all duration-300",
              isImplemented ? "bg-success/5 border-success/20" : "bg-background",
              isOpen ? "shadow-sm" : "hover:border-primary/50"
            )}
          >
            <div 
              className="flex items-center justify-between px-4 py-3 cursor-pointer"
              onClick={() => handleToggleRecommendation(recommendation.id)}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center",
                  isImplemented ? "bg-success/20" : "bg-primary/10"
                )}>
                  {isImplemented ? (
                    <Check size={16} className="text-success" />
                  ) : (
                    <Lightbulb size={16} className="text-primary" />
                  )}
                </div>
                
                <div>
                  <h3 className={cn(
                    "font-medium text-sm transition-colors",
                    isImplemented && "text-muted-foreground line-through decoration-success/70"
                  )}>
                    {recommendation.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs px-1.5 py-0 h-5 capitalize",
                        recommendation.impact === 'high' && "border-efficiency-high/40 text-efficiency-high",
                        recommendation.impact === 'medium' && "border-efficiency-medium/40 text-efficiency-medium",
                        recommendation.impact === 'low' && "border-efficiency-low/40 text-efficiency-low",
                      )}
                    >
                      {recommendation.impact} impact
                    </Badge>
                    
                    <Badge 
                      variant="outline" 
                      className="text-xs px-1.5 py-0 h-5 capitalize border-primary/30 text-primary"
                    >
                      {recommendation.category}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {!isImplemented && (
                  <div className="text-right mr-2 hidden sm:block">
                    <div className="text-xs text-muted-foreground">Potential savings</div>
                    <div className="text-sm font-medium">${recommendation.savingsCost}/month</div>
                  </div>
                )}
                
                {isOpen ? (
                  <ChevronUp size={20} className="text-muted-foreground" />
                ) : (
                  <ChevronDown size={20} className="text-muted-foreground" />
                )}
              </div>
            </div>
            
            {isOpen && (
              <div className="px-4 pb-4 pt-1 animate-slide-down">
                <Separator className="mb-3" />
                <p className="text-sm text-muted-foreground mb-3">
                  {recommendation.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-muted/30 rounded-md p-3">
                    <div className="text-xs text-muted-foreground mb-1">Energy Savings</div>
                    <div className="font-medium">{recommendation.savingsKwh} kWh/month</div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-md p-3">
                    <div className="text-xs text-muted-foreground mb-1">Cost Savings</div>
                    <div className="font-medium">${recommendation.savingsCost}/month</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                    className="gap-1.5"
                  >
                    <ArrowRight size={14} />
                    <span>Details</span>
                  </Button>
                  
                  <Button
                    variant={isImplemented ? "outline" : "default"}
                    size="sm"
                    onClick={(e) => handleImplement(recommendation.id, e)}
                    className={cn(
                      "gap-1.5",
                      isImplemented && "border-success text-success hover:bg-success/10"
                    )}
                  >
                    {isImplemented ? (
                      <>
                        <Check size={14} />
                        <span>Implemented</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        <span>Implement</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
