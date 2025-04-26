import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { 
  Globe, 
  Search, 
  CreditCard, 
  PackageCheck, 
  Zap,
  ArrowRight,
  Check
} from 'lucide-react';

const KwikBuddy = () => {
  const { kwikBuddyProgress, updateKwikBuddyProgress } = useApp();
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: 'Get Ready to Make Your Website Live',
      description: 'Connect your store and set up your website theme.',
      icon: <Globe className="h-5 w-5" />,
      progress: kwikBuddyProgress.website,
      path: '/kwikbuddy/website-setup'
    },
    {
      id: 2,
      title: 'SEO Setup',
      description: 'Connect analytics and set up your SEO foundation.',
      icon: <Search className="h-5 w-5" />,
      progress: kwikBuddyProgress.seo,
      path: '/kwikbuddy/seo-setup'
    },
    {
      id: 3,
      title: 'Payments & Shipping Integration',
      description: 'Set up payment methods and shipping options.',
      icon: <CreditCard className="h-5 w-5" />,
      progress: kwikBuddyProgress.payments,
      path: '/kwikbuddy/payments-shipping'
    },
    {
      id: 4,
      title: 'Enable Required Apps for Performance',
      description: 'Install essential apps to enhance your store functionality.',
      icon: <PackageCheck className="h-5 w-5" />,
      progress: kwikBuddyProgress.apps,
      path: '/kwikbuddy/apps-setup'
    },
    {
      id: 5,
      title: 'Page Optimization',
      description: 'Optimize your product pages for better conversions.',
      icon: <Zap className="h-5 w-5" />,
      progress: kwikBuddyProgress.optimization,
      path: '/kwikbuddy/page-optimization'
    }
  ];

  // Calculate overall progress
  const overallProgress = 
    (kwikBuddyProgress.website + 
    kwikBuddyProgress.seo + 
    kwikBuddyProgress.payments + 
    kwikBuddyProgress.apps + 
    kwikBuddyProgress.optimization) / 5;

  const goToCurrentStep = () => {
    const currentStep = steps[kwikBuddyProgress.currentStep - 1] || steps[0];
    navigate(currentStep.path);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">KwikBuddy</h1>
            <p className="text-gray-500">
              Set up your store in 5 easy steps
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={goToCurrentStep} className="btn-primary">
              Continue Setup
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Overall Progress */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Overall Setup Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{Math.round(overallProgress)}% Complete</span>
              <span className="text-sm text-gray-500">{steps.filter(step => step.progress === 100).length} of 5 steps completed</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yale-blue rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Step Cards */}
        <div className="space-y-4">
          {steps.map((step) => (
            <Card 
              key={step.id}
              className={`overflow-hidden border ${kwikBuddyProgress.currentStep === step.id ? 'border-yale-blue' : 'border-gray-200'} transition-all duration-200 hover:shadow-md`}
            >
              <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Status indicator */}
                <div className={`p-4 flex flex-col justify-center items-center ${step.progress === 100 ? 'bg-green-50' : kwikBuddyProgress.currentStep === step.id ? 'bg-yale-blue/10' : 'bg-gray-50'}`}>
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${step.progress === 100 ? 'bg-green-100 text-green-600' : kwikBuddyProgress.currentStep === step.id ? 'bg-yale-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step.progress === 100 ? (
                      <Check className="h-6 w-6" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <span className={`text-sm font-medium ${step.progress === 100 ? 'text-green-600' : kwikBuddyProgress.currentStep === step.id ? 'text-yale-blue' : 'text-gray-500'}`}>
                      Step {step.id}
                    </span>
                    <div className="text-xs text-gray-500">
                      {step.progress}% done
                    </div>
                  </div>
                </div>
                
                {/* Step content */}
                <div className="p-4 md:col-span-3">
                  <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${step.progress === 100 ? 'bg-green-500' : 'bg-yale-blue'} rounded-full transition-all duration-500`}
                      style={{ width: `${step.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Action button */}
                <div className="p-4 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-200">
                  <Button 
                    variant={step.progress === 100 ? "outline" : "default"}
                    className={step.progress === 100 ? "btn-secondary" : "btn-primary"}
                    onClick={() => navigate(step.path)}
                  >
                    {step.progress === 100 ? "Review" : kwikBuddyProgress.currentStep === step.id ? "Continue" : "Start"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KwikBuddy;
