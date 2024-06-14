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
import DiseaseTypes, {
  EditDiseaseType,
  NewDiseaseType,
} from "../../components/accessories/admin/types/components/diseases";
import OperationTypes, {
  EditOperationType,
  NewOperationType,
} from "../../components/accessories/admin/types/components/operations";
import DeliveryTypes, {
  EditDeliveryType,
  NewDeliveryType,
} from "../../components/accessories/admin/types/components/deliveries";
import DeliveryResultType, {
  EditDeliveryResultType,
  NewDeliveryResultType,
} from "../../components/accessories/admin/types/components/deliveryresulttypes";

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
    {
      path: "diseases",
      element: <DiseaseTypes />,
    },
    {
      path: "diseases/new",
      element: <NewDiseaseType />,
    },
    {
      path: "diseases/:code/edit",
      element: <EditDiseaseType />,
    },
    {
      path: "operations",
      element: <OperationTypes />,
    },
    {
      path: "operations/new",
      element: <NewOperationType />,
    },
    {
      path: "operations/:code/edit",
      element: <EditOperationType />,
    },
    {
      path: "deliveries",
      element: <DeliveryTypes />,
    },
    {
      path: "deliveries/new",
      element: <NewDeliveryType />,
    },
    {
      path: "deliveries/:code/edit",
      element: <EditDeliveryType />,
    },
    {
      path: "deliveryresulttypes",
      element: <DeliveryResultType />,
    },
    {
      path: "deliveryresulttypes/new",
      element: <NewDeliveryResultType />,
    },
    {
      path: "deliveryresulttypes/:code/edit",
      element: <EditDeliveryResultType />,
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
