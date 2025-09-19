import "moment/min/locales";
import React from "react";
import { Outlet } from "react-router";

export const Radiology = () => {
  return (
    <div className="radiology">
      <Outlet />
    </div>
  );
};
