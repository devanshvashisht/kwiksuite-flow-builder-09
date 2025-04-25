
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  ArrowRight, 
  BarChart, 
  Package, 
  Search, 
  Globe,
  ShoppingCart,
  Zap,
  Settings,
  MessageSquare
} from 'lucide-react';

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-oxford-blue to-yale-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                The Complete Ecommerce Success Suite
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Set up, optimize, and grow your online store with KwikSuite's powerful tools. Designed for D2C brands that want to scale quickly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/onboarding">
                  <Button size="lg" className="bg-gamboge hover:bg-gamboge/90 text-white px-8">
                    Start Your Store Setup Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
                <div className="bg-oxford-blue p-4">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80" 
                  alt="KwikSuite Dashboard" 
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
              Two Powerful Products. One Suite.
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              KwikSuite combines setup and growth tools in one platform, giving you everything you need to succeed in ecommerce.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* KwikBuddy Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
              <div className="bg-yale-blue p-6 text-white">
                <div className="flex items-center">
                  <Package className="h-8 w-8 mr-3" />
                  <h3 className="text-2xl font-bold">KwikBuddy</h3>
                </div>
                <p className="mt-2">Website Setup SaaS</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Setup your store in 5 guided steps</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>AI-assisted theme creation and SEO setup</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Seamless integration with payment providers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Essential apps installation and configuration</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Page optimization for better conversions</span>
                  </li>
                </ul>
                <Link to="/kwikbuddy" className="w-full">
                  <Button className="w-full btn-primary">
                    Explore KwikBuddy
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* KwikGrowth Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
              <div className="bg-oxford-blue p-6 text-white">
                <div className="flex items-center">
                  <BarChart className="h-8 w-8 mr-3" />
                  <h3 className="text-2xl font-bold">KwikGrowth</h3>
                </div>
                <p className="mt-2">Sales & Growth Tools</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Connect analytics and ad platforms in one place</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>SEO optimization with AI-powered suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Create, manage and optimize ad campaigns</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>AI landing page generator for promotions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>CRM co-pilot for customer engagement</span>
                  </li>
                </ul>
                <Link to="/kwikgrowth" className="w-full">
                  <Button className="w-full bg-oxford-blue hover:bg-oxford-blue/90 text-white">
                    Explore KwikGrowth
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              KwikSuite provides end-to-end solutions for ecommerce businesses at every stage of growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-yale-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-yale-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Website Setup</h3>
              <p className="text-gray-600">
                Get your store up and running in minutes with AI-assisted theme selection and content generation.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-yale-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-yale-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">SEO Optimization</h3>
              <p className="text-gray-600">
                Improve your search engine ranking with AI-powered SEO tools and actionable recommendations.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-yale-blue/10 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="h-6 w-6 text-yale-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Seamless Checkout</h3>
              <p className="text-gray-600">
                Reduce cart abandonment with our optimized checkout process and payment integrations.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-yale-blue/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-yale-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Campaign Management</h3>
              <p className="text-gray-600">
                Create, manage, and optimize your marketing campaigns across multiple channels.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-yale-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-yale-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Landing Page Generator</h3>
              <p className="text-gray-600">
                Create high-converting landing pages in minutes with our AI-powered generator.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-yale-blue/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-yale-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">CRM Co-Pilot</h3>
              <p className="text-gray-600">
                Engage with your customers effortlessly using our AI-powered messaging tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-oxford-blue to-yale-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Grow Your Ecommerce Business?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-200">
            Join thousands of merchants who are using KwikSuite to build, optimize, and grow their online stores.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/onboarding">
              <Button size="lg" className="bg-gamboge hover:bg-gamboge/90 text-white px-8">
                Start Your Store Setup Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
