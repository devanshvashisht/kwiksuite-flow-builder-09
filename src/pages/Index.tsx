import React, { useRef, useEffect } from 'react';
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
  MessageSquare,
  PlayCircle,
  ChevronRight
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Index = () => {
  // Ref for the demo video element
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Animation on scroll effect - Simple implementation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-oxford-blue to-yale-blue text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 z-10">
              <div className="mb-2">
                <span className="px-3 py-1 bg-gamboge/20 text-gamboge rounded-full text-sm font-medium">
                  New Platform Release
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Supercharge Your <br/>
                <span className="text-gamboge">Ecommerce</span> with AI
              </h1>
              <p className="text-xl mb-8 text-gray-200 max-w-lg">
                All-in-one AI platform for D2C brands to set up, optimize, and grow your online store with intelligent automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/onboarding">
                  <Button size="lg" className="bg-gamboge hover:bg-gamboge/90 text-white px-8 hover:scale-105 transition-transform">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Explore Plans
                  </Button>
                </Link>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/40?img=${i}`}
                      alt="Customer" 
                      className="w-8 h-8 rounded-full border-2 border-oxford-blue"
                    />
                  ))}
                </div>
                <span className="ml-4 text-sm text-gray-200">
                  <span className="font-bold">500+</span> brands trust kwikcommerce.ai
                </span>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center relative z-10">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md relative">
                <div className="bg-oxford-blue p-4">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                
                <div className="relative cursor-pointer group" onClick={() => videoRef.current?.play()}>
                  <video 
                    ref={videoRef}
                    className="w-full object-cover"
                    poster="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
                    controls
                  >
                    <source src="https://pixabay.com/videos/download/video-146118_tiny.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <PlayCircle className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Product Modules Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
              Powerful Modules for Every Need
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              kwikcommerce.ai combines intelligent tools in one platform, giving you everything you need to succeed in ecommerce.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* KwikStore Buddy */}
            <Card className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl animate-on-scroll opacity-0">
              <CardHeader className="bg-yale-blue p-6 text-white">
                <div className="flex items-center">
                  <Package className="h-8 w-8 mr-3" />
                  <CardTitle className="text-2xl font-bold">KwikStore Buddy</CardTitle>
                </div>
                <CardDescription className="text-white/80 mt-2">Store Setup & Optimization</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>AI-powered product cataloging system</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Smart store assistant chatbot</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Advanced SEO optimization</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Contextual popups with AI images</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="bg-gray-50 p-6">
                <Link to="/kwikstore" className="w-full">
                  <Button className="w-full btn-primary">
                    Explore KwikStore Buddy
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            {/* KwikGrowth */}
            <Card className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl animate-on-scroll opacity-0" style={{animationDelay: "0.2s"}}>
              <CardHeader className="bg-oxford-blue p-6 text-white">
                <div className="flex items-center">
                  <BarChart className="h-8 w-8 mr-3" />
                  <CardTitle className="text-2xl font-bold">KwikGrowth</CardTitle>
                </div>
                <CardDescription className="text-white/80 mt-2">Sales & Growth Tools</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>SEO optimizer with Gushwork integration</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Lighthouse performance reports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>AI-powered growth suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Expert tips for each feature</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="bg-gray-50 p-6">
                <Link to="/kwikgrowth" className="w-full">
                  <Button className="w-full bg-oxford-blue hover:bg-oxford-blue/90 text-white">
                    Explore KwikGrowth
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            {/* KwikAds++ */}
            <Card className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl animate-on-scroll opacity-0" style={{animationDelay: "0.4s"}}>
              <CardHeader className="bg-gamboge p-6 text-white">
                <div className="flex items-center">
                  <Search className="h-8 w-8 mr-3" />
                  <CardTitle className="text-2xl font-bold">KwikAds++</CardTitle>
                </div>
                <CardDescription className="text-white/80 mt-2">Advanced Ad Management</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>A/B testing for text & creative variants</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Live campaign analytics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Multi-platform campaign previews</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>AI audience & budget suggestions</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="bg-gray-50 p-6">
                <Link to="/kwikads" className="w-full">
                  <Button className="w-full bg-gamboge hover:bg-gamboge/90 text-white">
                    Explore KwikAds++
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            {/* KwikShip */}
            <Card className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl animate-on-scroll opacity-0" style={{animationDelay: "0.6s"}}>
              <CardHeader className="bg-naples-yellow p-6 text-oxford-blue">
                <div className="flex items-center">
                  <Globe className="h-8 w-8 mr-3" />
                  <CardTitle className="text-2xl font-bold">KwikShip</CardTitle>
                </div>
                <CardDescription className="text-oxford-blue/80 mt-2">Logistics Management</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Logistics partner integrations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Shipping cost optimizations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Multi-carrier rate comparison</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Delivery tracking & notifications</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="bg-gray-50 p-6">
                <Link to="/kwikship" className="w-full">
                  <Button className="w-full bg-naples-yellow hover:bg-naples-yellow/90 text-oxford-blue">
                    Explore KwikShip
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Analytics Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
              Data-Driven Growth with AI
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Track performance and get AI-powered insights to optimize your store's growth trajectory.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-on-scroll opacity-0">
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-wrap justify-between items-center">
                <h3 className="text-xl font-bold text-oxford-blue">Store Growth Trajectory</h3>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button variant="outline" size="sm" className="text-sm">
                    Real Performance
                  </Button>
                  <Button variant="outline" size="sm" className="text-sm bg-yale-blue/10 border-yale-blue/30">
                    Predictive Insights
                  </Button>
                  <Button variant="outline" size="sm" className="text-sm">
                    Campaign Breakdown
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="h-80 w-full bg-gray-100 rounded-lg flex items-center justify-center">
                {/* Placeholder for actual analytics visualization */}
                <div className="text-center">
                  <BarChart className="h-16 w-16 mx-auto text-yale-blue opacity-50" />
                  <p className="mt-4 text-gray-500">Interactive analytics dashboard preview</p>
                  <Link to="/analytics">
                    <Button className="mt-4 btn-primary">
                      View Full Analytics
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
              Powerful Features for Every Store
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              kwikcommerce.ai provides end-to-end solutions for ecommerce businesses at every stage of growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-on-scroll opacity-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <div className="h-12 w-12 bg-yale-blue/10 rounded-lg flex items-center justify-center mb-4">
                        <Globe className="h-6 w-6 text-yale-blue" />
                      </div>
                      <span className="absolute top-0 right-0 h-5 w-5 bg-gamboge rounded-full flex items-center justify-center text-white text-xs">?</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs p-2">
                      <strong>Pro Tip:</strong> Use AI-generated templates to create a unique brand experience in minutes instead of hours.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <h3 className="text-xl font-bold mb-2">AI-Powered Website Setup</h3>
              <p className="text-gray-600">
                Get your store up and running in minutes with AI-assisted theme selection and content generation.
              </p>
            </div>
            
            {/* Additional features */}
            {/* ... keep existing code for other feature items ... */}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
              Plans for Businesses of All Sizes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your business needs and scale as you grow.
            </p>
            <div className="flex justify-center mt-6">
              <div className="bg-white rounded-full p-1 flex shadow-sm">
                <button className="px-4 py-2 rounded-full bg-yale-blue text-white">Monthly</button>
                <button className="px-4 py-2 rounded-full text-gray-700">Annual (Save 20%)</button>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="animate-on-scroll opacity-0">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>For new ecommerce stores</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>KwikStore Buddy (Basic)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>AI Store Assistant (5 queries/day)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Basic SEO Tools</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Email Support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full btn-primary">Choose Starter</Button>
              </CardFooter>
            </Card>
            
            {/* Growth Plan */}
            <Card className="animate-on-scroll opacity-0 border-yale-blue relative shadow-lg scale-105 z-10" style={{animationDelay: "0.2s"}}>
              <div className="absolute top-0 left-0 right-0 bg-yale-blue text-white text-center py-1 text-sm font-medium rounded-t-lg">
                Most Popular
              </div>
              <CardHeader className="pt-8">
                <CardTitle>Growth</CardTitle>
                <CardDescription>For growing businesses</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$79</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Everything in Starter, plus:</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Full KwikGrowth Access</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>KwikAds++ Basic</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Priority Support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Unlimited AI Queries</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-yale-blue hover:bg-yale-blue/90 text-white">Choose Growth</Button>
              </CardFooter>
            </Card>
            
            {/* Pro Plan */}
            <Card className="animate-on-scroll opacity-0" style={{animationDelay: "0.4s"}}>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For established businesses</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$199</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Everything in Growth, plus:</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Complete KwikSuite Access</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>KwikShip Integration</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Dedicated Account Manager</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>White-label Reports</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full btn-primary">Choose Pro</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="text-center mt-10 animate-on-scroll opacity-0" style={{animationDelay: "0.6s"}}>
            <Link to="/pricing">
              <Button variant="link" className="text-yale-blue font-medium">
                Compare all plan features
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-oxford-blue to-yale-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll opacity-0">
            Ready to Grow Your Ecommerce Business?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-200 animate-on-scroll opacity-0" style={{animationDelay: "0.2s"}}>
            Join thousands of merchants who are using kwikcommerce.ai to build, optimize, and grow their online stores.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-on-scroll opacity-0" style={{animationDelay: "0.4s"}}>
            <Link to="/onboarding">
              <Button size="lg" className="bg-gamboge hover:bg-gamboge/90 text-white px-8">
                Get Started Free
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
