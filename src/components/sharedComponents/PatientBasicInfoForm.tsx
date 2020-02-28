import React, { FunctionComponent } from "react";

// local imports
import styles from "./styles/PatientBasicInfoForm.style";
import classNames from "classnames";

// material imports
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export interface Props extends WithStyles<typeof styles> {}

const PatientBasicInfoForm: FunctionComponent<Props> = ({ classes, children }) => {
  const basicInfoTextFields = [
    { id: "patientId", label: "Patient ID (PID)" },
    { id: "outpatientNumber", label: "Outpatient Number (OPD)" },
    { id: "inpatientNumber", label: "Inpatient Number (IPD)" },
  ];

  return (
    <div>
      <form>
        <Grid container item spacing={24}>
          {basicInfoTextFields.map(field => (
            <Grid item xs={12} sm={3}>
              <TextField
                id={field.id}
                label={field.label}
                type="text"
                className={classNames(classes.formField, classes.cssOutlinedInput)}
                InputLabelProps={{
                  classes: {
                    root: classes.formFieldInputLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.cssOutlinedInput,
                  },
                }}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          ))}
          {children}
        </Grid>
      </form>
    </div>
  );
};

const styledComponent = withStyles(styles, { withTheme: true })(PatientBasicInfoForm);
export default styledComponent;
