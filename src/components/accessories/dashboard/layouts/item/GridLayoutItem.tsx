import { forwardRef } from "react";
import { TGridLayoutItemProps } from "../types";
import React from "react";
import { AdmissionsByAgeType } from "../../admissions/admissionByAgeType/AdmissionByAgeType";
import { useSelector } from "react-redux";
import { IState } from "../../../../../types";
import { OpdBySex } from "../../opds/opdbysex/OpdBySex";

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

        default:
          //return <></>;
          return <OpdBySex onRemove={onRemove} period={period} />;
      }
    };

    return (
      <div ref={ref} className={`grid-item ${className}`} {...otherProps}>
        {dashboard()}
      </div>
    );
  }
);
