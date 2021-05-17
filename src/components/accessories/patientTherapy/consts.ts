import { TFields } from "../../../libraries/formDataHandling/types";
import { TPatientTriageFormFieldName } from "./patientTriageForm/types";
import { TherapyFormFieldName } from "./therapyForm/types";

const diuresisOptions = [
  {
    label: "Item 1",
    value: "Item 1",
  },
  {
    label: "Item 2",
    value: "Item 2",
  },
];

const bowelOptions = [
  {
    label: "Item 1",
    value: "Item 1",
  },
  {
    label: "Item 2",
    value: "Item 2",
  },
];

const auscultationOptions = [
  {
    label: "Item 1",
    value: "Item 1",
  },
  {
    label: "Item 2",
    value: "Item 2",
  },
];

export const initialFields: TFields<TherapyFormFieldName> = {};
