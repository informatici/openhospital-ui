import React, { FunctionComponent } from "react";
import SelectField from "../../selectField/SelectField";
import TextField from "../../textField/TextField";

const TherapyForm: React.FunctionComponent = (props) => {
  return (
    <>
      <div className="patientTherapyForm">
        <form className="patientTherapyForm__form">
          <div className="row start-sm center-xs">
            <div className="patientTherapyForm__item">
              <SelectField
                fieldName="medecine"
                fieldValue={"medecine"}
                label={"medecine"}
                isValid={true}
                errorText={""}
                onBlur={() => null}
                options={[]}
              />
            </div>
            <div className="patientTherapyForm__item">
              <TextField
                field={Object({})}
                theme="regular"
                label={"quantity"}
                isValid={true}
                errorText={""}
                onBlur={() => {}}
                type="number"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TherapyForm;
