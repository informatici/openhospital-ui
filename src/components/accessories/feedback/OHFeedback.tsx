import { Tooltip } from "@material-ui/core";
import { Feedback } from "@material-ui/icons";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { IState } from "../../../types";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { feedbackConfig } from "../../../customization/feedback";

const OHFeedback: FC = () => {
  const { t } = useTranslation();
  const user = useSelector((state: IState) => state.main.authentication.data);
  (window as any).ATL_JQ_PAGE_PROPS = $.extend(
    (window as any).ATL_JQ_PAGE_PROPS,
    {
      triggerFunction: (showCollectorDialog: any) => {
        $("#feedback-button").on("click", (e) => {
          e.preventDefault();
          showCollectorDialog();
        });
      },

      fieldValues: {
        summary: "Give your feedback",
        description: "Sample description",
        priority: feedbackConfig.priority,
        fullname: user?.displayName ?? "",
        email: feedbackConfig.email,
      },
      environment: {
        // this is custom environment field value, we can add what we need
        "OH version": feedbackConfig.version,
      },
    }
  );
  return (
    <div className="feedback">
      <a href="#" id="feedback-button" title="Feedback">
        <Tooltip title={t("common.feedback")!} aria-label="feedback">
          <Feedback />
        </Tooltip>
      </a>
    </div>
  );
};

export default OHFeedback;
