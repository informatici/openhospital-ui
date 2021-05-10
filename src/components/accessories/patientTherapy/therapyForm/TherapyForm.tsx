import React, { ChangeEvent, FC } from "react";
import SmallButton from "../../smallButton/SmallButton";
import TextButton from "../../textButton/TextButton";
import TextField from "../../textField/TextField";
import SmsIcon from "@material-ui/icons/Sms";
import PriorityHigh from "@material-ui/icons/PriorityHigh";
import DateField from "../../dateField/DateField";
import "./styles.scss";
import SelectField from "../../selectField/SelectField";
import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";

const TherapyForm: FC = (props) => {
  const dummyField = {
    name: "dummyName",
    isValid: false,
    errorText: "",
    field: Object({}),
    onChange: (e: ChangeEvent<any>) => console.log(e),
    onBlur: (e: ChangeEvent<any>) => console.log(e),
  };
  const options = [
    { label: "one", value: "One" },
    { label: "two", value: "Two" },
    { label: "three", value: "Three" },
    { label: "four", value: "Four" },
  ];
  const optionsMed = [
    { label: "med1", value: "Medecine 1" },
    { label: "med2", value: "Medecine 2" },
    { label: "med3", value: "Medecine 3" },
    { label: "med4", value: "Medecone 4" },
  ];

  return (
    <>
      <div className="patientTherapyForm">
        <form className="patientTherapyForm__form">
          <div className="row start-sm center-xs">
            <div className="patientTherapyForm__item medecine">
              <SelectField
                {...dummyField}
                fieldName="Medecine"
                fieldValue={""}
                label="Medecine"
                options={optionsMed}
              />
            </div>
            <div className="patientTherapyForm__item">
              <TextField
                {...dummyField}
                theme="regular"
                type="number"
                label="quantity"
              />
            </div>
          </div>
          <div className="row start-sm center-xs bottom-sm">
            <div className="patientTherapyForm__item">
              <SelectField
                {...dummyField}
                fieldName="frequency"
                fieldValue={""}
                label="Frequency"
                options={options}
              />
            </div>

            <div className="patientTherapyForm__item">
              <span>Duration</span>
              <TextField
                {...dummyField}
                theme="regular"
                type="number"
                label="days"
              />
            </div>
            <div className="patientTherapyForm__item">
              <TextField
                {...dummyField}
                theme="regular"
                type="number"
                label="weeks"
              />
            </div>
            <div className="patientTherapyForm__item">
              <TextField
                {...dummyField}
                theme="regular"
                type="number"
                label="months"
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientTherapyForm__item label-period">
              Frequency In Period:
            </div>
            <div id="frequency" className="patientTherapyForm__item">
              <TextField
                {...dummyField}
                theme="regular"
                type="number"
                label="Frequency in Days"
              />
            </div>
            <div className="patientTherapyForm__item">
              <DateField
                fieldName="opdDate"
                fieldValue={""}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={false}
                errorText={""}
                label="Start"
                onChange={() => console.log("date changed...")}
              />
            </div>
            <div className="patientTherapyForm__item">
              <DateField
                fieldName="opdDate"
                fieldValue={""}
                disableFuture={true}
                theme="regular"
                format="dd/MM/yyyy"
                isValid={false}
                errorText={""}
                label={"End"}
                onChange={() => console.log("date changed...")}
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <FormGroup row className="label-sms">
              <FormControlLabel
                control={<Checkbox name="checkedImp" />}
                label={
                  <span>
                    Important: send a notification <PriorityHigh />
                  </span>
                }
              />
              <FormControlLabel
                control={<Checkbox name="checkedSMS" />}
                label={
                  <span>
                    Send SMS <SmsIcon />
                  </span>
                }
              />
            </FormGroup>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientTherapyForm__item fullWith">
              <TextField
                multiline={true}
                {...dummyField}
                theme="regular"
                type="text"
                label="Note"
              />
            </div>
          </div>
          <div className="patientTherapyForm__buttonSet">
            <div className="submit_button">
              <SmallButton type="submit" disabled={true}>
                SAVE THERAPY
              </SmallButton>
            </div>
            <div className="reset_button">
              <TextButton onClick={() => console.log("submitting ...")}>
                DISCARD
              </TextButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TherapyForm;
