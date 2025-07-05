import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PrinterStatus } from "../types/printer";

export const usePrinterStatus = (id: number | null) => {
  return useQuery<PrinterStatus>({
    queryKey: ["printerStatus", id],
    queryFn: async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const response = await axios.get(
        `http://localhost:8080/api/v1/printers/${id!}/status`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60,
  });
};
