import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const OnboardingFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    storeName: '',
    businessCategory: '',
    arr: '',
    aov: '',
    storeType: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    } else if (step === 2) {
      if (!formData.storeName) newErrors.storeName = 'Store name is required';
      if (!formData.businessCategory) newErrors.businessCategory = 'Business category is required';
      if (!formData.arr) newErrors.arr = 'ARR is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step === 1) {
        // Register user on the first step
        fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }).then(response => {
          if (response.ok) {
            setStep(step + 1);
          } else {
            response.text().then(text => alert(text));
          }
        });
      } else if (step === 3) {
        // Redirect to dashboard
        window.location.href = '/pricing';
      } else {
        // Save user details on the second step
        fetch('http://localhost:3000/user-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            storeName: formData.storeName,
            category: formData.businessCategory,
            ARR: formData.arr,
            averageOrderValue: formData.aov,
            storeType: formData.storeType,
          }),
        }).then(response => {
          if (response.ok) {
            setStep(step + 1);
          } else {
            response.text().then(text => alert(text));
          }
        });
      }
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold mb-6">Create Your Account</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-bold mb-6">Store Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  type="text"
                  value={formData.storeName}
                  onChange={(e) => handleChange('storeName', e.target.value)}
                  placeholder="My Awesome Store"
                />
                {errors.storeName && <p className="text-red-500 text-sm mt-1">{errors.storeName}</p>}
              </div>
              <div className="space-y-4">
                <Label htmlFor="businessCategory">Select Category</Label>
                <Select
                  value={formData.businessCategory}
                  onValueChange={(value) => handleChange('businessCategory', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                    <SelectItem value="electronics">Electronics & Gadgets</SelectItem>
                    <SelectItem value="home">Home & Furniture</SelectItem>
                    <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                    <SelectItem value="food">Food & Beverages</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.businessCategory && <p className="text-red-500 text-sm mt-1">{errors.businessCategory}</p>}
              </div>
              <div>
                <Label htmlFor="arr">Annual Recurring Revenue (ARR)</Label>
                <Select
                  value={formData.arr}
                  onValueChange={(value) => handleChange('arr', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ARR" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-$1M">0 - 1M</SelectItem>
                    <SelectItem value="$1M-$5M">1M - 5M</SelectItem>
                    <SelectItem value="$5M-$10M">5M - 10M</SelectItem>
                    <SelectItem value="$10M+">10M+</SelectItem>
                  </SelectContent>
                </Select>
                {errors.arr && <p className="text-red-500 text-sm mt-1">{errors.arr}</p>}
              </div>
              <div>
                <Label htmlFor="aov">Average Order Value (AOV)</Label>
                <Input
                  id="aov"
                  type="number"
                  value={formData.aov}
                  onChange={(e) => handleChange('aov', e.target.value)}
                  placeholder="Enter AOV in dollars"
                />
                {errors.aov && <p className="text-red-500 text-sm mt-1">{errors.aov}</p>}
              </div>
              <div>
                <Label htmlFor="storeType">Store Type</Label>
                <Select
                  value={formData.storeType}
                  onValueChange={(value) => handleChange('storeType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select store type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shopify">Shopify</SelectItem>
                    <SelectItem value="woocommerce">WooCommerce</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
                {errors.storeType && <p className="text-red-500 text-sm mt-1">{errors.storeType}</p>}
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-bold mb-6">Choose a Plan</h2>
            <p className="text-gray-600 mb-4">
              Select a plan that best fits your business needs. You’re just one step away from transforming your store!
            </p>
            <div className="space-y-4">
              <Button variant="outline" onClick={() => window.location.href = '/dashboard'} className="w-full">
                Skip for now
              </Button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section id="onboarding" className="section">
      <div className="container-custom">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Get Started with kwikcommerce.ai</h3>
                <div className="text-sm text-gray-500">Step {step} of 3</div>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-kwik-blue h-full transition-all duration-300 ease-out"
                  style={{ width: `${step * 33}%` }}
                ></div>
              </div>
            </div>
            {renderStepContent()}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <div className="flex-1"></div>
              <Button onClick={handleNext}>
                {step < 3 ? 'Next' : 'View Plans'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnboardingFlow;