import React, { FC } from "react";
import Footer from "../../accessories/footer/Footer";
import logo from "../../../assets/logo-color.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IProps } from "./types";
import classes from "./PermissionDenied.module.scss";
import classnames from "classnames";

const PermissionDenied: FC<IProps> = ({ backRoute }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className={classnames("container", classes.background)}>
        <img
          src={logo}
          alt="Open Hospital"
          className={classes.logo}
          width="150px"
        />
        <div className={classes.title}>{t("common.permissionDenied")}</div>
        <div>
          <Link to={backRoute ? backRoute : "/"}>
            {t("common.gobackdashboard")}
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PermissionDenied;
