import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: `${apiUrl}/api/v1`,
});

export const fetchPrinters = async (page: number = 0, size: number = 10) => {
  const response = await api.get("/printers", {
    params: { page, size },
  });
  return response.data;
};
