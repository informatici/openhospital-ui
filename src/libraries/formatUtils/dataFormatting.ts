import { DiseaseDTO } from "../../generated";

export const opdDataFormatter = (
  data: Record<string, any>,
  diseases: DiseaseDTO[]
) => {
  /**
   * get entire disease object from code
   */
  const disease1 = diseases.filter((el) => el.code === +data.disease);
  const disease2 = diseases.filter((el) => el.code === +data.disease2);
  const disease3 = diseases.filter((el) => el.code === +data.disease3);

  data.disease = disease1[0];
  data.disease2 = disease2[0];
  data.disease3 = disease3[0];

  if (
    data.patientCode &&
    data.disease &&
    data.disease2 &&
    data.disease3 &&
    data.date
  )
    return data;
  else return undefined;
};
