import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IState } from "../../../../types";

export const SideContent: FC = () => {
  const { t } = useTranslation();
  const username = useSelector<IState, string>(
    (state) => state.main.authentication.data?.username ?? ""
  );
  return (
    <div className="side">
      <div className="side__header">
        <div className="side__header_avatar"></div>
        <div>
          <span>{username}</span>
        </div>
      </div>
      <div className="side__body">
        <div className="section">
          <span className="title">{t("user.username")}</span>
          <div className="content">
            <span>admin</span>
          </div>
        </div>
        <div className="section">
          <span className="title">{t("user.groups")}</span>
          <div className="content">
            <span>Admin</span>
            <span>Nurser</span>
            <span>Doctor</span>
          </div>
        </div>
        <div className="section">
          <span className="title">{t("user.lastlogin")}</span>
          <div className="content">
            <span>2022-11-10 - 02:10AM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
