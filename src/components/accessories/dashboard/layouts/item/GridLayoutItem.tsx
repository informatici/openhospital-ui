import { forwardRef } from "react";
import { TGridLayoutItemProps } from "../types";
import React from "react";
import { AdmissionsByAgeType } from "../../admissions/admissionByAgeType/AdmissionByAgeType";
import { useSelector } from "react-redux";
import { IState } from "../../../../../types";
import { AdmissionsBySex } from "../../admissions/admissionBySex/AdmissionBySex";
import { AdmissionsByTypes } from "../../admissions/admissionByTypes/AdmissionByTypes";
import { OpdBySex } from "../../opds/opdsBySex/OpdBySex";
import { AdmissionsByWards } from "../../admissions/admissionByWards/AdmissionByWards";
import { OpdByAgeTypes } from "../../opds/opdByAgeTypes/OpdByAgeTypes";
import { DischargesBySex } from "../../discharges/dischargesBySex/DischargesBySex";
import { DischargesByTypes } from "../../discharges/dischargesByTypes/DischargesByTypes";
import { DischargesByAgeTypes } from "../../discharges/dischargesByAgeTypes/DischargesByAgeTypes";
import { DischargesByWards } from "../../discharges/dischargesByWards/DischargesByWards";

export const GridLayoutItem = forwardRef<HTMLDivElement, TGridLayoutItemProps>(
  (props, ref) => {
    const { dashboardKey, onRemove, className, otherProps } = props;
    const period = useSelector<IState, string[]>(
      (state) => state.dashboard.period
    );

    const dashboard = () => {
      switch (dashboardKey) {
        case "admissionByAgeType":
          return <AdmissionsByAgeType onRemove={onRemove} period={period} />;

        case "admissionBySex":
          return <AdmissionsBySex onRemove={onRemove} period={period} />;

        case "admissionByType":
          return <AdmissionsByTypes onRemove={onRemove} period={period} />;

        case "admissionByWard":
          return <AdmissionsByWards onRemove={onRemove} period={period} />;

        case "opdByAgeType":
          return <OpdByAgeTypes onRemove={onRemove} period={period} />;

        case "opdBySex":
          return <OpdBySex onRemove={onRemove} period={period} />;

        case "dischargeBySex":
          return <DischargesBySex onRemove={onRemove} period={period} />;

        case "dischargeByType":
          return <DischargesByTypes onRemove={onRemove} period={period} />;

        case "dischargeByAgeType":
          return <DischargesByAgeTypes onRemove={onRemove} period={period} />;

        case "dischargeByWard":
          return <DischargesByWards onRemove={onRemove} period={period} />;

        default:
          return <></>;
        //return <OpdBySex onRemove={onRemove} period={period} />;
      }
    };

    return (
      <div ref={ref} className={`grid-item ${className ?? ""}`} {...otherProps}>
        {dashboard()}
      </div>
    );
  }
);
