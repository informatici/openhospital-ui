import React, { FC } from "react";
import Footer from "../../accessories/footer/Footer";
import logo from "../../../assets/logo-color.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IProps } from "./types";

const NotFound: FC<IProps> = ({ backRoute }) => {
  const { t } = useTranslation();
  return (
    <div className="login">
      <div className="container login__background">
        <img
          src={logo}
          alt="Open Hospital"
          className="login__logo"
          width="150px"
        />
        <div className="login__title">{t("common.404notfound")}</div>
        <div className="login__link">
          <Link to={backRoute ? backRoute : "/"}>
            {t("common.gobackdashboard")}
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
