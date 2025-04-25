
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  FileText, 
  Image as ImageIcon, 
  CheckSquare, 
  RefreshCw,
  ArrowRight,
  Check,
  Calendar,
  Edit,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SeoTaskProps {
  id: string;
  title: string;
  description: string;
  type: 'title' | 'description' | 'alt' | 'content';
  status: 'pending' | 'applied' | 'scheduled';
  page: string;
  original: string;
  suggestion: string;
  onApply: (id: string) => void;
  onSchedule: (id: string) => void;
  onGenerateAI: (id: string) => void;
}

const SeoTask: React.FC<SeoTaskProps> = ({ 
  id, 
  title, 
  description, 
  type, 
  status, 
  page, 
  original, 
  suggestion, 
  onApply, 
  onSchedule,
  onGenerateAI
}) => {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(suggestion);
  const [editedSuggestion, setEditedSuggestion] = useState(suggestion);
  
  const statusColors = {
    pending: "bg-amber-100 text-amber-800",
    applied: "bg-green-100 text-green-800",
    scheduled: "bg-blue-100 text-blue-800",
  };
  
  const typeIcons = {
    title: <FileText className="h-4 w-4" />,
    description: <Search className="h-4 w-4" />,
    alt: <ImageIcon className="h-4 w-4" />,
    content: <Edit className="h-4 w-4" />,
  };
  
  const handleGenerateAI = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      const newSuggestion = `${type === 'title' ? 'Premium ' : type === 'alt' ? 'High-quality image of ' : type === 'description' ? 'Get the best ' : 'Experience our top-rated '}${original.replace('.', '')} - Perfect for ${['style', 'comfort', 'everyday use', 'premium quality'][Math.floor(Math.random() * 4)]}.`;
      setAiSuggestion(newSuggestion);
      setEditedSuggestion(newSuggestion);
      onGenerateAI(id);
    }, 1500);
  };
  
  return (
    <>
      <div className="border rounded-md p-4 hover:shadow-sm transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-1">
            <div className="flex items-center">
              <h3 className="font-medium">{title}</h3>
              <Badge variant="outline" className={`ml-2 ${statusColors[status]}`}>
                {status === 'pending' ? 'Pending' : status === 'applied' ? 'Applied' : 'Scheduled'}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">{description}</p>
            <p className="text-xs text-gray-400">Page: {page}</p>
          </div>
          <div className="flex-shrink-0 flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8"
              onClick={() => setOpen(true)}
            >
              {typeIcons[type]}
              <span className="ml-1">View</span>
            </Button>
          </div>
        </div>
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <div>
              <h4 className="text-sm font-semibold mb-1">Current {type === 'alt' ? 'Alt Text' : type === 'title' ? 'Title' : type === 'description' ? 'Meta Description' : 'Content'}</h4>
              <div className="p-3 bg-gray-50 rounded-md text-sm">{original}</div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold">Suggested Replacement</h4>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-7 text-xs"
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  ) : (
                    <Sparkles className="h-3 w-3 mr-1 text-gamboge" />
                  )}
                  Generate with AI
                </Button>
              </div>
              
              {type === 'description' || type === 'content' ? (
                <Textarea 
                  value={editedSuggestion} 
                  onChange={(e) => setEditedSuggestion(e.target.value)} 
                  rows={3}
                  className={status !== 'pending' ? 'bg-gray-50' : ''}
                  readOnly={status !== 'pending'}
                />
              ) : (
                <Input 
                  value={editedSuggestion} 
                  onChange={(e) => setEditedSuggestion(e.target.value)} 
                  className={status !== 'pending' ? 'bg-gray-50' : ''}
                  readOnly={status !== 'pending'}
                />
              )}
            </div>
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-between">
            {status === 'pending' && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    onSchedule(id);
                    setOpen(false);
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Later
                </Button>
                <Button 
                  onClick={() => {
                    onApply(id);
                    setOpen(false);
                  }}
                  className="btn-primary"
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Apply with AI
                </Button>
              </>
            )}
            {status === 'applied' && (
              <div className="flex items-center text-green-600 space-x-2">
                <Check className="h-4 w-4" />
                <span>Applied successfully</span>
              </div>
            )}
            {status === 'scheduled' && (
              <div className="flex items-center text-blue-600 space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Scheduled for later</span>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const SeoOptimizer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Sample SEO tasks
  const [seoTasks, setSeoTasks] = useState<SeoTaskProps[]>([
    {
      id: 'task1',
      title: 'Page Title Optimization',
      description: 'Optimize title tag for better click-through rate',
      type: 'title',
      status: 'pending',
      page: '/products/premium-t-shirt',
      original: 'Premium T-Shirt - Your Store',
      suggestion: 'Premium T-Shirt | High Quality Cotton | Your Store',
      onApply: () => {},
      onSchedule: () => {},
      onGenerateAI: () => {},
    },
    {
      id: 'task2',
      title: 'Meta Description Update',
      description: 'Add keywords and call-to-action to meta description',
      type: 'description',
      status: 'pending',
      page: '/products/premium-t-shirt',
      original: 'Our premium t-shirt is made with high-quality materials.',
      suggestion: 'Shop our premium t-shirt made with 100% organic cotton. Super soft, durable, and perfect for everyday wear. Free shipping on orders over $50!',
      onApply: () => {},
      onSchedule: () => {},
      onGenerateAI: () => {},
    },
    {
      id: 'task3',
      title: 'Image Alt Text Missing',
      description: 'Add descriptive alt text to product images',
      type: 'alt',
      status: 'pending',
      page: '/products/designer-jeans',
      original: 'jeans-front.jpg',
      suggestion: 'Premium designer jeans in dark blue wash, front view with detailed stitching',
      onApply: () => {},
      onSchedule: () => {},
      onGenerateAI: () => {},
    },
    {
      id: 'task4',
      title: 'Product Description Content',
      description: 'Expand product description with more details',
      type: 'content',
      status: 'pending',
      page: '/products/leather-wallet',
      original: 'Genuine leather wallet with multiple card slots.',
      suggestion: 'Crafted from premium full-grain leather, this durable wallet features 8 card slots, 2 bill compartments, and RFID protection technology. The sleek design fits comfortably in your pocket while providing ample storage for all your essentials.',
      onApply: () => {},
      onSchedule: () => {},
      onGenerateAI: () => {},
    },
  ]);
  
  // Handle applying SEO task
  const handleApply = (taskId: string) => {
    setSeoTasks(tasks => 
      tasks.map(task => 
        task.id === taskId ? { ...task, status: 'applied' } : task
      )
    );
    
    toast({
      title: "Change applied",
      description: "The SEO change has been applied to your store",
    });
  };
  
  // Handle scheduling SEO task
  const handleSchedule = (taskId: string) => {
    setSeoTasks(tasks => 
      tasks.map(task => 
        task.id === taskId ? { ...task, status: 'scheduled' } : task
      )
    );
    
    toast({
      title: "Task scheduled",
      description: "The SEO change has been scheduled for later",
    });
  };
  
  // Handle AI generation
  const handleGenerateAI = (taskId: string) => {
    // The actual suggestion change happens in the SeoTask component
    toast({
      title: "AI suggestion generated",
      description: "New optimization suggestion has been created",
    });
  };
  
  // Apply all pending tasks
  const applyAll = () => {
    const pendingTasks = seoTasks.filter(task => task.status === 'pending');
    
    if (pendingTasks.length === 0) {
      toast({
        title: "No pending tasks",
        description: "All SEO tasks have been applied or scheduled",
      });
      return;
    }
    
    setSeoTasks(tasks => 
      tasks.map(task => 
        task.status === 'pending' ? { ...task, status: 'applied' } : task
      )
    );
    
    toast({
      title: "All changes applied",
      description: `Applied ${pendingTasks.length} SEO changes to your store`,
    });
  };
  
  // Count tasks by status
  const pendingCount = seoTasks.filter(task => task.status === 'pending').length;
  const appliedCount = seoTasks.filter(task => task.status === 'applied').length;
  const scheduledCount = seoTasks.filter(task => task.status === 'scheduled').length;
  
  // Updated tasks with handlers
  const tasksWithHandlers = seoTasks.map(task => ({
    ...task,
    onApply: handleApply,
    onSchedule: handleSchedule,
    onGenerateAI: handleGenerateAI,
  }));

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">SEO Optimizer</h1>
            <p className="text-gray-500">
              Improve your search engine rankings with AI-powered suggestions
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              className="btn-primary"
              onClick={applyAll}
              disabled={pendingCount === 0}
            >
              {pendingCount > 0 ? (
                <>Apply All Pending Tasks ({pendingCount})</>
              ) : (
                <>All Tasks Completed</>
              )}
            </Button>
          </div>
        </div>

        {/* Task Status Overview */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <span className="text-sm text-gray-500">Pending</span>
                <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">Applied</span>
                <p className="text-2xl font-bold text-green-600">{appliedCount}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">Scheduled</span>
                <p className="text-2xl font-bold text-blue-600">{scheduledCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Filters */}
        <div className="flex items-center space-x-2 mb-4">
          <Button variant="outline" size="sm" className="text-xs">
            All Tasks
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            Pending
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            Applied
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            Scheduled
          </Button>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasksWithHandlers.map((task) => (
            <SeoTask key={task.id} {...task} />
          ))}
        </div>
        
        {/* Navigation */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={() => navigate('/kwikgrowth/kwik-ads')}
            className="btn-primary"
          >
            Go to KwikAds++
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SeoOptimizer;
