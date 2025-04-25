
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';
import { 
  PackageCheck, 
  ArrowRight, 
  ExternalLink,
  Check,
  ShoppingCart,
  UserCheck
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AppCardProps {
  name: string;
  description: string;
  logo: string;
  url: string;
  category: string;
  installed: boolean;
  onInstall: () => void;
}

const AppCard: React.FC<AppCardProps> = ({ 
  name, 
  description, 
  logo, 
  url, 
  category, 
  installed, 
  onInstall 
}) => {
  return (
    <div className="border rounded-md overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start space-x-4">
          <img 
            src={logo} 
            alt={name} 
            className="h-12 w-12 rounded object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium">{name}</h3>
              <Badge variant="outline" className="text-xs">{category}</Badge>
            </div>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
        </div>
      </div>
      <div className="border-t p-3 bg-gray-50 flex justify-between items-center">
        <Button 
          variant="link" 
          className="text-xs text-gray-500 px-0"
          onClick={() => window.open(url, '_blank')}
        >
          View Details
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
        <Button 
          onClick={onInstall}
          disabled={installed}
          size="sm"
          className={installed ? "bg-green-500 hover:bg-green-600" : "btn-primary"}
        >
          {installed ? (
            <>
              <Check className="mr-1 h-3 w-3" />
              Installed
            </>
          ) : (
            "Install"
          )}
        </Button>
      </div>
    </div>
  );
};

const AppsSetup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { kwikBuddyProgress, updateKwikBuddyProgress } = useApp();
  
  const [currentProgress, setCurrentProgress] = useState(kwikBuddyProgress.apps);
  const [installedApps, setInstalledApps] = useState<string[]>([]);
  
  // Recommended apps data
  const recommendedApps = [
    {
      id: 'kwikpass',
      name: 'KwikPass',
      description: 'One-click login and checkout for faster conversions',
      logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGxvZ2lufGVufDB8fDB8fHww',
      url: 'https://apps.shopify.com/kwikpass',
      category: 'Checkout',
    },
    {
      id: 'kwikcart',
      name: 'KwikCart',
      description: 'Slide cart drawer with upsell and cross-sell features',
      logo: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNob3BwaW5nJTIwY2FydHxlbnwwfHwwfHx8MA%3D%3D',
      url: 'https://apps.shopify.com/kwik-cart-slide-cart-drawer',
      category: 'Cart',
    },
  ];
  
  // Suggested apps data
  const suggestedApps = [
    {
      id: 'reviews',
      name: 'Product Reviews',
      description: 'Collect and display product reviews to build trust',
      logo: 'https://images.unsplash.com/photo-1557700836-25f2464e845d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJldmlld3N8ZW58MHx8MHx8fDA%3D',
      url: '#',
      category: 'Marketing',
    },
    {
      id: 'upsell',
      name: 'Ultimate Upsell',
      description: 'Increase average order value with targeted upsells',
      logo: 'https://images.unsplash.com/photo-1694518106400-73c96afa6a41?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVwc2VsbHxlbnwwfHwwfHx8MA%3D%3D',
      url: '#',
      category: 'Sales',
    },
    {
      id: 'emails',
      name: 'Email Marketing',
      description: 'Send automated emails to recover abandoned carts',
      logo: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZW1haWx8ZW58MHx8MHx8fDA%3D',
      url: '#',
      category: 'Marketing',
    },
    {
      id: 'loyalty',
      name: 'Loyalty Points',
      description: 'Reward customers and increase retention',
      logo: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG95YWx0eXxlbnwwfHwwfHx8MA%3D%3D',
      url: '#',
      category: 'Customer',
    },
  ];
  
  // Update progress state and context
  const updateProgress = (newProgress: number) => {
    setCurrentProgress(newProgress);
    updateKwikBuddyProgress({
      apps: newProgress,
      currentStep: 4,
    });
  };
  
  // Handle app installation
  const installApp = (appId: string) => {
    // If app is already installed, do nothing
    if (installedApps.includes(appId)) return;
    
    // Add app to installed apps
    setInstalledApps([...installedApps, appId]);
    
    // Update progress based on which apps are installed
    if (appId === 'kwikpass' || appId === 'kwikcart') {
      // Calculate progress based on required apps
      const requiredAppsCount = recommendedApps.length;
      const installedRequiredApps = [...installedApps, appId].filter(
        id => recommendedApps.some(app => app.id === id)
      ).length;
      
      const newProgress = Math.min(100, Math.floor((installedRequiredApps / requiredAppsCount) * 100));
      updateProgress(newProgress);
    }
    
    // Show toast notification
    toast({
      title: `${appId === 'kwikpass' ? 'KwikPass' : appId === 'kwikcart' ? 'KwikCart' : 'App'} installed`,
      description: "The app has been successfully installed on your store",
    });
  };
  
  // Handle completing the step
  const completeStep = () => {
    // Check if at least one required app is installed
    const hasRequiredApp = installedApps.some(
      id => recommendedApps.some(app => app.id === id)
    );
    
    if (!hasRequiredApp) {
      toast({
        title: "Required App Missing",
        description: "Please install at least one of the required apps before proceeding",
        variant: "destructive",
      });
      return;
    }
    
    updateProgress(100);
    navigate('/kwikbuddy/page-optimization');
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Enable Required Apps</h1>
            <p className="text-gray-500">
              Install essential apps to enhance your store functionality
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-sm font-medium mr-2">{currentProgress}% Complete</span>
            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yale-blue rounded-full transition-all duration-500"
                style={{ width: `${currentProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Required Apps Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PackageCheck className="h-5 w-5 mr-2 text-yale-blue" />
              Required Apps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                These apps are essential for your store's performance and customer experience.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <AppCard
                  name="KwikPass"
                  description="One-click login and checkout for faster conversions"
                  logo="https://images.unsplash.com/photo-1560472355-536de3962603?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGxvZ2lufGVufDB8fDB8fHww"
                  url="https://apps.shopify.com/kwikpass"
                  category="Checkout"
                  installed={installedApps.includes('kwikpass')}
                  onInstall={() => installApp('kwikpass')}
                />
                
                <AppCard
                  name="KwikCart"
                  description="Slide cart drawer with upsell and cross-sell features"
                  logo="https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNob3BwaW5nJTIwY2FydHxlbnwwfHwwfHx8MA%3D%3D"
                  url="https://apps.shopify.com/kwik-cart-slide-cart-drawer"
                  category="Cart"
                  installed={installedApps.includes('kwikcart')}
                  onInstall={() => installApp('kwikcart')}
                />
              </div>
              
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-500">Key Features</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="flex items-center mb-3">
                    <UserCheck className="h-5 w-5 text-yale-blue mr-2" />
                    <h3 className="font-medium">KwikPass Benefits</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>60% faster checkout experience</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>OTP-based login without passwords</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Auto-fill shipping and payment details</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Reduces cart abandonment by 30%</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="flex items-center mb-3">
                    <ShoppingCart className="h-5 w-5 text-yale-blue mr-2" />
                    <h3 className="font-medium">KwikCart Benefits</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Attractive slide-out cart drawer</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Smart product recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Increases average order value by 15%</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Works with all Shopify themes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Suggested Apps Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PackageCheck className="h-5 w-5 mr-2 text-yale-blue" />
              Suggested Apps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                These apps are recommended to further enhance your store functionality.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {suggestedApps.map((app) => (
                  <AppCard
                    key={app.id}
                    name={app.name}
                    description={app.description}
                    logo={app.logo}
                    url={app.url}
                    category={app.category}
                    installed={installedApps.includes(app.id)}
                    onInstall={() => installApp(app.id)}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate('/kwikbuddy/payments-shipping')}
              >
                Back
              </Button>
              <Button 
                onClick={completeStep}
                className="btn-primary"
              >
                Go to Page Optimization
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AppsSetup;
