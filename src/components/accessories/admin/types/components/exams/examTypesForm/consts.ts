import { ExamTypeFormFieldName } from ".";
import { ExamTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export const getInitialFields: (
  examType: ExamTypeDTO | undefined
) => TFields<ExamTypeFormFieldName> = (examType) => ({
  code: { type: "text", value: examType?.code ?? "" },
  description: { type: "text", value: examType?.description ?? "" },
});
