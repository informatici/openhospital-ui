import * as params from "../../../customization/feedback.json";
import { IFeedbackProps } from "./type";

const collectorUrl =
  "https://openhospital.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/r5gghz/b/3/bc54840da492f9ca037209037ef0522a/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-US&collectorId=53f7755c";

export const feedbackProps: IFeedbackProps = {
  enabled: params?.enabled ?? true,
  url: params?.url ?? collectorUrl,
  email: params?.email ?? "example@mail.com",
  version: params?.version ?? "0.0.1",
  priority: params?.priority ?? "2",
};
