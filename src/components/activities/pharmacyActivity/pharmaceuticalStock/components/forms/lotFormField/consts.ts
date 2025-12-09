import { z } from "zod";

export const LotDTOSchema = z.object({
  code: z.string(),
  preparationDate: z.date(),
  dueDate: z.date(),
  cost: z.number().optional(),
  ward: z.string().optional(),
  mainStoreQuantity: z.number().optional(),
  wardsTotalQuantity: z.number().optional(),
  overallQuantity: z.number().optional(),
});
