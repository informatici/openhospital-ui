import React, { ReactNode } from "react";
import VaccineTypes, {
  EditVaccineType,
  NewVaccineType,
} from "../../components/accessories/admin/types/components/vaccines";
import { Route, Routes } from "react-router";
import NotFound from "../../components/activities/notFound/NotFound";
import Empty from "../../components/accessories/admin/types/Empty";
import TypesAdmin from "../../components/accessories/admin/types/TypesAdmin";
import AdmissionTypes, {
  EditAdmissionType,
  NewAdmissionType,
} from "../../components/accessories/admin/types/components/admissions";

const TypesRoutes = () => {
  const routes: { element: ReactNode; path: string }[] = [
    {
      path: "vaccines",
      element: <VaccineTypes />,
    },
    {
      path: "vaccines/new",
      element: <NewVaccineType />,
    },
    {
      path: "vaccines/:code/edit",
      element: <EditVaccineType />,
    },
    {
      path: "admissions",
      element: <AdmissionTypes />,
    },
    {
      path: "admissions/new",
      element: <NewAdmissionType />,
    },
    {
      path: "admissions/:code/edit",
      element: <EditAdmissionType />,
    },
  ];

  return (
    <Routes>
      <Route element={<TypesAdmin />}>
        <Route index element={<Empty />} />
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default TypesRoutes;
