"use client";

import { PrinterForm } from "@/components/form/PrinterForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RequireAuth } from "@/components/layout/RequireAuth";
import { useRouter } from "next/navigation";

export default function FormPage() {
  const router = useRouter();
  return (
    <RequireAuth>
      <main className="min-h-screen w-full bg-gray-50 p-4 sm:p-8">
        <div className="mx-auto w-full max-w-2xl rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="border-b border-gray-200 p-6 sm:p-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#7a0098] transition-opacity hover:opacity-80"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para o início
            </Link>

            <h2 className="mt-4 text-3xl font-bold text-[#7a0098]">
              Cadastrar Nova Impressora
            </h2>
            <p className="mt-2 text-gray-600">
              Preencha os campos abaixo para registrar um novo equipamento no
              sistema.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <PrinterForm
              onSuccess={() => {
                router.push("/printers"); 
              }}
            />
          </div>
        </div>
      </main>
    </RequireAuth>
  );
}
