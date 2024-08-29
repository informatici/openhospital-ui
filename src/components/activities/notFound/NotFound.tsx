import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo-color.svg";
import Footer from "../../accessories/footer/Footer";
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
