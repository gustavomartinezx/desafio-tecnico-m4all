"use client";

import { Button } from "@/components/ui/button";
import { usePrinters } from "@/hooks/usePrinters";
import {
  PlusCircle,
  Printer,
  CheckCircle2, 
  XCircle, 
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link"; 
import { LucideIcon } from "lucide-react";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { useActivityLog } from "@/context/ActivityLogContext";
import { EntradaLog } from "../types/activityLog";

type StatCardProps = {
  icon: LucideIcon;
  title: string;
  value: number;
  color: string;
  isLoading: boolean;
  borderTopColor: string;
};

const StatCard = ({
  icon,
  title,
  value,
  color,
  isLoading,
  borderTopColor,
}: StatCardProps) => {
  const Icon = icon;

  const cardStyle = {
    borderTop: `4px solid ${borderTopColor}`,
  };

  return (
    <div
      className="transform-gpu rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
      style={cardStyle}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">{title}</span>
          {isLoading ? (
            <div className="mt-2 h-9 w-24 animate-pulse rounded-md bg-gray-200" />
          ) : (
            <span className={`text-4xl font-bold ${color}`}>{value}</span>
          )}
        </div>
        <div
          className={`rounded-full bg-opacity-10 p-3 ${color} bg-${
            color?.split("-")[1]
          }-100`}
        >
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const { data, isLoading } = usePrinters(0, 1000);
  const [stats, setStats] = useState({
    online: 0,
    offline: 0,
  });
  const { logs } = useActivityLog();

  useEffect(() => {
    if (data?.content) {
      setStats({
        online: data.content.filter((p) => p.status === "ONLINE").length,
        offline: data.content.filter((p) => p.status === "OFFLINE").length,
      });
    }
  }, [data]);

  return (
    <RequireAuth>
      <div className="min-h-screen w-full bg-gray-50/50">
        <main className="flex flex-1 flex-col gap-8 p-6 md:p-10">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Dashboard de Impressoras
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Visão geral dos status das impressoras.
              </p>
            </div>
            <Link href="/form" passHref>
              <Button className="flex items-center gap-2 bg-[#7a0098] hover:bg-[#6b0086]">
                <PlusCircle className="h-5 w-5" />
                Adicionar Impressora
              </Button>
            </Link>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={Printer}
              title="Total de Impressoras"
              value={stats.online + stats.offline}
              color="text-[#7a0098]"
              borderTopColor="#7a0098"
              isLoading={isLoading}
            />
            <StatCard
              icon={CheckCircle2}
              title="Online"
              value={stats.online}
              color="text-green-600"
              borderTopColor="#16a34a" 
              isLoading={isLoading}
            />
            <StatCard
              icon={XCircle}
              title="Offline"
              value={stats.offline}
              color="text-red-600"
              borderTopColor="#dc2626"
              isLoading={isLoading}
            />
          </div>

          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700">
              Atividade Recente
            </h2>
            {logs.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {logs.slice(0, 5).map((log: EntradaLog) => (
                  <li
                    key={log.id}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <Printer className="w-4 h-4 text-[#7a0098]" />
                    <span className="font-medium">{log.nomeImpressora}</span>
                    <span className="text-xs text-gray-500 ml-2">{log.acao}</span>
                    <span className="text-xs text-gray-400 ml-2">
                      {log.dataHora.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-gray-500">
                Nenhuma atividade recente registrada nesta sessão.
              </p>
            )}
          </div>
        </main>
      </div>
    </RequireAuth>
  );
}
