
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Check, X, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly');
  };

  // Pricing data
  const pricingPlans = [
    {
      name: 'Starter',
      description: 'For new ecommerce stores',
      monthlyPrice: 29,
      annualPrice: 23, // 20% discount applied
      features: [
        { name: 'KwikStore Buddy (Basic)', included: true },
        { name: 'AI Store Assistant', included: true, limit: '5 queries/day' },
        { name: 'Basic SEO Tools', included: true },
        { name: 'Email Support', included: true },
        { name: '1 Store Connection', included: true },
        { name: 'KwikGrowth', included: false },
        { name: 'KwikAds++', included: false },
        { name: 'KwikShip', included: false },
        { name: 'Priority Support', included: false },
        { name: 'Custom Branding', included: false },
      ]
    },
    {
      name: 'Growth',
      description: 'For growing businesses',
      monthlyPrice: 79,
      annualPrice: 63, // 20% discount applied
      popular: true,
      features: [
        { name: 'KwikStore Buddy (Full)', included: true },
        { name: 'AI Store Assistant', included: true, limit: 'Unlimited' },
        { name: 'Advanced SEO Tools', included: true },
        { name: 'Priority Support', included: true },
        { name: '3 Store Connections', included: true },
        { name: 'KwikGrowth', included: true },
        { name: 'KwikAds++ (Basic)', included: true },
        { name: 'KwikShip', included: false },
        { name: 'Dedicated Account Manager', included: false },
        { name: 'White-label Reports', included: false },
      ]
    },
    {
      name: 'Pro',
      description: 'For established businesses',
      monthlyPrice: 199,
      annualPrice: 159, // 20% discount applied
      features: [
        { name: 'KwikStore Buddy (Full)', included: true },
        { name: 'AI Store Assistant', included: true, limit: 'Unlimited' },
        { name: 'Advanced SEO Tools', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Unlimited Store Connections', included: true },
        { name: 'KwikGrowth (Premium)', included: true },
        { name: 'KwikAds++ (Advanced)', included: true },
        { name: 'KwikShip', included: true },
        { name: 'Dedicated Account Manager', included: true },
        { name: 'White-label Reports', included: true },
      ]
    }
  ];

  // Feature tooltips
  const featureInfo = {
    'KwikStore Buddy (Basic)': 'Essential store setup and optimization tools',
    'KwikStore Buddy (Full)': 'Complete store setup with advanced customization options',
    'AI Store Assistant': 'AI-powered assistant for store management and customer support',
    'Basic SEO Tools': 'Essential SEO tools for improving search visibility',
    'Advanced SEO Tools': 'Comprehensive SEO optimization with Gushwork integration',
    'KwikGrowth': 'Sales and growth tools for optimizing performance',
    'KwikGrowth (Premium)': 'Advanced growth tools with AI-powered recommendations',
    'KwikAds++ (Basic)': 'Essential ad campaign management tools',
    'KwikAds++ (Advanced)': 'Advanced ad campaign optimization with A/B testing',
    'KwikShip': 'Complete logistics and shipping management platform',
    'White-label Reports': 'Custom branded reports for sharing with clients or stakeholders'
  };

  return (
    <MainLayout>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-oxford-blue mb-4">Transparent Pricing for Every Business</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your business needs and scale as you grow. All plans include core features to get you started.
            </p>
            
            <div className="mt-8 inline-flex items-center p-1 bg-white rounded-full shadow-sm border border-gray-200">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'monthly' 
                    ? 'bg-yale-blue text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'annual' 
                    ? 'bg-yale-blue text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Annual <span className="text-gamboge font-semibold">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.name}
                className={`bg-white rounded-xl overflow-hidden shadow-lg border transition-all ${
                  plan.popular ? 'border-yale-blue md:-translate-y-4 relative z-10' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="bg-yale-blue text-white py-2 px-4 text-center text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                    </span>
                    <span className="text-gray-500 ml-1">/month</span>
                    {billingCycle === 'annual' && (
                      <div className="mt-2 text-sm text-gamboge font-medium">
                        Billed annually (${plan.annualPrice * 12}/year)
                      </div>
                    )}
                  </div>
                  <Link to="/onboarding" className="block mb-6">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-yale-blue hover:bg-yale-blue/90' 
                          : 'bg-oxford-blue hover:bg-oxford-blue/90'
                      } text-white`}
                    >
                      Choose {plan.name}
                    </Button>
                  </Link>
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-medium mb-4">Plan includes:</h4>
                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature.name} className="flex items-start">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 mt-0.5 mr-3 flex-shrink-0" />
                          )}
                          <span className={feature.included ? '' : 'text-gray-400'}>
                            {feature.name}
                            {feature.limit && <span className="text-sm text-gray-500 ml-1">({feature.limit})</span>}
                          </span>
                          
                          {featureInfo[feature.name as keyof typeof featureInfo] && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="ml-1.5 text-gray-400 hover:text-gray-500">
                                    <HelpCircle className="h-4 w-4" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs p-2 text-sm">
                                    {featureInfo[feature.name as keyof typeof featureInfo]}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-oxford-blue mb-6">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I upgrade my plan later?</h3>
                <p className="text-gray-600">Yes, you can upgrade your plan at any time. The price difference will be prorated for the remainder of your billing period.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-gray-600">Yes, we offer a 14-day free trial on all plans with no credit card required.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-gray-600">Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your billing period.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Do you offer custom enterprise plans?</h3>
                <p className="text-gray-600">Yes, for larger businesses with specific needs, we offer custom enterprise plans. Contact our sales team for more information.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;
