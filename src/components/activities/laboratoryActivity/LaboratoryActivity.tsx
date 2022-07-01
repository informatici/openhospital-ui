import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { PATHS } from "../../../consts";
import { TUserCredentials } from "../../../state/main/types";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import { Exams } from "../../accessories/laboratory/Exams";
import "./styles.scss";

const LaboratoryActivity: FC = () => {
  const { t } = useTranslation();

  const breadcrumbMap = {
    [t("nav.laboratory")]: PATHS.laboratory,
  };

  const userCredentials = useSelector<IState, TUserCredentials>(
    (state) => state.main.authentication.data
  );

  return (
    <div className="labs">
      <AppHeader
        userCredentials={userCredentials}
        breadcrumbMap={breadcrumbMap}
      />
      <div className="labs__background">
        <div className="labs__content">
          <Exams />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LaboratoryActivity;
