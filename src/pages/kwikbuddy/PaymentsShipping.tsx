
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';
import { 
  CreditCard, 
  Truck, 
  ArrowRight, 
  ExternalLink,
  Check,
  AlertCircle
} from 'lucide-react';

const PaymentsShipping = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { kwikBuddyProgress, updateKwikBuddyProgress } = useApp();
  
  const [currentProgress, setCurrentProgress] = useState(kwikBuddyProgress.payments);
  const [isPaymentConnected, setIsPaymentConnected] = useState(false);
  const [shippingApiKey, setShippingApiKey] = useState('');
  const [isShippingConnected, setIsShippingConnected] = useState(false);
  
  // Update progress state and context
  const updateProgress = (newProgress: number) => {
    setCurrentProgress(newProgress);
    updateKwikBuddyProgress({
      payments: newProgress,
      currentStep: 3,
    });
  };
  
  // Handle payment integration
  const connectPayment = () => {
    window.open('https://apps.shopify.com/kwikcheckout', '_blank');
    toast({
      title: "Opening KwikCheckout app installation",
      description: "Please complete the installation process in the new tab",
    });
    
    // Simulating successful installation after a delay
    setTimeout(() => {
      setIsPaymentConnected(true);
      updateProgress(isShippingConnected ? 100 : 50);
      toast({
        title: "Payment integration complete",
        description: "KwikCheckout has been successfully installed",
      });
    }, 3000);
  };
  
  // Handle shipping integration
  const connectShipping = () => {
    if (!shippingApiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your shipping provider API key",
        variant: "destructive",
      });
      return;
    }
    
    // Simulating shipping connection
    setTimeout(() => {
      setIsShippingConnected(true);
      updateProgress(isPaymentConnected ? 100 : 50);
      toast({
        title: "Shipping integration complete",
        description: "Shipping provider has been successfully connected",
      });
    }, 1500);
  };
  
  // Handle completing the step
  const completeStep = () => {
    if (!isPaymentConnected && !isShippingConnected) {
      toast({
        title: "Please connect at least one integration",
        description: "Connect either payment or shipping before proceeding",
        variant: "destructive",
      });
      return;
    }
    
    updateProgress(100);
    navigate('/kwikbuddy/apps-setup');
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Payments & Shipping Integration</h1>
            <p className="text-gray-500">
              Set up payment methods and shipping options for your store
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

        {/* Payment Integration Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-yale-blue" />
              Payment Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Set up your payment gateway to start accepting payments from customers.
              </p>
              
              {!isPaymentConnected ? (
                <div className="rounded-md bg-yale-blue/10 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-yale-blue" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yale-blue">Recommended Integration</h3>
                      <div className="mt-2 text-sm text-yale-blue/70">
                        <p>We recommend using KwikCheckout for a seamless payment experience with built-in optimization for higher conversion rates.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-md bg-green-50 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Payment Integration Complete</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>KwikCheckout has been successfully integrated with your store. You can now accept payments from customers.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center border rounded-md p-4">
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGF5bWVudHxlbnwwfHwwfHx8MA%3D%3D" 
                    alt="KwikCheckout" 
                    className="h-12 w-12 rounded mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-medium">KwikCheckout</h3>
                    <p className="text-sm text-gray-500">All-in-one payment solution with 20+ payment methods</p>
                  </div>
                </div>
                <Button 
                  onClick={connectPayment}
                  disabled={isPaymentConnected}
                  className={isPaymentConnected ? "bg-green-500 hover:bg-green-600" : "btn-primary"}
                >
                  {isPaymentConnected ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Installed
                    </>
                  ) : (
                    <>
                      Install GoKwik App
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Shipping Integration Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="h-5 w-5 mr-2 text-yale-blue" />
              Shipping Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Connect your shipping provider to offer shipping options to your customers.
              </p>
              
              {isShippingConnected && (
                <div className="rounded-md bg-green-50 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Shipping Integration Complete</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>Your shipping provider has been successfully connected to your store.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center mr-3">
                        <Truck className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">ShipStation</h3>
                        <p className="text-xs text-gray-500">Multi-carrier shipping solution</p>
                      </div>
                    </div>
                    <Input 
                      placeholder="Enter API Key" 
                      value={shippingApiKey}
                      onChange={(e) => setShippingApiKey(e.target.value)}
                      disabled={isShippingConnected}
                    />
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center mr-3">
                        <Truck className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">ShipRocket</h3>
                        <p className="text-xs text-gray-500">India-focused shipping solution</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      variant="outline"
                      onClick={() => window.open('https://shiprocket.in/', '_blank')}
                    >
                      View Integration Guide
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Button 
                  onClick={connectShipping}
                  disabled={isShippingConnected || !shippingApiKey.trim()}
                  className={isShippingConnected ? "bg-green-500 hover:bg-green-600" : "btn-primary"}
                >
                  {isShippingConnected ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Connected
                    </>
                  ) : (
                    <>
                      Connect Shipping
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate('/kwikbuddy/seo-setup')}
              >
                Back
              </Button>
              <Button 
                onClick={completeStep}
                className="btn-primary"
              >
                Proceed to Required Apps
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PaymentsShipping;
