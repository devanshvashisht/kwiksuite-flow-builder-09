
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Store {
  id: string;
  name: string;
  category: string;
  revenue: string;
  aov: string;
  salesChannels: string[];
}

interface OnboardingData {
  email?: string;
  password?: string;
  store?: Store;
  plan?: 'basic' | 'pro' | 'enterprise';
  step: number;
  completed: boolean;
}

interface KwikBuddyProgress {
  website: number;
  seo: number;
  payments: number;
  apps: number;
  optimization: number;
  currentStep: number;
}

interface AppContextType {
  isAuthenticated: boolean;
  onboarding: OnboardingData;
  kwikBuddyProgress: KwikBuddyProgress;
  setIsAuthenticated: (value: boolean) => void;
  updateOnboarding: (data: Partial<OnboardingData>) => void;
  updateKwikBuddyProgress: (data: Partial<KwikBuddyProgress>) => void;
  resetOnboarding: () => void;
}

const defaultStore: Store = {
  id: '',
  name: '',
  category: '',
  revenue: '',
  aov: '',
  salesChannels: [],
};

const defaultOnboarding: OnboardingData = {
  email: '',
  password: '',
  store: defaultStore,
  plan: 'basic',
  step: 1,
  completed: false,
};

const defaultKwikBuddyProgress: KwikBuddyProgress = {
  website: 0,
  seo: 0,
  payments: 0,
  apps: 0,
  optimization: 0,
  currentStep: 1,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onboarding, setOnboarding] = useState<OnboardingData>(defaultOnboarding);
  const [kwikBuddyProgress, setKwikBuddyProgress] = useState<KwikBuddyProgress>(defaultKwikBuddyProgress);

  // Load state from localStorage on initial render
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedOnboarding = localStorage.getItem('onboarding');
    const storedProgress = localStorage.getItem('kwikBuddyProgress');

    if (storedAuth) setIsAuthenticated(JSON.parse(storedAuth));
    if (storedOnboarding) setOnboarding(JSON.parse(storedOnboarding));
    if (storedProgress) setKwikBuddyProgress(JSON.parse(storedProgress));
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('onboarding', JSON.stringify(onboarding));
    localStorage.setItem('kwikBuddyProgress', JSON.stringify(kwikBuddyProgress));
  }, [isAuthenticated, onboarding, kwikBuddyProgress]);

  const updateOnboarding = (data: Partial<OnboardingData>) => {
    setOnboarding(prev => ({ ...prev, ...data }));
  };

  const updateKwikBuddyProgress = (data: Partial<KwikBuddyProgress>) => {
    setKwikBuddyProgress(prev => ({ ...prev, ...data }));
  };

  const resetOnboarding = () => {
    setOnboarding(defaultOnboarding);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        onboarding,
        kwikBuddyProgress,
        setIsAuthenticated,
        updateOnboarding,
        updateKwikBuddyProgress,
        resetOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
