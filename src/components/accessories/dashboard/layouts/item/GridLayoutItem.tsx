import { FC, forwardRef } from "react";
import { TDashboardWidgetProps, TGridLayoutItemProps } from "../types";
import React from "react";
import { AdmissionsByAgeType } from "../../admissions/admissionByAgeType/AdmissionByAgeType";
import { useAppSelector } from "libraries/hooks/redux";
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

export const DashboardWidget: FC<TDashboardWidgetProps> = ({
  dashboard,
  onRemove,
  period,
  onFullScreenEnter,
}) => {
  const dashboardWidget = () => {
    switch (dashboard) {
      case "admissionByAgeType":
        return (
          <AdmissionsByAgeType
            onFullScreenEnter={onFullScreenEnter}
            onRemove={onRemove}
            period={period}
          />
        );

      case "admissionBySex":
        return (
          <AdmissionsBySex
            onFullScreenEnter={onFullScreenEnter}
            onRemove={onRemove}
            period={period}
          />
        );

      case "admissionByType":
        return (
          <AdmissionsByTypes
            onFullScreenEnter={onFullScreenEnter}
            onRemove={onRemove}
            period={period}
          />
        );

      case "admissionByWard":
        return (
          <AdmissionsByWards
            onFullScreenEnter={onFullScreenEnter}
            onRemove={onRemove}
            period={period}
          />
        );

      case "opdByAgeType":
        return (
          <OpdByAgeTypes
            onFullScreenEnter={onFullScreenEnter}
            onRemove={onRemove}
            period={period}
          />
        );

      case "opdBySex":
        return (
          <OpdBySex
            onFullScreenEnter={onFullScreenEnter}
            onRemove={onRemove}
            period={period}
          />
        );

      case "dischargeBySex":
        return (
          <DischargesBySex
            onFullScreenEnter={onFullScreenEnter}
            onRemove={onRemove}
            period={period}
          />
        );

      case "dischargeByType":
        return (
          <DischargesByTypes
            onFullScreenEnter={onFullScreenEnter}
            onRemove={onRemove}
            period={period}
          />
        );

      case "dischargeByAgeType":
        return (
          <DischargesByAgeTypes
            onFullScreenEnter={onFullScreenEnter}
            onRemove={onRemove}
            period={period}
          />
        );

      case "dischargeByWard":
        return (
          <DischargesByWards
            onFullScreenEnter={onFullScreenEnter}
            onRemove={onRemove}
            period={period}
          />
        );

      default:
        return <></>;
      //return <OpdBySex onRemove={onRemove} period={period} />;
    }
  };

  return dashboardWidget();
};

export const GridLayoutItem = forwardRef<HTMLDivElement, TGridLayoutItemProps>(
  (props, ref) => {
    const { dashboardKey, onRemove, className, otherProps, onFullScreenEnter } =
      props;
    const period = useAppSelector<IState, string[]>(
      (state) => state.dashboard.period
    );

    return (
      <div ref={ref} className={`grid-item ${className ?? ""}`} {...otherProps}>
        <DashboardWidget
          onFullScreenEnter={onFullScreenEnter}
          period={period}
          onRemove={onRemove}
          dashboard={dashboardKey}
        />
      </div>
    );
  }
);
