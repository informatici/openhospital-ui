import {
  ChargeMovement,
  Home,
  NotFound,
  PharmacyActivity,
  PharmacyStock,
  WardStock,
} from "components/activities/pharmacyActivity";
import React, { ReactNode } from "react";
import { Route, Routes } from "react-router";
import { PATHS } from "../../consts";
import { DisChargeMovement } from "components/activities/pharmacyActivity/pharmaceuticalStock/DischargeMovement";

const getPath = (from: string) => from.replace(`${PATHS.pharmacy}/`, "");

const routes: { element: ReactNode; path: string }[] = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: getPath(PATHS.pharmacy_ward_stock),
    element: <WardStock />,
  },
  {
    path: getPath(PATHS.pharmacy_pharmaceuticalstock),
    element: <PharmacyStock />,
  },
  {
    path: getPath(PATHS.pharmacy_pharmaceuticalstock_charge),
    element: <ChargeMovement />,
  },
  {
    path: getPath(PATHS.pharmacy_pharmaceuticalstock_discharge),
    element: <DisChargeMovement />,
  },
];

export const PharmacyRoutes = () => {
  return (
    <Routes>
      <Route element={<PharmacyActivity />}>
        {routes.map((route) => (
          <Route
            key={route.path.replace("*", "")}
            path={route.path}
            element={route.element}
          />
        ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
