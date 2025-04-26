import React, { useRef, useEffect, useState } from 'react';
import OnboardingFlow from '../components/OnboardingFlow';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import {
  Check,
  ArrowRight,
  Package,
  Search,
  Globe,
  ShoppingCart,
  Zap,
  Settings,
  // MessageSquare, // MessageSquare is not used
  PlayCircle,
  ChevronRight,
  TrendingUp,
  User,
  BarChart2
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
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TestimonialCard = ({ quote, author, role }: { quote: string; author: string; role: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
    <p className="text-gray-600 italic mb-4">&ldquo;{quote}&rdquo;</p>
    <div className="flex items-center">
      <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-500">
        <User size={18} />
      </div>
      <div className="ml-3">
        <p className="font-medium">{author}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  </div>
);

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  // Ref for the demo video element
  const videoRef = useRef < HTMLVideoElement > (null);

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

    // Ensure elements exist before observing
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => {
      observer.observe(el);
    });

    // Cleanup function to disconnect the observer
    return () => {
      elementsToAnimate.forEach(el => {
        observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const testimonials = [
    {
      quote: "kwikcommerce.ai helped us increase our conversion rate by 35% in just two months through AI-powered optimizations.",
      author: "Sarah Johnson",
      role: "Marketing Director, BeautyBrand"
    },
    {
      quote: "The AI-driven insights uncovered customer behaviors we never would have spotted, leading to a 28% revenue boost.",
      author: "Michael Chen",
      role: "E-commerce Manager, TechGadgets"
    },
    {
      quote: "We’ve simplified our operations while boosting sales - the AI recommendations have been game-changing for our store.",
      author: "Layla Rodriguez",
      role: "Owner, HomeCrafted Shop"
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-oxford-blue to-yale-blue text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10"> {/* Added relative z-10 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left"> {/* Centered text on mobile */}
              <div className="mb-2 inline-block"> {/* Allow span to size correctly */}
                <span className="px-3 py-1 bg-gamboge/20 text-gamboge rounded-full text-sm font-medium">
                  New Platform Release
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Supercharge Your <br />
                <span className="text-gamboge">Ecommerce</span> with AI
              </h1>
              <p className="text-xl mb-8 text-gray-200 max-w-lg mx-auto md:mx-0"> {/* Centered paragraph on mobile */}
                All-in-one AI platform for D2C brands to set up, optimize, and grow your online store with intelligent automation.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-gamboge hover:bg-gamboge/90 text-white px-8 hover:scale-105 transition-transform">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="mt-6 flex items-center justify-center md:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/40?img=${i}`}
                      alt={`Customer ${i}`} // More descriptive alt text
                      className="w-8 h-8 rounded-full border-2 border-oxford-blue"
                    />
                  ))}
                </div>
                <span className="ml-4 text-sm text-gray-200">
                  <span className="font-bold">500+</span> brands trust kwikcommerce.ai
                </span>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center relative z-10 mt-10 md:mt-0">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md relative">
                <div className="bg-gray-200 p-3"> {/* Lighter top bar */}
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="relative cursor-pointer group" onClick={() => videoRef.current?.play()}>
                  <video
                    ref={videoRef}
                    className="w-full object-cover aspect-video"
                    poster="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                    controls
                    playsInline
                    preload="metadata"
                  >
                    <source src="https://videos.pexels.com/video-files/857174/857174-sd_640_360_25fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Optional Play button overlay (can be removed if `controls` is sufficient) */}
                  {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 focus-within:opacity-0">
                   <PlayCircle className="w-16 h-16 text-white transition-transform group-hover:scale-110" />
                   </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full leading-[0px]"> {/* Adjusted wrapper for SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block"> {/* Ensure SVG scales */}
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Product Modules Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
              Powerful Modules for Every Need
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              kwikcommerce.ai combines intelligent tools in one platform, giving you everything you need to succeed in ecommerce.
            </p>
          </div>

          {/* Module Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* KwikStore Buddy */}
            <Card className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl animate-on-scroll opacity-0 flex flex-col">
              <CardHeader className="bg-yale-blue p-6 text-white">
                <div className="flex items-center">
                  <Package className="h-8 w-8 mr-3" />
                  <CardTitle className="text-2xl font-bold">KwikStore Buddy</CardTitle>
                </div>
                <CardDescription className="text-white/80 mt-2">Store Setup & Optimization</CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-grow"> {/* flex-grow to push footer down */}
                <ul className="space-y-4 text-gray-700">
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
              <CardFooter className="bg-gray-50 p-6 mt-auto"> {/* mt-auto aligns footer */}
                <Link to="/kwikstore" className="w-full">
                  <Button className="w-full bg-gamboge hover:bg-gamboge/90 text-white">
                    Explore KwikStore Buddy
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* KwikGrowth */}
            <Card className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl animate-on-scroll opacity-0 flex flex-col" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="bg-oxford-blue p-6 text-white">
                <div className="flex items-center">
                  <BarChart className="h-8 w-8 mr-3" />
                  <CardTitle className="text-2xl font-bold">KwikGrowth</CardTitle>
                </div>
                <CardDescription className="text-white/80 mt-2">Sales & Growth Tools</CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <ul className="space-y-4 text-gray-700">
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
              <CardFooter className="bg-gray-50 p-6 mt-auto">
                <Link to="/kwikgrowth" className="w-full">
                  <Button className="w-full bg-oxford-blue hover:bg-oxford-blue/90 text-white">
                    Explore KwikGrowth
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Updated Data-Driven Growth Section */}
      <section className="section bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Data-Driven Growth with AI</h2>
            <p className="text-xl text-gray-600">
              Track performance and get AI-powered insights to optimize your store’s growth trajectory.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-xl bg-white shadow-lg border border-gray-100 p-6">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Growth Trajectory</h3>
                  <TrendingUp className="text-green-500" />
                </div>
                <BarChart width={600} height={300} data={[
  { name: 'Jan', uv: 2000, pv: 1500, amt: 1500 },
  { name: 'Feb', uv: 2500, pv: 2000, amt: 2000 },
  { name: 'Mar', uv: 3000, pv: 2500, amt: 2500 },
  { name: 'Apr', uv: 3500, pv: 3000, amt: 3000 },
  { name: 'May', uv: 4000, pv: 3500, amt: 3500 },
  { name: 'Jun', uv: 4500, pv: 4000, amt: 4000 },
  { name: 'Jul', uv: 5000, pv: 4500, amt: 4500 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">AI Insights Distribution</h3>
                  <BarChart2 className="text-brand-500" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-brand-50 rounded-lg p-4 text-center">
                    <div className="mb-2">
                      <div className="inline-block w-8 h-8 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                      </div>
                    </div>
                    <p className="font-medium">SEO</p>
                    <p className="text-xl font-bold text-purple-500">42%</p>
                  </div>
                  <div className="bg-brand-50 rounded-lg p-4 text-center">
                    <div className="mb-2">
                      <div className="inline-block w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                      </div>
                    </div>
                    <p className="font-medium">Ads</p>
                    <p className="text-xl font-bold text-blue-500">35%</p>
                  </div>
                  <div className="bg-brand-50 rounded-lg p-4 text-center">
                    <div className="mb-2">
                      <div className="inline-block w-8 h-8 rounded-full bg-green-100 text-green-500 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <p className="font-medium">Products</p>
                    <p className="text-xl font-bold text-green-500">23%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
              Plans for Businesses of All Sizes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your business needs and scale as you grow.
            </p>
            {/* Toggle Placeholder - Add state and onClick handlers for functionality */}
            <div className="flex justify-center mt-6">
              <div className="bg-white rounded-full p-1 flex shadow-sm border border-gray-200">
                <button className="px-4 py-2 rounded-full bg-yale-blue text-white text-sm font-medium">Monthly</button>
                <button className="px-4 py-2 rounded-full text-gray-700 text-sm font-medium hover:bg-gray-100">Annual (Save 20%)</button>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          {/* Added items-stretch to make cards equal height if content varies */}
          <div className="grid md:grid-cols-2 gap-8 items-stretch">

            {/* Starter Plan Card (Example - Add real plans here) */}
            <Card className="animate-on-scroll opacity-0 flex flex-col h-full border border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle>KwikStore Buddy</CardTitle>
                <CardDescription>One-time setup cost</CardDescription>
                 <div className="mt-4">
                  <span className="text-4xl font-bold text-oxford-blue">$599</span>
                  <span className="text-gray-500">(one-time)</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Complete setup
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>AI Tools Integration</span>
                  </li>
                   <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>SEO Optimization</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full bg-gamboge hover:bg-gamboge/90 text-white">Choose KwikStore Buddy</Button>
              </CardFooter>
            </Card>

            {/* Growth Plan Card (Example) */}
            <Card className="animate-on-scroll opacity-0 border-yale-blue border-2 relative shadow-xl flex flex-col h-full" style={{ animationDelay: "0.2s", transform: 'scale(1.03)' }}>
               <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yale-blue text-white px-4 py-1 text-sm font-medium rounded-full shadow-md">
                Most Popular
              </div>
              <CardHeader className="pt-10">
                <CardTitle>KwikGrowth Tools</CardTitle>
                <CardDescription>Monthly subscription</CardDescription>
                 <div className="mt-4">
                  <span className="text-4xl font-bold text-oxford-blue">$349</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                 <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Full Growth Suite</span>
                  </li>
                   <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Advanced Analytics</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Dedicated Support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full bg-yale-blue hover:bg-yale-blue/90 text-white">Choose KwikGrowth Tools</Button>
              </CardFooter>
            </Card>
            <Button className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700" onClick={() => window.location.href = '/dashboard'}>Skip for Now</Button>



          </div> {/* End Pricing Grid */}

          {/* Compare Plans Link */}
          <div className="text-center mt-16 animate-on-scroll opacity-0" style={{ animationDelay: "0.6s" }}>
            <Link to="/pricing">
              <Button variant="link" className="text-yale-blue font-medium hover:text-oxford-blue">
                Compare all plan features
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div> {/* End Container */}
      </section> {/* End Pricing Section */}


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-oxford-blue to-yale-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll opacity-0">
            Ready to Grow Your Ecommerce Business?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-200 animate-on-scroll opacity-0" style={{ animationDelay: "0.2s" }}>
            Join thousands of merchants who are using kwikcommerce.ai to build, optimize, and grow their online stores.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-on-scroll opacity-0" style={{ animationDelay: "0.4s" }}>
            <Link to="/signup">
              <Button size="lg" className="bg-gamboge hover:bg-gamboge/90 text-white px-8 w-full sm:w-auto"> {/* Full width on mobile */}
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
             
          </div>
        </div>
      </section>

      {showOnboarding && <OnboardingFlow />}
    </MainLayout> /* End MainLayout */
  );
};

export default Index;