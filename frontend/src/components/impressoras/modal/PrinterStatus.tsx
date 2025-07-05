"use client";

import { usePrinterStatus } from "@/hooks/usePrinterStatus";

interface PrinterStatusProps {
  printerId: number;
}

export function PrinterStatus({ printerId }: PrinterStatusProps) {
  const { data, isLoading, error } = usePrinterStatus(printerId);

  if (isLoading) return <div>Carregando status...</div>;
  if (error) return <div>Erro ao carregar status da impressora.</div>;

  const paperCapacity = (data as any)?.paperCapacity ?? "-";

  return (
    <div>
      <p>
        Status:{" "}
        <span
          className={`font-semibold ${
            data?.status === "ONLINE"
              ? "text-green-600"
              : data?.status === "OFFLINE"
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {data?.status}
        </span>
      </p>
      <p>Nível de papel: {paperCapacity} folhas</p>
    </div>
  );
}
