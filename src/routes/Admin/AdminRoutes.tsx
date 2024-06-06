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
  Diseases,
  Exams,
  Users,
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
import { extractUrlAfterAdmin } from "../../libraries/formatUtils/urlFormatting";

export const AdminRoutes = () => {
  const { t } = useTranslation();
  const routes: { element: ReactNode; path: string }[] = useMemo(
    () => [
      {
        path: extractUrlAfterAdmin(PATHS.admin_wards),
        element: (
          <AdminActivityContent title={t("nav.wards")} children={<Wards />} />
        ),
      },
      {
        path: extractUrlAfterAdmin(PATHS.admin_wards_new),
        element: (
          <AdminActivityContent
            title={t("ward.addWard")}
            children={<NewWard />}
          />
        ),
      },
      {
        path: extractUrlAfterAdmin(PATHS.admin_wards_edit),
        element: (
          <AdminActivityContent
            title={t("ward.editWard")}
            children={<EditWard />}
          />
        ),
      },
      {
        path: extractUrlAfterAdmin(PATHS.admin_diseases),
        element: (
          <AdminActivityContent
            title={t("nav.diseases")}
            children={<Diseases />}
          />
        ),
      },
      {
        path: extractUrlAfterAdmin(PATHS.admin_diseases_new),
        element: (
          <AdminActivityContent
            title={t("disease.addDisease")}
            children={<NewDisease />}
          />
        ),
      },
      {
        path: extractUrlAfterAdmin(PATHS.admin_diseases_edit),
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
        path: extractUrlAfterAdmin(PATHS.admin_operations),
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
        path: "types",
        element: (
          <AdminActivityContent title={t("nav.types")} children={<Wards />} />
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
