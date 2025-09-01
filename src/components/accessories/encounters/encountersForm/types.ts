
import { EncounterDTO } from "generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IEncounterProps {
  fields: TFields<EncounterFormFieldName>;
  onSubmit: (adm: EncounterDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  admitted: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type EncounterProps = IEncounterProps;

export type EncounterFormFieldName = "code" | "date";
