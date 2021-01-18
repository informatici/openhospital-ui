import React, { FunctionComponent } from 'react';
import PatientTriageForm from './patientTriageForm/PatientTriageForm';
import PatientTriageTable from './patientTriageTable/PatientTriageTable';
import { initialFields } from "./consts";
import "./styles.scss";
import Button from '../button/Button';

const PatientTriage: FunctionComponent = () => {

  const onSubmit = (triage: any) => {
    console.log(triage);
  };

  return (
    <div className="patientTriage">
      <PatientTriageForm
        fields={initialFields}
        onSubmit={onSubmit}
        submitButtonLabel="Save triage"
        resetButtonLabel="Discard"
        isLoading={false}
      />
      <PatientTriageTable />
      <div className="printTriage__button">
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          <div className="printTriage__button__label">Print triage</div>
        </Button>
      </div>
    </div>
  );
}

export default PatientTriage;