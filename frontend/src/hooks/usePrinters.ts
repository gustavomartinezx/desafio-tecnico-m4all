import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Printer } from "@/types/printer";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface PrinterPage {
  content: Printer[];
  totalPages: number;
}

export const usePrinters = (page: number, size: number) => {
  const queryClient = useQueryClient();
  return useQuery<PrinterPage>({
    queryKey: ["printers", page, size],
    queryFn: async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await axios.get(`${apiUrl}/api/v1/printers`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        params: { page, size },
      });
      return res.data;
    },
    placeholderData: () =>
      queryClient.getQueryData(["printers", page - 1, size]) ?? {
        content: [],
        totalPages: 0,
      },
  });
};
