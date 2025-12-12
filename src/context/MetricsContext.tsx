import { createContext, useState, type ReactNode } from "react";

type MetricType = "metric" | "imperial";

interface MetricContextType {
  metric: MetricType;
  toggleMetric: () => void;
}

export const MetricContext = createContext<MetricContextType | null>(null);

export default function MetricProvider({ children }: { children: ReactNode }) {
  const [metric, setMetric] = useState<MetricType>("metric");

  const toggleMetric = () => {
    setMetric(prev => (prev === "metric" ? "imperial" : "metric"));
  };

  return (
    <MetricContext.Provider value={{ metric, toggleMetric }}>
      {children}
    </MetricContext.Provider>
  );
}