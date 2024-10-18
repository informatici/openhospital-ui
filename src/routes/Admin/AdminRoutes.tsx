import { EditHospital } from "components/accessories/admin/hospital";
import React, { ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router";
import {
  Diseases,
  EditDisease,
  NewDisease,
} from "../../components/accessories/admin/diseases";
import {
  EditExam,
  Exams,
  NewExam,
} from "../../components/accessories/admin/exams";
import {
  EditOperation,
  NewOperation,
  Operations,
} from "../../components/accessories/admin/operations";
import {
  EditSupplier,
  NewSupplier,
  Suppliers,
} from "../../components/accessories/admin/suppliers";
import {
  EditGroup,
  NewGroup,
  NewUser,
  Users,
} from "../../components/accessories/admin/users";
import {
  EditVaccine,
  NewVaccine,
  Vaccines,
} from "../../components/accessories/admin/vaccines";
import {
  EditWard,
  NewWard,
  Wards,
} from "../../components/accessories/admin/wards";
import AdminActivity, {
  AdminActivityContent,
} from "../../components/activities/adminActivity";
import NotFound from "../../components/activities/notFound/NotFound";
import { PATHS } from "../../consts";
import TypesRoutes from "./TypesRoutes";

export const AdminRoutes = () => {
  const { t } = useTranslation();
  const getPath = (from: string) => from.replace(`${PATHS.admin}/`, "");
  const routes: { element: ReactNode; path: string }[] = useMemo(
    () => [
      {
        path: getPath(PATHS.admin_wards),
        element: (
          <AdminActivityContent title={t("nav.wards")} children={<Wards />} />
        ),
      },
      {
        path: getPath(PATHS.admin_wards_new),
        element: (
          <AdminActivityContent
            title={t("ward.addWard")}
            children={<NewWard />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_wards_edit),
        element: (
          <AdminActivityContent
            title={t("ward.editWard")}
            children={<EditWard />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_diseases),
        element: (
          <AdminActivityContent
            title={t("nav.diseases")}
            children={<Diseases />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_diseases_new),
        element: (
          <AdminActivityContent
            title={t("disease.addDisease")}
            children={<NewDisease />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_diseases_edit),
        element: (
          <AdminActivityContent
            title={t("disease.editDisease")}
            children={<EditDisease />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_exams),
        element: (
          <AdminActivityContent title={t("nav.exams")} children={<Exams />} />
        ),
      },
      {
        path: getPath(PATHS.admin_exams_new),
        element: (
          <AdminActivityContent
            title={t("exam.addExam")}
            children={<NewExam />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_exams_edit),
        element: (
          <AdminActivityContent
            title={t("exam.editExam")}
            children={<EditExam />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_operations),
        element: (
          <AdminActivityContent
            title={t("nav.operations")}
            children={<Operations />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_operations_new),
        element: (
          <AdminActivityContent
            title={t("operation.addOperation")}
            children={<NewOperation />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_operations_edit),
        element: (
          <AdminActivityContent
            title={t("operation.editOperation")}
            children={<EditOperation />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_vaccines),
        element: (
          <AdminActivityContent
            title={t("nav.vaccines")}
            children={<Vaccines />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_vaccines_new),
        element: (
          <AdminActivityContent
            title={t("vaccine.addVaccine")}
            children={<NewVaccine />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_vaccines_edit),
        element: (
          <AdminActivityContent
            title={t("vaccine.editVaccine")}
            children={<EditVaccine />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_suppliers),
        element: (
          <AdminActivityContent
            title={t("nav.suppliers")}
            children={<Suppliers />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_suppliers_new),
        element: (
          <AdminActivityContent
            title={t("supplier.addNewSupplier")}
            children={<NewSupplier />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_suppliers_edit),
        element: (
          <AdminActivityContent
            title={t("supplier.editSupplier")}
            children={<EditSupplier />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_users),
        element: (
          <AdminActivityContent title={t("nav.users")} children={<Users />} />
        ),
      },
      {
        path: getPath(PATHS.admin_users_new),
        element: (
          <AdminActivityContent
            title={t("user.addUser")}
            children={<NewUser />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_usergroups_new),
        element: (
          <AdminActivityContent
            title={t("user.addGroup")}
            children={<NewGroup />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_usergroups_edit),
        element: (
          <AdminActivityContent
            title={t("user.editGroup")}
            children={<EditGroup />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_types),
        element: (
          <AdminActivityContent
            title={t("nav.types")}
            children={<TypesRoutes />}
          />
        ),
      },
      {
        path: getPath(PATHS.admin_hospital_edit),
        element: (
          <AdminActivityContent
            title={t("hospital.editHospital")}
            children={<EditHospital />}
          />
        ),
      },
    ],
    [t]
  );
  return (
    <Routes>
      <Route element={<AdminActivity />}>
        <Route
          index
          element={<Navigate to={getPath(PATHS.admin_wards)} replace />}
        />
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
