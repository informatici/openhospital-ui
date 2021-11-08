import { MedicalTypeDTO } from "../../generated";

export const medicalTypesFormatter = (
  medicalTypes: MedicalTypeDTO[] | undefined
): { value: string; label: string }[] => {
  let options: { value: string; label: string }[] = [];
  if (medicalTypes) {
    medicalTypes.forEach((el) => {
      let option: { value: string; label: string } = {
        value: el.code ?? "",
        label: el.description ?? "",
      };
      options.push(option);
    });
  }

  return options;
};
