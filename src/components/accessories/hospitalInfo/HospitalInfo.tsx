import { useAppDispatch, useAppSelector } from "libraries/hooks/redux";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/logo-color.svg";
import { HospitalDTO } from "../../../generated";
import { getHospital } from "../../../state/hospital";
import "./styles.scss";
import { TProps } from "./types";

export const HospitalInfo: FC<TProps> = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(getHospital());
  }, [dispatch]);

  const hospital = useAppSelector(
    (state) => state.hospital.getHospital.data
  ) as HospitalDTO;

  return (
    <div className="hospitalInfo">
      <div className="hospitalInfo__background">
        <div className="hospitalInfo__logo">
          <img src={logo} alt="Open Hospital" height="45px" />
        </div>
        <div className="hospitalInfo__main">
          <div className="hospitalInfo__main__headline">
            {hospital?.description ?? t("common.hospitalname")}
          </div>
          <div className="hospitalInfo__main__details">
            {hospital?.city && <div>{hospital.city}</div>}
            {hospital?.address && <div>{hospital.address}</div>}
            {hospital?.fax && <div>{hospital.fax}</div>}
            {hospital?.email && <div>{hospital.email}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
