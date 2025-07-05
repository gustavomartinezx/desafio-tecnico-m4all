"use client";

import { useSyncStatistics } from "@/hooks/useSyncStatistics";

export function SyncStatistics() {
  const { data, isLoading, error } = useSyncStatistics();

  if (isLoading) return <div>Carregando dados de sincronização...</div>;
  if (error) return <div>Erro ao carregar estatísticas de sincronização.</div>;

  return (
    <div className="p-4 border rounded bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">
        Estatísticas de Sincronização
      </h2>
      <ul>
        <li>Total processados: {data?.totalProcessado}</li>
        <li>Sucessos: {data?.totalSucesso}</li>
        <li>Falhas: {data?.totalFalha}</li>
        <li>
          Última sincronização:{" "}
          {data?.ultimaSincronizacao
            ? new Date(data.ultimaSincronizacao).toLocaleString()
            : "N/A"}
        </li>
      </ul>
    </div>
  );
}
