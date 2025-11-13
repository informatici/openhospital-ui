import { MovementDTO } from "generated";
import { z } from "zod";
import { TFormValues } from "./types";

export const LotDTOSchema = z
  .object({
    code: z.string(),
    preparationDate: z.date(),
    dueDate: z.date(),
    cost: z.number().nullish(),
    ward: z.string().optional(),
    quantity: z.number().optional(),
    mainStoreQuantity: z.number().optional(),
    wardsTotalQuantity: z.number().optional(),
    overallQuantity: z.number().optional(),
  })
  .superRefine((lot, ctx) => {
    const hasWard = !!lot.ward;
    const hasQuantity =
      lot.quantity !== undefined && lot.quantity !== null && lot.quantity > 0;
    if (hasWard && !hasQuantity) {
      ctx.addIssue({
        code: "custom",
        path: ["quantity"],
        message: "The quantity is required.",
      });
    }
    if (!hasWard && hasQuantity) {
      ctx.addIssue({
        code: "custom",
        path: ["ward"],
        message: "The ward is required.",
      });
    }
    if (lot.quantity && lot.quantity > (lot.mainStoreQuantity ?? 0)) {
      ctx.addIssue({
        code: "custom",
        path: ["quantity"],
        message: "Should not exceed main store quantity.",
      });
    }
  });

export const MovementDTOSchema = z.object({
  code: z.number().nullish(),
  medical: z.number(),
  type: z.string(),
  ward: z.string().nullish(),
  lots: z.array(LotDTOSchema).nullish(),
  date: z.date(),
  quantity: z.number().nullish(),
  supplier: z.number().nullish(),
  refNo: z.string(),
});

export function getInitialValues(from?: MovementDTO): Partial<TFormValues> {
  return {
    code: from?.code,
    medical: from?.medical?.code,
    type: from?.type?.code,
    date: from?.date ? new Date(from.date) : undefined,
    quantity: from?.quantity,
    supplier: from?.supplier?.supId,
    refNo: from?.refNo ?? "",
    lots:
      from?.medical?.lots?.map((lot) => ({
        code: lot.code,
        preparationDate: new Date(lot.preparationDate),
        dueDate: new Date(lot.dueDate),
        cost: lot.cost,
        ward: "",
        quantity: 0,
      })) ?? [],
  };
}
