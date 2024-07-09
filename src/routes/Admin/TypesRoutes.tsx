import React, { ReactNode } from "react";
import VaccineTypes, {
  EditVaccineType,
  NewVaccineType,
} from "../../components/accessories/admin/types/components/vaccines";
import { Route, Routes } from "react-router";
import NotFound from "../../components/activities/notFound/NotFound";
import Empty from "../../components/accessories/admin/types/Empty";
import TypesAdmin from "../../components/accessories/admin/types/TypesAdmin";
import ExamTypes, {
  EditExamType,
  NewExamType,
} from "../../components/accessories/admin/types/components/exams";
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
import DischargeTypes, {
  EditDischargeType,
  NewDischargeType,
} from "../../components/accessories/admin/types/components/discharges";
import DeliveryTypes, {
  EditDeliveryType,
  NewDeliveryType,
} from "../../components/accessories/admin/types/components/deliveries";
import MedicalTypes, {
  EditMedicalType,
  NewMedicalType,
} from "../../components/accessories/admin/types/components/medicals";
import PregnantTreatmentType, {
  EditPregnantTreatmentType,
  NewPregnantTreatmentType,
} from "../../components/accessories/admin/types/components/pregnanttreatmenttypes";
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
      path: "exams",
      element: <ExamTypes />,
    },
    {
      path: "exams/new",
      element: <NewExamType />,
    },
    {
      path: "exams/:code/edit",
      element: <EditExamType />,
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
      path: "discharges",
      element: <DischargeTypes />,
    },
    {
      path: "discharges/new",
      element: <NewDischargeType />,
    },
    {
      path: "discharges/:code/edit",
      element: <EditDischargeType />,
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
      path: "medicals",
      element: <MedicalTypes />,
    },
    {
      path: "medicals/new",
      element: <NewMedicalType />,
    },
    {
      path: "medicals/:code/edit",
      element: <EditMedicalType />,
    },
    {
      path: "pregnanttreatmenttypes",
      element: <PregnantTreatmentType />,
    },
    {
      path: "pregnanttreatmenttypes/new",
      element: <NewPregnantTreatmentType />,
    },
    {
      path: "pregnanttreatmenttypes/:code/edit",
      element: <EditPregnantTreatmentType />,
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
