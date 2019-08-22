import React, { Component } from "react";
import _ from "lodash";
import { Link as LinkRouter } from "react-router-dom";

// local imports
import { MaterialButtonRouter } from "../utils/LinkHelper";
import styles from "./styles/PatientVaccination.style";
import MUIDataTable from "mui-datatables";

// material imports
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Tooltip from '@material-ui/core/Tooltip';

// constants
import { PATH_PATIENT_NEW_VACCINATION } from "../../helpers/constants"

export interface Props extends WithStyles <typeof styles> {}

interface State {
    labelWidth: number;
    error: any;
    isLoaded: boolean;
    items: any;
}

class PatientVaccine extends React.Component <Props, State> {
    state: State = {
        labelWidth: 0,
        error: null,
        isLoaded: false,
        items: [],
    };

    public render() {
        const { classes, patient } = this.props;
        const columns = ["Date", "Vaccine", "Vaccine Type"];
        const data = [
            ['15/09/2019', "BCG", "CHILD"],
            ['12/06/2017', "POLIO", "CHILD"],
            ['15/09/2016', "MEASLES", "NO PREGNANT"],
            ['15/09/2014', "VACCINE DOSE 1", "PREGNANT"],
            ['15/09/2010', "BCG", "CHILD"],
            ['15/09/2019', "BCG", "CHILD"],
            ['12/06/2017', "POLIO", "CHILD"],
            ['15/09/2016', "MEASLES", "NO PREGNANT"],
            ['15/09/2014', "VACCINE DOSE 1", "PREGNANT"],
            ['15/09/2010', "BCG", "CHILD"],
            ['15/09/2019', "BCG", "CHILD"],
            ['12/06/2017', "POLIO", "CHILD"],
            ['15/09/2010', "BCG", "CHILD"],
            ['15/09/2019', "BCG", "CHILD"],
            ['12/06/2017', "POLIO", "CHILD"],
            ['15/09/2016', "MEASLES", "NO PREGNANT"],
            ['15/09/2014', "VACCINE DOSE 1", "PREGNANT"],
            ['15/09/2010', "BCG", "CHILD"],
        ];
        const options = {
            filterType: 'dropdown',
        };

        return (
            <Grid item xs={12} sm={9} className={classes.patientContent}>
                <Grid item xs={12} className={classes.patientProfileHeader}>
                    <div style={{ flexDirection: "column", textAlign: "left" }}>
                        <Typography color="inherit" className={classes.patientName}>
                            {patient.firstName} {patient.secondName}
                        </Typography>
                        <Typography color="inherit" className={classes.patientAddress}>
                            Address: <b>{patient.address}</b>
                        </Typography>
                    </div>
                    <Tooltip title="Prescribe new Vaccine" interactive>
                        <MaterialButtonRouter component={LinkRouter} to={PATH_PATIENT_NEW_VACCINATION} variant="outlined" color="inherit" classes={{ root: classes.detailNewVaccineButton, label: classes.detailButtonLabel }}>
                            New Vaccine
                        </MaterialButtonRouter>
                    </Tooltip>
                </Grid>
                &emsp;
                <Divider className={classes.divider} />
                &emsp;
                <MUIDataTable
                    className={classes.patientExamination}
                    title={"VACCINE"}
                    data={data}
                    columns={columns}
                    options={options}/>
            </Grid>
        );
    }
}

const styledComponent = withStyles(styles, { withTheme: true })(PatientVaccine);
export default styledComponent;