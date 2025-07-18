import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { EstatisticasSincronizacao } from "../types/syncStatistics";

export const useSyncStatistics = () => {
  return useQuery<EstatisticasSincronizacao>({
    queryKey: ["syncStatistics"],
    queryFn: async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const response = await axios.get(
        "http://localhost:8080/api/v1/sync/statistics",
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5, 
  });
};
