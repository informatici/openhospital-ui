import { Feedback } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useAppSelector } from "libraries/hooks/redux";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { feedbackConfig } from "../../../customization/feedback";
import { IState } from "../../../types";
import "./styles.scss";

const OHFeedback: FC = () => {
  const { t } = useTranslation();
  const user = useAppSelector(
    (state: IState) => state.main.authentication.data
  );
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
        fullname: user?.username ?? "",
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
