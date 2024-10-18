import { ExamDTO } from "../../../../../generated";
import { TFields } from "../../../../../libraries/formDataHandling/types";
import { ExamFormFieldName } from "../types";

export const getInitialFields: (
  exam: ExamDTO | undefined,
  rows: string[] | undefined
) => TFields<ExamFormFieldName> = (exam, rows) => ({
  code: { type: "text", value: exam?.code ?? "" },
  examtype: { type: "text", value: exam?.examtype?.code ?? "" },
  description: { type: "text", value: exam?.description ?? "" },
  procedure: { type: "number", value: exam?.procedure?.toString() ?? "3" },
  defaultResult: { type: "text", value: exam?.defaultResult ?? "" },
  lock: { type: "number", value: exam?.lock ?? "" },
  rows: {
    type: "text",
    isArray: true,
    value: JSON.stringify(
      rows ?? ((exam?.procedure ?? 3) !== 3 ? ["", ""] : [])
    ),
  },
});
