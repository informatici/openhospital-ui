import feedback from "./feedback.json";
import default_config from "./default-config.json";
import { IFeedbackProps } from "./type";

export const feedbackConfig: IFeedbackProps = {
  ...default_config,
  ...feedback,
};
