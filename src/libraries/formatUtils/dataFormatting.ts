import { DiseaseDTO } from "../../generated";

export const opdDataFormatter = (
  data: Record<string, any>,
  diseases: DiseaseDTO[] | undefined
) => {
  /**
   * get entire disease object from code
   */
  data.disease = diseases?.filter((el) => el.code === +data.disease)[0];
  data.disease2 = diseases?.filter((el) => el.code === +data.disease2)[0];
  data.disease3 = diseases?.filter((el) => el.code === +data.disease3)[0];

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
