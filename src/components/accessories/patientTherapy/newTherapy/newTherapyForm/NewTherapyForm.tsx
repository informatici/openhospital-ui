import { TextField } from "@material-ui/core";
import React, { FC } from "react";
import DateField from "../../../dateField/DateField";

const NewTherapyForm : FC = (props) => {
    return (
        <>
          <div className="patientTriageForm">
            <form
              className="patientTriageForm__form"
            >
                <div className="row start-sm center-xs">
                    <div className="patientTriageForm__item">
                        <TextField
                            label="medecine"
                            type="text"
                        />
                    </div>
        
                    <div className="patientTriageForm__item">
                        <TextField
                            label="quantity"
                            type="number"
                        />
                    </div>
                </div>

                <div className="row start-sm center-xs">
                    <div className="patientTriageForm__item">
                        <input
                            name="one"
                            type="radio"
                        />One
                        <input
                            name="two"
                            type="radio"
                        />Two
                        <input
                            name="three"
                            type="radio"
                        />Three
                        <input
                            name="four"
                            type="radio"
                        />Four
                    </div>
                    <div className="patientTriageForm__item">
                        
                        <TextField
                            label="days"
                            type="text"
                        />
                    </div>
                    <div className="patientTriageForm__item">
                        
                        <TextField
                            label="days"
                            type="number"
                        />
                    </div>
        
                    <div className="patientTriageForm__item">
                        <TextField
                            label="weeks"
                            type="number"
                        />
                    </div>
                    <div className="patientTriageForm__item">
                        <TextField
                            label="months"
                            type="number"
                        />
                    </div>
                </div>   
    
            </form>
          </div>
        </>
      );
}

export default NewTherapyForm