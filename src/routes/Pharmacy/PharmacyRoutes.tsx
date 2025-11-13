import {
  ChargeMovement,
  Home,
  NotFound,
  PharmacyActivity,
  PharmacyStock,
  WardStock,
} from "components/activities/pharmacyActivity";
import { NewPharmaceutical } from "components/activities/pharmacyActivity/pharmaceutical/NewPharmaceutical";
import Pharmaceutical from "components/activities/pharmacyActivity/pharmaceutical/Pharmaceutical";
import { DischargeMovement } from "components/activities/pharmacyActivity/pharmaceuticalStock/DischargeMovement";
import React, { ReactNode } from "react";
import { Route, Routes } from "react-router";
import { PATHS } from "../../consts";

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
    path: getPath(PATHS.pharmacy_pharmaceutical),
    element: <Pharmaceutical />,
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
    element: <DischargeMovement />,
  },
  {
    path: getPath(PATHS.pharmacy_pharmaceutical_new),
    element: <NewPharmaceutical />,
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
