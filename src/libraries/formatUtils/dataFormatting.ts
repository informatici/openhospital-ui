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
  data.date = Date.parse(new Date(+data.date).toString()).toString();
  data.visitDate = data.date;
  return data;
};

export const renderDate = (date: string) => {
  const dateValue = isNaN(+date) ? new Date(date) : new Date(+date);
  return format(dateValue, "dd/MM/yyyy");
};
