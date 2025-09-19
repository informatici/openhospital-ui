import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo-color.svg";
import Footer from "../../accessories/footer/Footer";
import "./styles.scss";
import { IProps } from "./types";

const NotFound: FC<IProps> = ({ backRoute }) => {
  const { t } = useTranslation();
  return (
    <div className="notFound">
      <div className="container notFound__background">
        <img
          src={logo}
          alt="Open Hospital"
          className="notFound__logo"
          width="150px"
        />
        <div className="notFound__title">{t("common.404notfound")}</div>
        <div className="notFound__link">
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
