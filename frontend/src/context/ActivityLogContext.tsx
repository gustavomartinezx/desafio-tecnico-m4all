import { createContext, useContext, useState, ReactNode } from "react";
import { EntradaLog } from "../types/activityLog";

const ActivityLogContext = createContext<{
  logs: EntradaLog[];
  addLog: (entry: Omit<EntradaLog, "id" | "dataHora">) => void;
}>({ logs: [], addLog: () => {} });

export function ActivityLogProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<EntradaLog[]>([]);

  function addLog(entry: Omit<EntradaLog, "id" | "dataHora">) {
    setLogs((prev) =>
      [
        {
          ...entry,
          id: Math.random().toString(36).slice(2),
          dataHora: new Date(),
        },
        ...prev,
      ].slice(0, 10)
    ); 
  }

  return (
    <ActivityLogContext.Provider value={{ logs, addLog }}>
      {children}
    </ActivityLogContext.Provider>
  );
}

export function useActivityLog() {
  return useContext(ActivityLogContext);
}
