"use client";

import { useState } from "react";
import { usePrinters } from "@/hooks/usePrinters";
import { PrinterCard } from "@/components/impressoras/PrinterCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { RequireAuth } from "@/components/layout/RequireAuth";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

export default function PrintersPage() {
  const [page, setPage] = useState(0);
  const size = 10;
  const { data, isLoading, error, isPlaceholderData } = usePrinters(page, size);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#7a0098] border-t-transparent"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Carregando impressoras...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg border border-red-200 bg-white p-8 text-center shadow-lg">
          <AlertTriangle className="mx-auto h-12 w-12 text-[#ff0078]" />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Ocorreu um Erro
          </h2>
          <p className="mt-2 text-gray-600">
            Não foi possível carregar a lista de impressoras. Por favor, tente
            novamente.
          </p>
          <Button
            asChild
            className="mt-6 bg-[#ff0078] text-white hover:bg-[#ff0078]/90"
          >
            <Link href="/">Voltar para o Início</Link>
          </Button>
        </div>
      </div>
    );
  }

  const sortedContent =
    data && data.content
      ? [...data.content].sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        })
      : [];

  return (
    <RequireAuth>
      <main className="min-h-screen w-full bg-gray-50 p-4 sm:p-8">
        <div className="mx-auto w-full max-w-7xl rounded-xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#7a0098] transition-opacity hover:opacity-80"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para o início
            </Link>
            <h2 className="mt-4 text-3xl font-bold text-[#7a0098]">
              Lista de Impressoras
            </h2>
          </div>

          {data && sortedContent.length > 0 ? (
            <div className="flex flex-col gap-8">
              <div
                className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-opacity duration-300 ${
                  isPlaceholderData ? "opacity-50" : "opacity-100"
                }`}
              >
                {sortedContent.map((printer) => (
                  <PrinterCard key={printer.id} printer={printer} />
                ))}
              </div>

              <div className="flex flex-wrap justify-center items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setPage(0)}
                  disabled={page === 0}
                  className="border-[#7a0098] text-[#7a0098] hover:bg-[#7a0098] hover:text-white disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                  aria-label="Primeira página"
                >
                  <ChevronsLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPage((old) => Math.max(old - 1, 0))}
                  disabled={page === 0}
                  className="border-[#7a0098] text-[#7a0098] hover:bg-[#7a0098] hover:text-white disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <span className="font-semibold text-gray-700">
                  Página {page + 1} de {data.totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() =>
                    !isPlaceholderData && setPage((old) => old + 1)
                  }
                  disabled={isPlaceholderData || page >= data.totalPages - 1}
                  className="border-[#7a0098] text-[#7a0098] hover:bg-[#7a0098] hover:text-white disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                  aria-label="Próxima página"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPage(data.totalPages - 1)}
                  disabled={page >= data.totalPages - 1}
                  className="border-[#7a0098] text-[#7a0098] hover:bg-[#7a0098] hover:text-white disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                  aria-label="Última página"
                >
                  <ChevronsRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-gray-500">
              Nenhuma impressora cadastrada ainda.
            </div>
          )}
        </div>
      </main>
    </RequireAuth>
  );
}
