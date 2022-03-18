import customs from "./customs.json";
import default_ from "./default.json";
import { IFeedbackProps } from "./type";

export const feedbackConfig: IFeedbackProps = {
  ...default_,
  ...customs,
};
