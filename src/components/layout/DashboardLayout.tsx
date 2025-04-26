
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Package, 
  BarChart, 
  Settings, 
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Globe,
  BarChart3,
  ShoppingCart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [storeName, setStoreName] = useState('User Store');
  const location = useLocation();
  
  useEffect(() => {
    // Fetch the store name from the server
    fetch('http://localhost:3000/user-details')
      .then(response => {
        if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
          return response.json();
        } else {
          throw new Error('Invalid JSON response');
        }
      })
      .then(data => {
        if (data.storeName) {
          setStoreName(data.storeName);
        }
      })
      .catch(error => console.error('Error fetching store name:', error));
  }, []);

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      name: 'KwikStore Buddy', 
      path: '/kwikstore', 
      icon: <Package className="h-5 w-5" /> 
    },
    { 
      name: 'KwikGrowth', 
      path: '/kwikgrowth', 
      icon: <BarChart className="h-5 w-5" /> 
    },
    
    
    { 
      name: 'Analytics', 
      path: '/analytics', 
      icon: <ShoppingCart className="h-5 w-5" /> 
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar toggle */}
      <div className="fixed z-20 top-4 left-4 md:hidden">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white shadow-md rounded-full"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed md:relative z-30 h-full bg-white shadow-md transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="flex items-center">
              {isOpen ? (
                <span className="text-xl font-bold text-oxford-blue">
                  kwik<span className="text-yale-blue">commerce</span><span className="text-gamboge">.ai</span>
                </span>
              ) : (
                <span className="text-xl font-bold text-yale-blue">k</span>
              )}
            </Link>
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(!isOpen)}
                className="hidden md:flex"
              >
                {isOpen ? 
                  <ChevronLeft className="h-5 w-5" /> : 
                  <ChevronRight className="h-5 w-5" />
                }
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileOpen(false)}
                className="md:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md transition-colors",
                      isActive(link.path) 
                        ? "bg-yale-blue text-white" 
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <span className="mr-3">{link.icon}</span>
                    {isOpen && <span>{link.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            <div className={cn(
              "flex items-center",
              isOpen ? "justify-between" : "justify-center"
            )}>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-oxford-blue text-white flex items-center justify-center font-medium">
                  U
                </div>
                {isOpen && (
                  <div>
                    <p className="text-sm font-medium">{storeName}</p>
                    <p className="text-xs text-gray-500">Basic Plan</p>
                  </div>
                )}
              </div>
              {isOpen && (
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
