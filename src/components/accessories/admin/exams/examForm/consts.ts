import { ExamDTO } from "../../../../../generated";
import { TFields } from "../../../../../libraries/formDataHandling/types";
import { ExamProps } from "../types";

export const getInitialFields: (
  operation: ExamDTO | undefined
) => TFields<ExamProps> = (exam) => ({
  code: { type: "text", value: exam?.code ?? "" },
  examtype: { type: "text", value: exam?.examtype?.code ?? "" },
  description: { type: "text", value: exam?.description ?? "" },
  procedure: { type: "number", value: exam?.procedure?.toString() ?? "" },
  defaultResult: { type: "text", value: exam?.defaultResult ?? "" },
  lock: { type: "number", value: exam?.lock ?? "" },
});
