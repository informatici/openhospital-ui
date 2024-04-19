import React, { ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router";
import NotFound from "../../components/activities/notFound/NotFound";
import AdminActivity from "../../components/activities/adminActivity/AdminActivity";
import { AdminActivityContent } from "../../components/activities/adminActivity/AdminActivityContent/AdminActivityContent";
import { Wards } from "../../components/accessories/admin";

export const AdminRoutes = () => {
  const { t } = useTranslation();
  const routes: { element: ReactNode; path: string }[] = useMemo(
    () => [
      {
        path: "wards",
        element: (
          <AdminActivityContent title={t("nav.wards")} children={<Wards />} />
        ),
      },
      {
        path: "diseases",
        element: (
          <AdminActivityContent
            title={t("nav.diseases")}
            children={<Wards />}
          />
        ),
      },
      {
        path: "exams",
        element: (
          <AdminActivityContent title={t("nav.exams")} children={<Wards />} />
        ),
      },
      {
        path: "operations",
        element: (
          <AdminActivityContent
            title={t("nav.operations")}
            children={<Wards />}
          />
        ),
      },
      {
        path: "vaccines",
        element: (
          <AdminActivityContent
            title={t("nav.vaccines")}
            children={<Wards />}
          />
        ),
      },
      {
        path: "suppliers",
        element: (
          <AdminActivityContent
            title={t("nav.suppliers")}
            children={<Wards />}
          />
        ),
      },
      {
        path: "users",
        element: (
          <AdminActivityContent
            title={t("nav.usersGroups")}
            children={<Wards />}
          />
        ),
      },
      {
        path: "types",
        element: (
          <AdminActivityContent
            title={t("nav.manageTypes")}
            children={<Wards />}
          />
        ),
      },
    ],
    [t]
  );
  return (
    <Routes>
      <Route element={<AdminActivity />}>
        <Route index element={<Navigate to="wards" replace />} />
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};