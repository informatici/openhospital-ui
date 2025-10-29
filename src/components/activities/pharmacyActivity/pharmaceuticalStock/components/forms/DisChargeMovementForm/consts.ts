import { MovementDTO } from "generated";
import { z } from "zod";
import { TFormValues } from "./types";

export const LotDTOSchema = z.object({
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
  // Si l'utilisateur a renseigné quelque chose partiellement
  const hasWard = !!lot.ward;
  const hasQuantity = lot.quantity !== undefined && lot.quantity !== null && lot.quantity > 0;

  // ⚠️ Si l'un des deux est rempli, l'autre doit l'être aussi
  if (hasWard && !hasQuantity) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["quantity"],
      message: "Veuillez renseigner la quantité pour ce lot.",
    });
  }
  if (!hasWard && hasQuantity) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["ward"],
      message: "Veuillez sélectionner un ward pour ce lot.",
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
    lots: from?.medical?.lots?.map(lot => ({
      code: lot.code,
      preparationDate: new Date(lot.preparationDate),
      dueDate: new Date(lot.dueDate),
      cost: lot.cost,
      ward: "", // 🟡 initialement vide
      quantity: 0,
    })) ?? [],
  };
}

