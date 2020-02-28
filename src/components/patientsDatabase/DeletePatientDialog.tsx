import React, { FunctionComponent } from "react";

// local imports
import styles from "./styles/DeletePatientDialog.style";
import classNames from "classnames";

// material imports
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

interface Props extends WithStyles<typeof styles> {
  isOpen: boolean;
  dismissDialog: () => void;
}

const FDeletePatientDialog: FunctionComponent<Props> = ({ classes, isOpen, dismissDialog }) => {
  return (
    <div>
      <Dialog open={isOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"ENTER THE PATIENT'S CODE YOU WANT TO DELETE WEEE"}</DialogTitle>
        <DialogContent>
          &nbsp;
          <DialogContentText style={{ textAlign: "center" }} id="alert-dialog-description">
            <b>Attention!</b> This action will completely erase patient data!
          </DialogContentText>
          &nbsp;
          <Grid className={classes.deleteInputField}>
            <TextField
              required
              id="outlined-required"
              label="Patient ID"
              className={classNames(classes.formDeleteField, classes.cssOutlinedInput)}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={dismissDialog} color="secondary">
            <b>EXIT</b>
          </Button>
          <Button onClick={dismissDialog} color="secondary">
            <b>DELETE</b>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const styledComponent = withStyles(styles, { withTheme: true })(FDeletePatientDialog);
export default styledComponent;
