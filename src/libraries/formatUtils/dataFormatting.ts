import moment from "moment";
import { DiseaseDTO } from "../../generated";
import { parseDate } from "../formDataHandling/functions";

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
  data.date = parseDate(data.date);
  data.visitDate = data.date;
  return data;
};

export const renderDate = (date: string) => {
  return moment(date).isValid()
    ? moment(date).format("DD/MM/YYYY")
    : moment(+date).isValid()
    ? moment(+date).format("DD/MM/YYYY")
    : "";
};
