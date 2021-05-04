import { TherapyDTO } from "../../../generated";
import { TFields } from "../../../libraries/formDataHandling/types";

interface IOwnProps {
    fields: TFields<TherapyFormFieldName>;
    onSubmit: (triage: TherapyDTO) => void;
    submitButtonLabel: string;
    resetButtonLabel: string;
    isLoading: boolean;
    shouldResetForm: boolean;
    resetFormCallback: () => void;
  }
  
  export type TProps = IOwnProps;
  
  export type TherapyFormFieldName =
    | "medecine"
    | "quantity"
    | "days"
    | "week"
    | "months"
    | "frequency"