import { TextField } from "@material-ui/core";
import React, { FC } from "react";

const TherapyForm : FC = (props) => {
    return (
        <>
          <div className="patientTherapyForm">
            <form
              className="patientTherapyForm__form"
            >
                <div className="row start-sm center-xs">
                
        
                    <div className="patientTherapyForm__item">
                        <TextField
                            label="quantity"
                            type="number"
                        />
                    </div>
                </div>

                <div className="row start-sm center-xs">
                    <div className="patientTherapyForm__item">
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
                    <div className="patientTherapyForm__item">
                        
                        <TextField
                            label="days"
                            type="text"
                        />
                    </div>
                    <div className="patientTherapyForm__item">
                        
                        <TextField
                            label="days"
                            type="number"
                        />
                    </div>
        
                    <div className="patientTherapyForm__item">
                        <TextField
                            label="weeks"
                            type="number"
                        />
                    </div>
                    <div className="patientTherapyForm__item">
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

export default TherapyForm