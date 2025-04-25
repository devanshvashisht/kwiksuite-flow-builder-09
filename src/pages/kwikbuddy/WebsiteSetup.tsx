
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';
import { 
  Globe, 
  Link, 
  Upload, 
  Check, 
  ArrowRight, 
  ExternalLink,
  Brush,
  Download
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

// Form validation schemas
const storeConnectSchema = z.object({
  hasStore: z.enum(['yes', 'no']),
});

const logoUploadSchema = z.object({
  storeLogo: z.any(),
});

const WebsiteSetup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { kwikBuddyProgress, updateKwikBuddyProgress } = useApp();
  
  const [step, setStep] = useState(1);
  const [hasConnectedStore, setHasConnectedStore] = useState(false);
  const [hasUploadedLogo, setHasUploadedLogo] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(kwikBuddyProgress.website);
  const [selectedTheme, setSelectedTheme] = useState(0);
  
  // Store connect form
  const storeConnectForm = useForm<z.infer<typeof storeConnectSchema>>({
    resolver: zodResolver(storeConnectSchema),
    defaultValues: {
      hasStore: 'no',
    },
  });
  
  // Logo upload form
  const logoUploadForm = useForm<z.infer<typeof logoUploadSchema>>({
    resolver: zodResolver(logoUploadSchema),
    defaultValues: {
      storeLogo: null,
    },
  });
  
  // Handle store connect form submission
  const onStoreConnectSubmit = (data: z.infer<typeof storeConnectSchema>) => {
    if (data.hasStore === 'yes') {
      // Simulating store connection
      setTimeout(() => {
        setHasConnectedStore(true);
        updateProgress(30);
        toast({
          title: "Store connected successfully",
          description: "Your store has been connected to KwikBuddy",
        });
        setStep(2);
      }, 1500);
    } else {
      // Redirect to Shopify store creation
      window.open('https://www.shopify.com/signup', '_blank');
      toast({
        title: "Create your store first",
        description: "Please come back once your store is created",
      });
    }
  };
  
  // Handle logo upload form submission
  const onLogoUploadSubmit = (data: z.infer<typeof logoUploadSchema>) => {
    // Simulating logo upload
    setTimeout(() => {
      setHasUploadedLogo(true);
      updateProgress(60);
      toast({
        title: "Logo uploaded successfully",
        description: "Your logo has been uploaded and will be used in theme generation",
      });
      setStep(3);
    }, 1500);
  };
  
  // Update progress state and context
  const updateProgress = (newProgress: number) => {
    setCurrentProgress(newProgress);
    updateKwikBuddyProgress({
      website: newProgress,
      currentStep: 1,
    });
  };
  
  // Handle theme selection
  const selectTheme = (index: number) => {
    setSelectedTheme(index);
  };
  
  // Complete website setup
  const completeSetup = () => {
    updateProgress(100);
    toast({
      title: "Website setup completed",
      description: "Your website theme has been generated and is ready to use",
    });
    setTimeout(() => {
      navigate('/kwikbuddy/seo-setup');
    }, 1500);
  };

  // Theme templates
  const themeTemplates = [
    {
      name: "Modern Minimalist",
      image: "https://images.unsplash.com/photo-1541753866388-0b3c701627d3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1pbmltYWxpc3QlMjB3ZWJzaXRlfGVufDB8fDB8fHww",
      description: "Clean and modern design with focus on product imagery",
    },
    {
      name: "Bold & Vibrant",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvbG9yZnVsJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D",
      description: "Colorful and energetic design for standout brands",
    },
    {
      name: "Classic Elegance",
      image: "https://images.unsplash.com/photo-1579389083395-f9c9891f556a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGVsZWdhbnQlMjB3ZWJzaXRlfGVufDB8fDB8fHww",
      description: "Timeless and elegant design for luxury products",
    },
  ];
  
  // Render the appropriate step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-yale-blue" />
                Connect Your Store
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  To get started, we need to connect to your existing store or help you create a new one.
                </p>
              </div>
              
              <Form {...storeConnectForm}>
                <form onSubmit={storeConnectForm.handleSubmit(onStoreConnectSubmit)} className="space-y-6">
                  <FormField
                    control={storeConnectForm.control}
                    name="hasStore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you have a Shopify or WooCommerce store?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Yes, I have an existing store
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                No, I need to create a store
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex space-x-4">
                    <Button 
                      type="submit" 
                      className="btn-primary"
                      disabled={storeConnectForm.formState.isSubmitting}
                    >
                      {storeConnectForm.formState.isSubmitting ? 'Connecting...' : storeConnectForm.getValues().hasStore === 'yes' ? 'Connect My Store' : 'Create Shopify Store'}
                      {storeConnectForm.getValues().hasStore === 'yes' ? <Link className="ml-2 h-4 w-4" /> : <ExternalLink className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        );
      
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2 text-yale-blue" />
                Upload Your Brand Logo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Upload your brand logo to be used in your store theme and branding materials.
                </p>
              </div>
              
              <Form {...logoUploadForm}>
                <form onSubmit={logoUploadForm.handleSubmit(onLogoUploadSubmit)} className="space-y-6">
                  <FormField
                    control={logoUploadForm.control}
                    name="storeLogo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Logo</FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-yale-blue transition-colors">
                            <Input 
                              type="file" 
                              className="hidden" 
                              accept="image/*" 
                              id="logo-upload" 
                              onChange={(e) => {
                                field.onChange(e.target.files?.[0]);
                              }} 
                            />
                            <label htmlFor="logo-upload" className="cursor-pointer">
                              <div className="flex flex-col items-center">
                                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                                <p className="text-xs text-gray-500 mt-1">SVG, PNG, or JPG (max. 2MB)</p>
                              </div>
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="btn-primary"
                      disabled={logoUploadForm.formState.isSubmitting}
                    >
                      {logoUploadForm.formState.isSubmitting ? 'Uploading...' : 'Upload Logo'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        );
      
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brush className="h-5 w-5 mr-2 text-yale-blue" />
                AI-Assisted Theme Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Based on your store information, we've generated these theme options for your website.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                  <p className="text-sm text-green-800">
                    <span className="font-medium">AI Insight:</span> These themes include optimized homepage layouts, FAQ sections, and policy templates tailored to your industry.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {themeTemplates.map((theme, index) => (
                  <div 
                    key={index}
                    className={`border rounded-md overflow-hidden cursor-pointer transition-all ${selectedTheme === index ? 'ring-2 ring-yale-blue' : 'hover:border-yale-blue'}`}
                    onClick={() => selectTheme(index)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={theme.image} 
                        alt={theme.name} 
                        className="w-full h-full object-cover"
                      />
                      {selectedTheme === index && (
                        <div className="absolute top-2 right-2 h-6 w-6 bg-yale-blue rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium mb-1">{theme.name}</h4>
                      <p className="text-xs text-gray-500">{theme.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
                <div className="space-x-3">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Theme downloaded",
                        description: "Your theme has been downloaded successfully.",
                      });
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Theme ZIP
                  </Button>
                  <Button 
                    onClick={completeSetup}
                    className="btn-primary"
                  >
                    Apply to Store & Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Website Setup</h1>
            <p className="text-gray-500">
              Connect your store and set up your website theme
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

        {/* Steps Progress */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <div className={`w-full h-1 ${step > 1 ? 'bg-yale-blue' : 'bg-gray-200'}`}></div>
          </div>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-yale-blue text-white' : 'bg-gray-200 text-gray-600'}`}>
            {step > 1 ? <Check className="h-5 w-5" /> : 1}
          </div>
          <div className="flex-1">
            <div className={`w-full h-1 ${step > 2 ? 'bg-yale-blue' : 'bg-gray-200'}`}></div>
          </div>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-yale-blue text-white' : 'bg-gray-200 text-gray-600'}`}>
            {step > 2 ? <Check className="h-5 w-5" /> : 2}
          </div>
          <div className="flex-1">
            <div className={`w-full h-1 ${step > 3 ? 'bg-yale-blue' : 'bg-gray-200'}`}></div>
          </div>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 3 ? 'bg-yale-blue text-white' : 'bg-gray-200 text-gray-600'}`}>
            {step > 3 ? <Check className="h-5 w-5" /> : 3}
          </div>
        </div>

        {/* Step Content */}
        {renderStepContent()}
      </div>
    </DashboardLayout>
  );
};

export default WebsiteSetup;
