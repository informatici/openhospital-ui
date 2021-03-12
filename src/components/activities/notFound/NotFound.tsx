import React from "react";
import Footer from "../../accessories/footer/Footer";
import logo from "../../../assets/logo-color.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound: React.FC = () => {
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
          <Link to="/">{t("common.gobackdashboard")}</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
