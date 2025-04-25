
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
  Check,
  MessageSquare,
  ShoppingCart
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const KwikStore = () => {
  const { kwikBuddyProgress, updateKwikBuddyProgress } = useApp();
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: 'Get Ready to Make Your Website Live',
      description: 'Connect your store and set up your website theme.',
      icon: <Globe className="h-5 w-5" />,
      progress: kwikBuddyProgress.website,
      path: '/kwikstore/website-setup'
    },
    {
      id: 2,
      title: 'Product Catalog Setup',
      description: 'Upload and optimize your product catalog with AI.',
      icon: <ShoppingCart className="h-5 w-5" />,
      progress: 65,
      path: '/kwikstore/catalog-setup',
      isNew: true
    },
    {
      id: 3,
      title: 'SEO Setup',
      description: 'Connect analytics and set up your SEO foundation.',
      icon: <Search className="h-5 w-5" />,
      progress: kwikBuddyProgress.seo,
      path: '/kwikstore/seo-setup'
    },
    {
      id: 4,
      title: 'Payments & Shipping Integration',
      description: 'Set up payment methods and shipping options.',
      icon: <CreditCard className="h-5 w-5" />,
      progress: kwikBuddyProgress.payments,
      path: '/kwikstore/payments-shipping'
    },
    {
      id: 5,
      title: 'Store Assistant Setup',
      description: 'Configure AI chatbot to assist your customers.',
      icon: <MessageSquare className="h-5 w-5" />,
      progress: 40,
      path: '/kwikstore/assistant-setup',
      isNew: true
    },
    {
      id: 6,
      title: 'Apps & Extensions',
      description: 'Install essential apps to enhance your store functionality.',
      icon: <PackageCheck className="h-5 w-5" />,
      progress: kwikBuddyProgress.apps,
      path: '/kwikstore/apps-setup'
    },
    {
      id: 7,
      title: 'Page Optimization',
      description: 'Optimize your product pages for better conversions.',
      icon: <Zap className="h-5 w-5" />,
      progress: kwikBuddyProgress.optimization,
      path: '/kwikstore/page-optimization'
    }
  ];

  // Calculate overall progress
  const completedSteps = steps.filter(step => step.progress === 100).length;
  const overallProgress = steps.reduce((total, step) => total + step.progress, 0) / steps.length;

  const goToCurrentStep = () => {
    const currentStep = steps.find(step => step.progress < 100) || steps[0];
    navigate(currentStep.path);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">KwikStore Buddy</h1>
            <p className="text-gray-500">
              Set up your store with AI-powered optimization
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
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">Overall Setup Progress</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <span className="sr-only">Info</span>
                      <Zap className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent align="end" className="w-80 p-4">
                    <p className="font-medium mb-2">AI-Powered Store Setup</p>
                    <p className="text-sm">
                      Our AI analyzes top-performing stores in your industry and recommends optimal 
                      settings for each step. Complete all steps to maximize your conversion potential.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{Math.round(overallProgress)}% Complete</span>
              <span className="text-sm text-gray-500">{completedSteps} of {steps.length} steps completed</span>
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
                  <div className="relative">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${step.progress === 100 ? 'bg-green-100 text-green-600' : kwikBuddyProgress.currentStep === step.id ? 'bg-yale-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {step.progress === 100 ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    {step.isNew && (
                      <span className="absolute -top-1 -right-1 bg-gamboge text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        NEW
                      </span>
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
                  <h3 className="text-lg font-semibold mb-1 flex items-center">
                    {step.title}
                    {step.isNew && (
                      <span className="ml-2 inline-block bg-gamboge/10 text-gamboge text-xs font-medium px-2 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                  </h3>
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

        {/* AI Suggestions */}
        <Card className="border-dashed border-2 border-gamboge/50 bg-gamboge/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Zap className="h-5 w-5 mr-2 text-gamboge" />
              AI-Powered Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-md border border-gray-200 flex justify-between items-center">
                <div>
                  <p className="font-medium">Add product videos to increase conversions</p>
                  <p className="text-sm text-gray-600">Stores with product videos see 34% higher conversion rates.</p>
                </div>
                <Button size="sm" variant="outline" className="flex-shrink-0">
                  Learn How
                </Button>
              </div>
              <div className="p-3 bg-white rounded-md border border-gray-200 flex justify-between items-center">
                <div>
                  <p className="font-medium">Enable customer reviews on product pages</p>
                  <p className="text-sm text-gray-600">Products with reviews convert 270% better than those without.</p>
                </div>
                <Button size="sm" variant="outline" className="flex-shrink-0">
                  Enable Now
                </Button>
              </div>
              <div className="p-3 bg-white rounded-md border border-gray-200 flex justify-between items-center">
                <div>
                  <p className="font-medium">Optimize mobile checkout experience</p>
                  <p className="text-sm text-gray-600">67% of your store visitors are on mobile devices.</p>
                </div>
                <Button size="sm" variant="outline" className="flex-shrink-0">
                  Optimize
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default KwikStore;
