"use client";

import { useState } from "react";
import { Modal } from "../../ui/Modal";
import { usePrinterStatus } from "@/hooks/usePrinterStatus";
import {
  Wifi,
  WifiOff,
  AlertTriangle,
  FileText,
  LoaderCircle,
} from "lucide-react";
import { clsx } from "clsx";

interface PrinterStatusModalProps {
  printerId: number;
}

const StatusBadge = ({ status }: { status: string }) => {
  const isOnline = status === "ONLINE";
  const isOffline = status === "OFFLINE";

  return (
    <span
      className={clsx(
        "flex items-center gap-2 px-3 py-1 text-sm font-bold text-white rounded-full",
        {
          "bg-green-600": isOnline,
          "bg-red-600": isOffline,
          "bg-yellow-500": !isOnline && !isOffline,
        }
      )}
    >
      {isOnline && <Wifi size={16} />}
      {isOffline && <WifiOff size={16} />}
      {status}
    </span>
  );
};

export function PrinterStatusModal({ printerId }: { printerId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = usePrinterStatus(
    isOpen ? printerId : null
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-[#7a0098] to-[#ff0078] rounded-lg shadow-md hover:opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7a0098]"
      >
        Ver Status
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-6 bg-white rounded-xl shadow-2xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-[#7a0098] mb-6">
            Status da Impressora
          </h2>

          <div className="min-h-[120px] flex items-center justify-center">
            {isLoading && (
              <div className="flex flex-col items-center gap-4 text-gray-500">
                <LoaderCircle
                  className="animate-spin text-[#7a0098]"
                  size={32}
                />
                <p>Carregando status...</p>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-4 p-4 text-red-800 bg-red-100 border border-red-300 rounded-lg">
                <AlertTriangle size={24} />
                <p className="font-semibold">Erro ao carregar status.</p>
              </div>
            )}

            {data && (
              <div className="w-full space-y-5">
                <div className="flex items-center justify-between">
                  <p className="text-lg text-gray-700">Status:</p>
                  <StatusBadge status={data.status} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText size={20} className="text-gray-600" />
                      <p className="text-lg text-gray-700">Nível de papel:</p>
                    </div>
                    <span className="font-bold text-[#7a0098]">
                      {(data as any)?.paperLevel ?? "-"} folhas
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
