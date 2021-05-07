import React, { ChangeEvent, FC } from "react";
import SmallButton from "../../smallButton/SmallButton";
import TextButton from "../../textButton/TextButton";
import TextField from "../../textField/TextField";
import SmsIcon from "@material-ui/icons/Sms";
import PriorityHigh from "@material-ui/icons/PriorityHigh";
import DateField from "../../dateField/DateField";
import "./styles.scss";

const TherapyForm: FC = (props) => {
  const dummyField = {
    name: "dummyName",
    isValid: false,
    errorText: "",
    field: Object({}),
    onChange: (e: ChangeEvent<any>) => console.log(e),
    onBlur: (e: ChangeEvent<any>) => console.log(e),
  };
  return (
    <>
      <div className="patientTherapyForm">
        <form className="patientTherapyForm__form">
          <div className="row start-sm center-xs">
            <div className="medecine patientTherapyForm__item">
              <TextField
                {...dummyField}
                theme="regular"
                type="text"
                label="Medecine"
              />
            </div>
            <div className="quantity patientTherapyForm__item">
              <TextField
                {...dummyField}
                theme="regular"
                type="number"
                label="quantity"
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientTherapyForm__item">
              <h3> Frequency: </h3>
              <input type="radio" name="frequency" value="one" />
              One
              <input type="radio" name="frequency" value="two" /> Two
              <input type="radio" name="frequency" value="three" /> Three
              <input type="radio" name="frequency" value="four" /> Four
            </div>
            <h3>Duration: </h3>
            <div className="patientTherapyForm__item duration">
              <TextField
                {...dummyField}
                theme="regular"
                type="number"
                label="days"
              />
            </div>
            <div className="patientTherapyForm__item duration">
              <TextField
                {...dummyField}
                theme="regular"
                type="number"
                label="weeks"
              />
            </div>
            <div className="patientTherapyForm__item duration">
              <TextField
                {...dummyField}
                theme="regular"
                type="number"
                label="months"
              />
            </div>
          </div>
          <div className="row start-sm center-xs">
            <div className="patientTherapyForm__item fif">
              <div className="row start-sm center-xs">
                <div className="patientTherapyForm__item fif-lbl">
                  <label htmlFor="">Frequency in period:</label>
                </div>
                <div className="patientTherapyForm__item">
                  <TextField
                    {...dummyField}
                    theme="regular"
                    type="number"
                    label="Every"
                  />
                </div>
                <label htmlFor="" className="day-label">
                  Days
                </label>
              </div>
            </div>
            <div className="patientTherapyForm__item fif">
              <div className="row start-sm center-xs">
                <div className="patientTherapyForm__item fif">
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
                <div className="patientTherapyForm__item fif">
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
            </div>
          </div>

          <div className="row start-sm center-xs">
            <div className="patientTherapyForm__item label">
              <label htmlFor="">Notify & SMS</label>
            </div>
            <div className="patientTherapyForm__item checkb">
              <PriorityHigh fontSize="default" /> &nbsp; &nbsp;
              <input type="checkbox" name="checkboxImp" id="imp" />
              <label htmlFor="imp">Important</label>
            </div>
            <div className="patientTherapyForm__item checkb">
              <SmsIcon color="secondary" fontSize="default" /> &nbsp; &nbsp;
              <input type="checkbox" name="checkboxSms" id="sms" />
              <label htmlFor="sms" className="check">
                SMS
              </label>
            </div>
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
