
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  CheckCircle2, 
  LockKeyhole, 
  Store, 
  CreditCard, 
  Check 
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

// Step 1: Password Setup Schema
const passwordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

// Step 2: Store Info Schema
const storeInfoSchema = z.object({
  storeName: z.string().min(3, { message: "Store name is required" }),
  category: z.string().min(1, { message: "Business category is required" }),
  revenue: z.string().min(1, { message: "Revenue range is required" }),
  aov: z.string().min(1, { message: "Average order value is required" }),
  salesChannels: z.string().array().min(1, { message: "Select at least one sales channel" }),
});

// Step 3: Plan Selection Schema
const planSchema = z.object({
  plan: z.enum(["basic", "pro", "enterprise"], {
    required_error: "You need to select a plan",
  }),
});

const Onboarding = () => {
  const { onboarding, updateOnboarding, setIsAuthenticated } = useApp();
  const navigate = useNavigate();
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  
  // Form for Step 1
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      email: onboarding.email || '',
      password: onboarding.password || '',
    },
  });

  // Form for Step 2
  const storeInfoForm = useForm<z.infer<typeof storeInfoSchema>>({
    resolver: zodResolver(storeInfoSchema),
    defaultValues: {
      storeName: onboarding.store?.name || '',
      category: onboarding.store?.category || '',
      revenue: onboarding.store?.revenue || '',
      aov: onboarding.store?.aov || '',
      salesChannels: onboarding.store?.salesChannels || [],
    },
  });

  // Form for Step 3
  const planForm = useForm<z.infer<typeof planSchema>>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      plan: onboarding.plan || 'basic',
    },
  });

  // Handle Step 1 submission
  const onPasswordSubmit = (data: z.infer<typeof passwordSchema>) => {
    updateOnboarding({
      email: data.email,
      password: data.password,
      step: 2,
    });
  };

  // Handle Step 2 submission
  const onStoreInfoSubmit = (data: z.infer<typeof storeInfoSchema>) => {
    updateOnboarding({
      store: {
        id: Math.random().toString(36).substr(2, 9),
        name: data.storeName,
        category: data.category,
        revenue: data.revenue,
        aov: data.aov,
        salesChannels: selectedChannels,
      },
      step: 3,
    });
  };

  // Handle Step 3 submission
  const onPlanSubmit = (data: z.infer<typeof planSchema>) => {
    updateOnboarding({
      plan: data.plan,
      step: 4,
    });
  };

  // Handle Step 4 completion
  const completeOnboarding = (product: 'kwikbuddy' | 'kwikgrowth') => {
    updateOnboarding({
      completed: true,
    });
    setIsAuthenticated(true);
    toast({
      title: "Welcome to KwikSuite!",
      description: "Your account has been created successfully.",
    });
    
    if (product === 'kwikbuddy') {
      navigate('/kwikbuddy');
    } else {
      navigate('/kwikgrowth');
    }
  };

  // Toggle selection of sales channels
  const toggleChannel = (channel: string) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter(c => c !== channel));
    } else {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  // Set the form values when onboarding state changes
  useEffect(() => {
    if (onboarding.store?.salesChannels) {
      setSelectedChannels(onboarding.store.salesChannels);
    }
  }, [onboarding]);

  // Render the appropriate step
  const renderStep = () => {
    switch (onboarding.step) {
      case 1:
        return (
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
              <FormField
                control={passwordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Create Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full btn-primary">
                Continue
              </Button>
            </form>
          </Form>
        );
      
      case 2:
        return (
          <Form {...storeInfoForm}>
            <form onSubmit={storeInfoForm.handleSubmit(onStoreInfoSubmit)} className="space-y-6">
              <FormField
                control={storeInfoForm.control}
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Store Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeInfoForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                        <SelectItem value="home">Home & Garden</SelectItem>
                        <SelectItem value="food">Food & Beverage</SelectItem>
                        <SelectItem value="health">Health & Wellness</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeInfoForm.control}
                name="revenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Revenue Range</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select revenue range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pre-launch">Pre-launch</SelectItem>
                        <SelectItem value="0-50k">$0 - $50K</SelectItem>
                        <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                        <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                        <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                        <SelectItem value="1m+">$1M+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeInfoForm.control}
                name="aov"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Order Value</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select average order value" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0-50">$0 - $50</SelectItem>
                        <SelectItem value="50-100">$50 - $100</SelectItem>
                        <SelectItem value="100-250">$100 - $250</SelectItem>
                        <SelectItem value="250-500">$250 - $500</SelectItem>
                        <SelectItem value="500+">$500+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>Sales Channels</FormLabel>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['shopify', 'woocommerce', 'magento', 'bigcommerce', 'amazon', 'instagram', 'facebook', 'tiktok'].map((channel) => (
                    <Button
                      key={channel}
                      type="button"
                      variant={selectedChannels.includes(channel) ? "default" : "outline"}
                      className={`justify-start ${selectedChannels.includes(channel) ? 'bg-yale-blue text-white' : ''}`}
                      onClick={() => toggleChannel(channel)}
                    >
                      {selectedChannels.includes(channel) && <Check className="mr-2 h-4 w-4" />}
                      {channel.charAt(0).toUpperCase() + channel.slice(1)}
                    </Button>
                  ))}
                </div>
                {storeInfoForm.formState.errors.salesChannels && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {storeInfoForm.formState.errors.salesChannels.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full btn-primary">
                Continue
              </Button>
            </form>
          </Form>
        );
      
      case 3:
        return (
          <Form {...planForm}>
            <form onSubmit={planForm.handleSubmit(onPlanSubmit)} className="space-y-6">
              <FormField
                control={planForm.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select a Plan</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <FormItem className="flex flex-col items-start space-y-0 rounded-md border border-gray-200 p-4 hover:border-yale-blue">
                          <FormControl>
                            <RadioGroupItem value="basic" className="sr-only" />
                          </FormControl>
                          <div className={`flex flex-col w-full h-full ${field.value === 'basic' ? 'text-yale-blue' : ''}`}>
                            <div className="font-semibold">Basic</div>
                            <div className="text-2xl font-bold mt-1">$49<span className="text-sm font-normal">/mo</span></div>
                            <div className="text-sm text-gray-500 mt-2">Perfect for new stores</div>
                            <ul className="mt-4 space-y-2 flex-grow">
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm">5 store setup modules</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm">Basic theme templates</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm">Standard support</span>
                              </li>
                            </ul>
                          </div>
                        </FormItem>
                        <FormItem className="flex flex-col items-start space-y-0 rounded-md border border-gray-200 p-4 hover:border-yale-blue">
                          <FormControl>
                            <RadioGroupItem value="pro" className="sr-only" />
                          </FormControl>
                          <div className={`flex flex-col w-full h-full ${field.value === 'pro' ? 'text-yale-blue' : ''}`}>
                            <div className="font-semibold">Pro</div>
                            <div className="text-2xl font-bold mt-1">$149<span className="text-sm font-normal">/mo</span></div>
                            <div className="text-sm text-gray-500 mt-2">For growing businesses</div>
                            <ul className="mt-4 space-y-2 flex-grow">
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm">All Basic features</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm">KwikGrowth access</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm">Priority support</span>
                              </li>
                            </ul>
                          </div>
                        </FormItem>
                        <FormItem className="flex flex-col items-start space-y-0 rounded-md border border-gray-200 p-4 hover:border-yale-blue">
                          <FormControl>
                            <RadioGroupItem value="enterprise" className="sr-only" />
                          </FormControl>
                          <div className={`flex flex-col w-full h-full ${field.value === 'enterprise' ? 'text-yale-blue' : ''}`}>
                            <div className="font-semibold">Enterprise</div>
                            <div className="text-2xl font-bold mt-1">$399<span className="text-sm font-normal">/mo</span></div>
                            <div className="text-sm text-gray-500 mt-2">For established brands</div>
                            <ul className="mt-4 space-y-2 flex-grow">
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm">All Pro features</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm">Dedicated account manager</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-sm">Custom development</span>
                              </li>
                            </ul>
                          </div>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full btn-primary">
                Proceed to Dashboard
              </Button>
            </form>
          </Form>
        );
      
      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold">Setup Complete!</h3>
            <p className="text-gray-600">
              Your KwikSuite account has been created successfully. You can now start using the platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <Button 
                onClick={() => completeOnboarding('kwikbuddy')}
                className="btn-primary"
              >
                Go to KwikBuddy
              </Button>
              <Button 
                onClick={() => completeOnboarding('kwikgrowth')}
                variant="outline"
                className="btn-secondary"
              >
                Explore KwikGrowth
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Welcome to <span className="text-yale-blue">KwikSuite</span>
          </h1>
          <p className="mt-2 text-gray-600">
            Set up your account in a few easy steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <div className={`w-full h-1 ${onboarding.step > 1 ? 'bg-yale-blue' : 'bg-gray-200'}`}></div>
          </div>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${onboarding.step >= 1 ? 'bg-yale-blue text-white' : 'bg-gray-200 text-gray-600'}`}>
            {onboarding.step > 1 ? <Check className="h-5 w-5" /> : 1}
          </div>
          <div className="flex-1">
            <div className={`w-full h-1 ${onboarding.step > 2 ? 'bg-yale-blue' : 'bg-gray-200'}`}></div>
          </div>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${onboarding.step >= 2 ? 'bg-yale-blue text-white' : 'bg-gray-200 text-gray-600'}`}>
            {onboarding.step > 2 ? <Check className="h-5 w-5" /> : 2}
          </div>
          <div className="flex-1">
            <div className={`w-full h-1 ${onboarding.step > 3 ? 'bg-yale-blue' : 'bg-gray-200'}`}></div>
          </div>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${onboarding.step >= 3 ? 'bg-yale-blue text-white' : 'bg-gray-200 text-gray-600'}`}>
            {onboarding.step > 3 ? <Check className="h-5 w-5" /> : 3}
          </div>
          <div className="flex-1">
            <div className={`w-full h-1 ${onboarding.step > 4 ? 'bg-yale-blue' : 'bg-gray-200'}`}></div>
          </div>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${onboarding.step >= 4 ? 'bg-yale-blue text-white' : 'bg-gray-200 text-gray-600'}`}>
            {onboarding.step > 4 ? <Check className="h-5 w-5" /> : 4}
          </div>
        </div>

        {/* Step Cards */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              {onboarding.step === 1 && (
                <>
                  <LockKeyhole className="h-5 w-5 mr-2 text-yale-blue" />
                  Account Setup
                </>
              )}
              {onboarding.step === 2 && (
                <>
                  <Store className="h-5 w-5 mr-2 text-yale-blue" />
                  Store Information
                </>
              )}
              {onboarding.step === 3 && (
                <>
                  <CreditCard className="h-5 w-5 mr-2 text-yale-blue" />
                  Plan Selection
                </>
              )}
              {onboarding.step === 4 && (
                <>
                  <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
                  Complete
                </>
              )}
            </CardTitle>
            <CardDescription>
              {onboarding.step === 1 && "Create your KwikSuite account"}
              {onboarding.step === 2 && "Tell us about your business"}
              {onboarding.step === 3 && "Choose the plan that's right for you"}
              {onboarding.step === 4 && "You're all set to start using KwikSuite"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
