import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo-color.svg";
import { Diversity1Rounded } from "@mui/icons-material";

export function NotFound() {
  const { t } = useTranslation();
  return (
    <div>
      <img
        src={logo}
        alt="Open Hospital"
        className="login__logo"
        width="150px"
      />
      <div className="not-found__title">{t("common.404notfound")}</div>
      <div>
        <Link to={".."}>{t("common.goback")}</Link>
      </div>
    </div>
  );
}

export default NotFound;
