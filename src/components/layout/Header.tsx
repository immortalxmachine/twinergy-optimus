
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Cpu, 
  BarChart3, 
  Settings, 
  BrainCircuit, 
  Bell,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

const NavItem = ({ 
  to, 
  label, 
  icon: Icon, 
  isActive, 
  onClick 
}: { 
  to: string; 
  label: string; 
  icon: React.ElementType; 
  isActive: boolean;
  onClick?: () => void;
}) => {
  return (
    <Link 
      to={to} 
      className="w-full"
      onClick={onClick}
    >
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 font-normal transition-all duration-300",
          isActive 
            ? "bg-primary/10 text-primary" 
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        )}
      >
        <Icon size={20} className={isActive ? "text-primary" : "text-muted-foreground"} />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

export default function Header() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/machines", label: "Machines", icon: Cpu },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/ai-insights", label: "AI Insights", icon: BrainCircuit },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      "bg-background/70 backdrop-blur-md",
      scrolled ? "shadow-sm border-b" : "border-b border-transparent"
    )}>
      <div className="container mx-auto py-3 px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="mr-2"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            )}
            
            <Link to="/" className="flex items-center gap-2 mr-8">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <div className="font-semibold text-lg hidden sm:block">Twinergy</div>
            </Link>

            {!isMobile && (
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <NavItem
                    key={item.path}
                    to={item.path}
                    label={item.label}
                    icon={item.icon}
                    isActive={location.pathname === item.path}
                  />
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />
              <span className="sr-only">Notifications</span>
            </Button>

            <Avatar className="h-9 w-9 transition-transform hover:scale-105">
              <AvatarFallback>FA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transform transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="h-full w-64 bg-background border-r p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <div className="font-semibold text-lg">Twinergy</div>
            </div>
            <Separator className="mb-4" />
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  to={item.path}
                  label={item.label}
                  icon={item.icon}
                  isActive={location.pathname === item.path}
                  onClick={closeMenu}
                />
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
