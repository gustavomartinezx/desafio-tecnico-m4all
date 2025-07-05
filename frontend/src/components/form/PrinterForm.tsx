"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { printerSchema, PrinterFormData } from "@/schemas/printerSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LoaderCircle, AlertCircle, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useActivityLog } from "@/context/ActivityLogContext";

const FormField = ({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: { message?: string };
}) => (
  <div>
    <label
      htmlFor={label}
      className="block mb-1 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    {children}
    {error && (
      <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
        <AlertCircle size={14} />
        <p>{error.message}</p>
      </div>
    )}
  </div>
);

export function PrinterForm({
  onSuccess,
  initialData,
  isEdit,
}: {
  onSuccess: () => void;
  initialData?: PrinterFormData;
  isEdit?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PrinterFormData>({
    resolver: zodResolver(printerSchema),
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const queryClient = useQueryClient();
  const { addLog } = useActivityLog();

  const mutation = useMutation({
    mutationFn: (data: PrinterFormData) => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (isEdit && initialData && initialData.id) {
        // PUT para editar
        return axios.put(
          `http://localhost:8080/api/v1/printers/${initialData.id}`,
          data,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
      }
      return axios.post("http://localhost:8080/api/v1/printers", data, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["printers"] });
      toast.success(
        isEdit
          ? "Impressora atualizada com sucesso!"
          : "Impressora criada com sucesso!"
      );
      addLog({
        acao: isEdit ? "editou" : "criou",
        nomeImpressora: initialData?.name || "Nova Impressora",
      });
      onSuccess();
    },
    onError: (error) => {
      console.error("Erro ao criar/editar impressora:", error);
      alert(
        isEdit
          ? "Falha ao editar a impressora. Tente novamente."
          : "Falha ao criar a impressora. Tente novamente."
      );
    },
  });

  const handleFormSubmit = (data: PrinterFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="p-1 space-y-6">
      <FormField label="Nome da Impressora" error={errors.name}>
        <input
          id="Nome da Impressora"
          placeholder="Ex: HP LaserJet Pro M404dn"
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7a0098] focus:border-transparent"
          {...register("name")}
        />
      </FormField>

      <FormField label="Modelo" error={errors.model}>
        <input
          id="Modelo"
          placeholder="Ex: LaserJet Pro"
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7a0098] focus:border-transparent"
          {...register("model")}
        />
      </FormField>

      <FormField label="Localização" error={errors.location}>
        <input
          id="Localização"
          placeholder="Ex: Escritório 1, 2º Andar"
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7a0098] focus:border-transparent"
          {...register("location")}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Status Inicial" error={errors.status}>
          <div className="relative">
            <select
              id="Status Inicial"
              className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#7a0098] focus:border-transparent"
              {...register("status")}
            >
              <option value="ONLINE">ONLINE</option>
              <option value="OFFLINE">OFFLINE</option>
            </select>
            <ChevronDown className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
          </div>
        </FormField>

        <FormField label="Capacidade de Papel" error={errors.paperCapacity}>
          <input
            id="Capacidade de Papel"
            type="number"
            placeholder="Ex: 500"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7a0098] focus:border-transparent"
            {...register("paperCapacity", { valueAsNumber: true })}
          />
        </FormField>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="flex items-center justify-center w-full px-4 py-3 font-bold text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-[#7a0098] to-[#ff0078] rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7a0098] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {mutation.isPending ? (
          <>
            <LoaderCircle className="w-5 h-5 mr-2 animate-spin" />
            {isEdit ? "Salvando..." : "Enviando..."}
          </>
        ) : isEdit ? (
          "Editar Impressora"
        ) : (
          "Criar Impressora"
        )}
      </button>
    </form>
  );
}
