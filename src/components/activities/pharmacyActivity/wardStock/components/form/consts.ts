import { MedicalWardDTO } from "generated";
import { z } from "zod";
import { TFormValues } from "./types";

export const MedicalWardDTOSchema = z.object({
  id: z
    .object({
      lot: z.object({
        code: z.string(),
        pieces: z.number(),
      }),
      medical: z.object({
        code: z.string(),
        description: z.string(),
      }),
    })
    .optional(),

  actualQuantity: z.number(),
  reason: z.string().optional(),
});

export function getInitialValues(from?: MedicalWardDTO): Partial<TFormValues> {
  if (!from) return {};

  return {
    id: from.id
      ? {
          lot: {
            code: String(from.id.lot?.code ?? ""),
            pieces: from.id.lot?.overallQuantity ?? 0,
          },
          medical: {
            code: String(from.id.medical?.code ?? ""),
            description: String(from.id.medical?.description ?? ""),
          },
        }
      : undefined,

    actualQuantity: (from.in_quantity ?? 0) - (from.out_quantity ?? 0),
  };
}
