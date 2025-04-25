
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';
import { 
  Zap, 
  ArrowRight, 
  Check,
  Download,
  AlertCircle,
  CheckCircle,
  FileText
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const PageOptimization = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { kwikBuddyProgress, updateKwikBuddyProgress } = useApp();
  
  const [currentProgress, setCurrentProgress] = useState(kwikBuddyProgress.optimization);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [appliedSuggestions, setAppliedSuggestions] = useState<string[]>([]);
  
  // Sample product pages data
  const productPages = [
    {
      id: 'product1',
      name: 'Premium T-Shirt',
      url: '/products/premium-t-shirt',
      score: 65,
      issues: ['Missing alt text', 'Short product description', 'No schema markup'],
    },
    {
      id: 'product2',
      name: 'Designer Jeans',
      url: '/products/designer-jeans',
      score: 78,
      issues: ['No customer reviews', 'Missing meta description'],
    },
    {
      id: 'product3',
      name: 'Leather Wallet',
      url: '/products/leather-wallet',
      score: 85,
      issues: ['Slow loading images', 'Missing related products'],
    },
  ];
  
  // AI suggestions for optimization
  const aiSuggestions = [
    {
      id: 'suggestion1',
      title: 'Improve product descriptions',
      description: 'Add more detailed product descriptions with key features and benefits to improve SEO and conversion rates.',
      impact: 'High',
    },
    {
      id: 'suggestion2',
      title: 'Add alt text to all images',
      description: 'Ensure all product images have descriptive alt text for better accessibility and SEO ranking.',
      impact: 'Medium',
    },
    {
      id: 'suggestion3',
      title: 'Implement product schema markup',
      description: 'Add schema markup to your product pages to enhance visibility in search results with rich snippets.',
      impact: 'High',
    },
    {
      id: 'suggestion4',
      title: 'Optimize image sizes',
      description: 'Compress and resize all product images to improve page load times and user experience.',
      impact: 'Medium',
    },
  ];
  
  // Update progress state and context
  const updateProgress = (newProgress: number) => {
    setCurrentProgress(newProgress);
    updateKwikBuddyProgress({
      optimization: newProgress,
      currentStep: 5,
    });
  };
  
  // Handle page scan
  const scanPages = () => {
    setIsScanning(true);
    
    // Simulate page scanning
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      updateProgress(50);
      toast({
        title: "Page scan complete",
        description: "We've analyzed your product pages and found optimization opportunities",
      });
    }, 2500);
  };
  
  // Handle applying AI suggestion
  const applySuggestion = (suggestionId: string) => {
    // Check if suggestion is already applied
    if (appliedSuggestions.includes(suggestionId)) return;
    
    // Add suggestion to applied suggestions
    setAppliedSuggestions([...appliedSuggestions, suggestionId]);
    
    // Update progress based on applied suggestions
    const totalSuggestions = aiSuggestions.length;
    const newProgress = Math.min(100, 50 + Math.floor((appliedSuggestions.length + 1) / totalSuggestions * 50));
    updateProgress(newProgress);
    
    // Show toast notification
    toast({
      title: "Suggestion applied",
      description: "The optimization suggestion has been applied to your store",
    });
  };
  
  // Handle downloading report
  const downloadReport = () => {
    toast({
      title: "Report downloaded",
      description: "The optimization report has been downloaded",
    });
  };
  
  // Handle completing the setup journey
  const finishSetup = () => {
    updateProgress(100);
    updateKwikBuddyProgress({
      currentStep: 1, // Reset to first step for next time
    });
    toast({
      title: "Website setup complete!",
      description: "Congratulations! You've completed the KwikBuddy setup journey.",
    });
    navigate('/dashboard');
  };
  
  // Auto-scan pages when component mounts
  useEffect(() => {
    if (!scanComplete && currentProgress === 0) {
      scanPages();
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Page Optimization</h1>
            <p className="text-gray-500">
              Optimize your product pages for better performance and conversions
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

        {/* Page Scan Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yale-blue" />
              Product Page Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isScanning ? (
              <div className="text-center py-8">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-yale-blue border-r-transparent mb-4"></div>
                <p className="text-gray-600">Scanning your product pages...</p>
              </div>
            ) : !scanComplete ? (
              <div className="text-center py-8">
                <Button onClick={scanPages} className="btn-primary">
                  Start Page Scan
                  <Zap className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="h-12 w-12 rounded-full bg-yale-blue/10 flex items-center justify-center mr-4">
                        <Zap className="h-6 w-6 text-yale-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Overall Optimization Score</h3>
                        <p className="text-sm text-gray-500">Based on analysis of 3 product pages</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-16 w-16 rounded-full bg-amber-50 border-4 border-amber-400 flex items-center justify-center">
                        <span className="text-lg font-bold text-amber-600">76%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Page</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Issues</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productPages.map((page) => (
                        <TableRow key={page.id}>
                          <TableCell className="font-medium">{page.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden mr-2">
                                <div 
                                  className={`h-full rounded-full ${
                                    page.score < 70 ? 'bg-red-500' : 
                                    page.score < 80 ? 'bg-amber-500' : 
                                    'bg-green-500'
                                  }`}
                                  style={{ width: `${page.score}%` }}
                                ></div>
                              </div>
                              <span className="text-sm">{page.score}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <ul className="text-sm text-gray-600">
                              {page.issues.map((issue, index) => (
                                <li key={index} className="flex items-center">
                                  <AlertCircle className="h-3 w-3 text-amber-500 mr-1 flex-shrink-0" />
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* AI Suggestions Card */}
        {scanComplete && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-yale-blue" />
                AI-Powered Optimization Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiSuggestions.map((suggestion) => (
                  <div 
                    key={suggestion.id}
                    className="border rounded-md p-4 hover:border-yale-blue transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center mb-1">
                          <h3 className="font-medium">{suggestion.title}</h3>
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                            suggestion.impact === 'High' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {suggestion.impact} Impact
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{suggestion.description}</p>
                      </div>
                      <Button 
                        onClick={() => applySuggestion(suggestion.id)}
                        disabled={appliedSuggestions.includes(suggestion.id)}
                        className={appliedSuggestions.includes(suggestion.id) ? "bg-green-500 hover:bg-green-600" : "btn-primary"}
                      >
                        {appliedSuggestions.includes(suggestion.id) ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Applied
                          </>
                        ) : (
                          "Apply Suggestion"
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={downloadReport}
                  className="flex items-center"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Download Optimization Report
                </Button>
                <Button 
                  onClick={finishSetup}
                  className="btn-primary"
                >
                  Finish Setup Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PageOptimization;
