import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "@/libraries/hooks/redux";
import { IAuthentication } from "../../../../state/main/types";
import { IState } from "../../../../types";

export const SideContent: FC = () => {
  const { t } = useTranslation();
  const user = useSelector<IState, IAuthentication | undefined>(
    (state) => state.main.authentication.data
  );

  return (
    <div className="side">
      <div className="side__header">
        <div>
          <span>{user?.username}</span>
        </div>
      </div>
      <div className="side__body">
        <div className="section">
          <span className="title">{t("user.username")}</span>
          <div className="content">
            <span>{user?.username}</span>
          </div>
        </div>
        <div className="section">
          <span className="title">{t("user.lastlogin")}</span>
          <div className="content">
            <span>2022-11-10 - 02:10 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
