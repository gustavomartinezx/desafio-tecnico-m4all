import { z } from "zod";

export const printerSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  model: z.string().min(1, "Modelo obrigatório"),
  location: z.string().min(1, "Localização obrigatória"),
  status: z.enum(["ONLINE", "OFFLINE"]),
  paperCapacity: z.number().min(1, "Capacidade de papel obrigatória"),
});

export type PrinterFormData = z.infer<typeof printerSchema> & { id?: number };
