import React, { ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router";
import NotFound from "../../components/activities/notFound/NotFound";
import AdminActivity, {
  AdminActivityContent,
} from "../../components/activities/adminActivity";
import {
  Wards,
  NewWard,
  EditWard,
} from "../../components/accessories/admin/wards";
import { Exams } from "../../components/accessories/admin/exams";
import { Users } from "../../components/accessories/admin/users";
import TypesRoutes from "./TypesRoutes";
import {
  Diseases,
  Operations,
  NewDisease,
  EditDisease,
  NewOperation,
  EditOperation,
  Suppliers,
} from "../../components/accessories/admin";
import { PATHS } from "../../consts";
import { NewSupplier } from "../../components/accessories/admin/suppliers/newSupplier";
import { EditSupplier } from "../../components/accessories/admin/suppliers/editSupplier";

export const AdminRoutes = () => {
  const { t } = useTranslation();
  const routes: { element: ReactNode; path: string }[] = useMemo(
    () => [
      {
        path: PATHS.admin_wards,
        element: (
          <AdminActivityContent title={t("nav.wards")} children={<Wards />} />
        ),
      },
      {
        path: PATHS.admin_wards_new,
        element: (
          <AdminActivityContent
            title={t("ward.addWard")}
            children={<NewWard />}
          />
        ),
      },
      {
        path: PATHS.admin_wards_edit,
        element: (
          <AdminActivityContent
            title={t("ward.editWard")}
            children={<EditWard />}
          />
        ),
      },
      {
        path: PATHS.admin_diseases,
        element: (
          <AdminActivityContent
            title={t("nav.diseases")}
            children={<Diseases />}
          />
        ),
      },
      {
        path: PATHS.admin_diseases_new,
        element: (
          <AdminActivityContent
            title={t("disease.addDisease")}
            children={<NewDisease />}
          />
        ),
      },
      {
        path: PATHS.admin_diseases_edit,
        element: (
          <AdminActivityContent
            title={t("disease.editDisease")}
            children={<EditDisease />}
          />
        ),
      },
      {
        path: "exams",
        element: (
          <AdminActivityContent title={t("nav.exams")} children={<Exams />} />
        ),
      },
      {
        path: PATHS.admin_operations,
        element: (
          <AdminActivityContent
            title={t("nav.operations")}
            children={<Operations />}
          />
        ),
      },
      {
        path: PATHS.admin_operations_new,
        element: (
          <AdminActivityContent
            title={t("operation.addOperation")}
            children={<NewOperation />}
          />
        ),
      },
      {
        path: PATHS.admin_operations_edit,
        element: (
          <AdminActivityContent
            title={t("operation.editOperation")}
            children={<EditOperation />}
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
            children={<Suppliers />}
          />
        ),
      },
      {
        path: "suppliers/new",
        element: (
          <AdminActivityContent
            title={t("supplier.addNewSupplier")}
            children={<NewSupplier />}
          />
        ),
      },
      {
        path: "suppliers/:id/edit",
        element: (
          <AdminActivityContent
            title={t("supplier.editSupplier")}
            children={<EditSupplier />}
          />
        ),
      },
      {
        path: "users",
        element: (
          <AdminActivityContent title={t("nav.users")} children={<Users />} />
        ),
      },
      {
        path: "types/*",
        element: (
          <AdminActivityContent
            title={t("nav.types")}
            children={<TypesRoutes />}
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
