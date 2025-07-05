import { PrinterStatusModal } from "./modal/PrinterStatusModal";
import { useState, useRef, useEffect } from "react";
import { MoreVertical, Trash2, Edit2 } from "lucide-react";
import { EditPrinterModal } from "./modal/EditPrinterModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useActivityLog } from "@/context/ActivityLogContext";
import type { Printer } from "@/types/printer";

export function PrinterCard({ printer }: { printer: Printer }) {
  const [showOptions, setShowOptions] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { addLog } = useActivityLog();

  useEffect(() => {
    if (!showOptions) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  async function handleDelete() {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      await axios.delete(
        `http://localhost:8080/api/v1/printers/${printer.id}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      toast.success("Impressora deletada com sucesso!");
      addLog({ acao: "deletou", nomeImpressora: printer.name });
      queryClient.invalidateQueries({ queryKey: ["printers"] });
    } catch {
      toast.error("Erro ao deletar impressora.");
    }
    setShowOptions(false);
  }

  return (
    <div className="border rounded p-4 shadow space-y-2 flex flex-col items-center relative">
      <button
        className="absolute top-2 right-2 flex items-center justify-center p-2 rounded hover:bg-gray-100 transition"
        onClick={() => setShowOptions((v) => !v)}
        aria-label="Mais opções"
      >
        <MoreVertical className="w-5 h-5 text-gray-500" />
      </button>
      {showOptions && (
        <div
          ref={optionsRef}
          className="absolute right-2 top-10 z-10 flex flex-col bg-white border rounded shadow-md min-w-[120px]"
        >
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              setEditOpen(true);
              setShowOptions(false);
              addLog({ acao: "editou", nomeImpressora: printer.name });
            }}
          >
            <Edit2 className="w-4 h-4" /> Editar
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" /> Excluir
          </button>
        </div>
      )}
      <EditPrinterModal
        printer={printer}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
      <h3 className="font-bold text-xl text-center w-full mb-2">
        {printer.name}
      </h3>
      <p>Modelo: {printer.model}</p>
      <p>Localização: {printer.location}</p>
      <div className="flex w-full mt-auto justify-center">
        <PrinterStatusModal printerId={printer.id} />
      </div>
    </div>
  );
}
