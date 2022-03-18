import customs from "./customs.json";
import defaults from "./defaults.json";
import { IFeedbackProps } from "./type";

export const feedbackConfig: IFeedbackProps = {
  ...defaults,
  ...customs,
};
