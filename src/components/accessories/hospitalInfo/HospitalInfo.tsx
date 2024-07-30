import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/logo-color.svg";
import "./styles.scss";
import { TProps } from "./types";
import { IState } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { getHospital } from "../../../state/hospital";
import { HospitalDTO } from "../../../generated";

export const HospitalInfo: FC<TProps> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(getHospital());
  }, [dispatch, getHospital]);

  const hospital = useSelector<IState>(
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
