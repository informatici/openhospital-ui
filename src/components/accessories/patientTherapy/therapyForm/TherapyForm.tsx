import React, { ChangeEvent, FC } from "react";
import SelectField from "../../selectField/SelectField";
import TextField from "../../textField/TextField";
const TherapyForm: FC = (props) => {
  const dummyField = {
    value: "dummyValue",
    name: "dummyName",
    onChange: (e: ChangeEvent<any>) => console.log(e),
    onBlur: (e: ChangeEvent<any>) => console.log(e),
  };
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
                label={dummyField.name}
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
