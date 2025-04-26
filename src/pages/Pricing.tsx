import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react'; // Removed unused X, HelpCircle
// import { X, HelpCircle } from 'lucide-react'; // These icons were imported but not used
// Tooltip components were imported but not used in the rendered JSX
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

const Pricing = () => {
  const navigate = useNavigate(); // Hook for navigation

  // NOTE: This function is defined but never called.
  // The buttons directly use setBillingCycle.
  // const toggleBillingCycle = () => {
  //   setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly');
  // };

  // Pricing data
  // NOTE: Prices currently don't change based on the billingCycle state.
  // You might want to add annualPrice or calculate it based on monthlyPrice.
  const pricingPlans = [
    {
      name: 'KwikGrowth Tools',
      description: 'Monthly subscription', // Consider updating description based on billing cycle
      monthlyPrice: 349,
      // annualPrice: 349 * 12 * 0.8, // Example: Calculate annual price (20% discount)
      features: [
        { name: 'Full Growth Suite', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Dedicated Support', included: true }
      ],
      popular: true, // Added a flag to control the "Most Popular" banner
    },
    {
      name: 'KwikStore Buddy',
      description: 'Annual subscription', // Consider updating description based on billing cycle
      monthlyPrice: 299,
      // annualPrice: 299 * 12 * 0.8, // Example
      features: [
        { name: 'Essential store setup and optimization tools', included: true },
        { name: 'AI-powered assistant for store management', included: true },
        { name: 'Custom branded reports', included: true }
      ],
      popular: false, // Example: This one isn't marked as popular
    }
  ];

  // Feature tooltips
  // NOTE: This 'featureInfo' object is defined but not used anywhere
  // in the component's rendering logic. Consider removing if not needed
  // or implement Tooltips using this data.
  // const featureInfo = {
  //   'KwikStore Buddy (Basic)': 'Essential store setup and optimization tools',
  //   'KwikStore Buddy (Full)': 'Complete store setup with advanced customization options',
  //   'AI Store Assistant': 'AI-powered assistant for store management and customer support',
  //   'Basic SEO Tools': 'Essential SEO tools for improving search visibility',
  //   'Advanced SEO Tools': 'Comprehensive SEO optimization with Gushwork integration',
  //   'KwikGrowth': 'Sales and growth tools for optimizing performance',
  //   'KwikGrowth (Premium)': 'Advanced growth tools with AI-powered recommendations',
  //   'KwikAds++ (Basic)': 'Essential ad campaign management tools',
  //   'KwikAds++ (Advanced)': 'Advanced ad campaign optimization with A/B testing',
  //   'KwikShip': 'Complete logistics and shipping management platform',
  //   'White-label Reports': 'Custom branded reports for sharing with clients or stakeholders'
  // };

  const handleSkip = () => {
    navigate('/dashboard'); // Use navigate for SPA navigation
  };

  return (
    <MainLayout>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-oxford-blue mb-4">
              Transparent Pricing for Every Business
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your business needs and scale as you grow. All plans include core features to get you started.
            </p>

            {/* Billing Cycle Toggle */}
          </div>

          {/* Pricing Plans Grid */}
          {/* // NOTE: Consider placing the "Skip for Now" button outside/after this grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12"> {/* Added mb-12 */}
            {pricingPlans.map((plan) => {

              // Determine price and period based on billing cycle state
              const price = plan.monthlyPrice;
              const period = '/month';

              return (
                <div
                  key={plan.name}
                  className={`bg-white rounded-xl overflow-hidden shadow-lg border transition-all ${
                    plan.popular ? 'border-yale-blue' : 'border-gray-200' // Conditional border
                  }`}
                >
                  {/* Popular Banner (Conditional) */}
                  {plan.popular && (
                    <div className="bg-yale-blue text-white py-2 px-4 text-center text-sm font-medium">
                      Most Popular
                    </div>
                  )}

                  {/* Plan Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">
                      {plan.description}
                    </p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">
                        ${price}
                      </span>
                      <span className="text-gray-500 ml-1">/month</span>
                    </div>
                    <Link to="/onboarding" className="block mb-6">
                      <Button className="w-full bg-yale-blue hover:bg-yale-blue/90 text-white">
                        Choose {plan.name}
                      </Button>
                    </Link>

                    {/* Features List */}
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-medium mb-4">Plan includes:</h4>
                      <ul className="space-y-4">
                        {plan.features.map((feature) => (
                          <li key={feature.name} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                            <span>{feature.name}</span>
                            {/* // TODO: Implement Tooltips here if needed using featureInfo */}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* // NOTE: This "Skip for Now" button is inside each plan card.
                       // It might be better placed outside the map, perhaps below the grid. */}
                  {/* <div className="p-8 pt-0 text-center">
                    <Button
                      variant="ghost" // Use a less prominent variant
                      className="w-full hover:bg-gray-100 text-gray-600"
                      onClick={handleSkip}
                    >
                      Skip for Now
                    </Button>
                  </div> */}
                </div>
              );
            })}
          </div>

          {/* Skip Button (Alternative Placement) */}
           <div className="text-center mt-8">
              <Button
                variant="outline" // Or another appropriate variant
                className="hover:bg-gray-100 text-gray-700"
                onClick={handleSkip}
              >
                Skip Plan Selection for Now
              </Button>
            </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-oxford-blue mb-6">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6"> {/* Adjusted gap */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I upgrade my plan later?</h3>
                <p className="text-gray-600">
                  Yes, you can upgrade your plan at any time. The price difference will be prorated for the remainder of your billing period.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-gray-600">
                  Yes, we offer a 14-day free trial on all plans with no credit card required. You can start your trial during the onboarding process.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-gray-600">
                  Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your current billing period (monthly or annual).
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Do you offer custom enterprise plans?</h3>
                <p className="text-gray-600">
                  Yes, for larger businesses with specific needs, we offer custom enterprise plans. Please contact our sales team for more information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;