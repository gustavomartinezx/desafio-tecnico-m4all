import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export const fetchPrinters = async (page: number = 0, size: number = 10) => {
  const response = await api.get("/printers", {
    params: { page, size },
  });
  return response.data;
};
