import React, { createContext, useContext, useState, useCallback } from 'react';

export interface AnalyticsEvent {
  name: string;
  payload?: Record<string, any>;
  timestamp: string;
}

interface AnalyticsContextType {
  trackEvent: (eventName: string, payload?: Record<string, any>) => void;
  eventsLog: AnalyticsEvent[];
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [eventsLog, setEventsLog] = useState<AnalyticsEvent[]>([]);

  const trackEvent = useCallback((eventName: string, payload?: Record<string, any>) => {
    const newEvent: AnalyticsEvent = {
      name: eventName,
      payload,
      timestamp: new Date().toLocaleTimeString('ar-EG'),
    };
    // eslint-disable-next-line no-console
    console.log(`[UltraOneFit Analytics] 🎯 ${eventName}`, payload || {});
    setEventsLog((prev) => [newEvent, ...prev].slice(0, 50));
  }, []);

  return (
    <AnalyticsContext.Provider value={{ trackEvent, eventsLog }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
};
