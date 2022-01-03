import { MedicalTypeDTO } from "../../generated";

export const medicalTypesFormatter = (
  medicalTypes: MedicalTypeDTO[] | undefined
): { value: string; label: string } [] => {
  if (medicalTypes) {
    return medicalTypes.map((el) => {
        return {
          value: el.code ?? "",
          label: el.description ?? ""
        }; 
      });
    }
    else return [];
  }
