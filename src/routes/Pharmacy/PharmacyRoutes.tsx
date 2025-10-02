import {
  Home,
  NotFound,
  PharmacyActivity,
} from "components/activities/pharmacyActivity";
import React, { ReactNode } from "react";
import { Route, Routes } from "react-router";
import { PATHS } from "../../consts";
import PharmacyStock from "components/activities/pharmacyActivity/pharmaceuticalStock/PharmacyStock";

const getPath = (from: string) => from.replace(`${PATHS.pharmacy}/`, "");

const routes: { element: ReactNode; path: string }[] = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: getPath(PATHS.pharmacy_medicals),
    element: <Home />,
  },
  {
    path: getPath(PATHS.pharmacy_pharmaceuticalstock),
    element: <PharmacyStock />,
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
