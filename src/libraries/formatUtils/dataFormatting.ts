import { format } from "date-fns";
import { DiseaseDTO } from "../../generated";

export const opdDataFormatter = (
  data: Record<string, any>,
  diseases: DiseaseDTO[] | undefined
) => {
  /**
   * get entire disease object from code
   */
  data.disease = diseases?.find((el) => el.code === +data.disease);
  data.disease2 = diseases?.find((el) => el.code === +data.disease2);
  data.disease3 =
    diseases && data.disease3 !== ""
      ? diseases.find((el) => el.code === +data.disease3)
      : null;

  data.date = format(+data.date, "yyyy-MM-dd");
  data.visitDate = data.date;

  return data;
};
