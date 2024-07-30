import React, { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "@/libraries/hooks/redux";
import { useLocation } from "react-router";
import { PATHS } from "../../../consts";
import { Permission } from "../../../libraries/permissionUtils/Permission";
import { TUserCredentials } from "../../../state/main/types";
import { IState } from "../../../types";
import AppHeader from "../../accessories/appHeader/AppHeader";
import Footer from "../../accessories/footer/Footer";
import { HospitalInfo } from "../../accessories/hospitalInfo/HospitalInfo";
import { Exams } from "../../accessories/laboratory/Exams";
import "./styles.scss";

const LaboratoryActivity: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const breadcrumbMap = useMemo(() => {
    if (location.pathname.includes("new"))
      return {
        [t("nav.laboratory")]: PATHS.laboratory,
        [t("nav.newlaboratory")]: PATHS.laboratory_new,
      };
    if (location.pathname.includes("edit"))
      return {
        [t("nav.laboratory")]: PATHS.laboratory,
        [t("nav.editlaboratory")]: `${PATHS.laboratory_edit}`,
      };
    return {
      [t("nav.laboratory")]: PATHS.laboratory,
    };
  }, [location]);

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
          <HospitalInfo />
          <Permission require="laboratories.access">
            <Exams />
          </Permission>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LaboratoryActivity;
