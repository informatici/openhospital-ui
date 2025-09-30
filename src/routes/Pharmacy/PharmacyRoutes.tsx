import {
  Home,
  NotFound,
  PharmacyActivity,
} from "components/activities/pharmacyActivity";
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
    path: getPath(PATHS.pharmacy_medicals),
    element: <Home />,
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
