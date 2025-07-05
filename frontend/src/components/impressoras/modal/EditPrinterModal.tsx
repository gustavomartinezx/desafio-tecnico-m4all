import { Modal } from "@/components/ui/Modal";
import { PrinterForm } from "../../form/PrinterForm";
import { X } from "lucide-react";
import { PrinterFormData } from "@/schemas/printerSchema";

export function EditPrinterModal({
  printer,
  open,
  onClose,
}: {
  printer: PrinterFormData;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <button
          className="absolute p-1 rounded top-3 right-3 hover:bg-gray-100"
          onClick={onClose}
          aria-label="Fechar"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        <h2 className="text-2xl font-bold text-[#7a0098] mb-4">
          Editar Impressora
        </h2>
        <PrinterForm initialData={printer} onSuccess={onClose} isEdit />
      </div>
    </Modal>
  );
}
