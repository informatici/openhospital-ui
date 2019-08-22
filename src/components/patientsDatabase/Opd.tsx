import React, { Component } from "react";
import _ from "lodash";
import { Link as LinkRouter } from "react-router-dom";

// local imports
import { MaterialButtonRouter } from "../utils/LinkHelper";
import styles from "./styles/Opd.style";
import MUIDataTable from "mui-datatables";

// material imports
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

// constants
import { PATH_NEW_OPD } from "../../helpers/constants"

export interface Props extends WithStyles < typeof styles > {}

interface State {
    InputLabelRef: number;
    labelWidth: number;
    error: any;
    isLoaded: boolean;
    items: any;
}

class PatientOpd extends Component <Props, State> {
    state: State = {
        labelWidth: 0,
        error: null,
        isLoaded: false,
        items: [],
        InputLabelRef: 0
    }

    public render() {
        const { classes, patient } = this.props;
        const columns = ["Date", "Disease", "Disease Type", "Status"];
        const data = [
            ["15/09/2019", "Meningitis", "Priority infectious deseases", "new"],
            ["15/09/2019", "Meningitis", "Priority infectious deseases", "new"],
            ["15/09/2019", "Meningitis", "Priority infectious deseases", "new"],
            ["15/09/2019", "Meningitis", "Priority infectious deseases", "new"],
            ["15/09/2019", "Meningitis", "Priority infectious deseases", "new"],
        ];
        const options = {
            filterType: 'checkbox',
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
                    <MaterialButtonRouter 
                        component={LinkRouter} 
                        to={PATH_NEW_OPD.replace(':patientId', patient.id)} 
                        variant="outlined" 
                        color="inherit" 
                        classes={{ root: classes.opdButton }}>
                        Create New OPD
                    </MaterialButtonRouter>
                </Grid>
                &emsp;
                <Divider className={classes.divider} />
                &emsp;
                <MUIDataTable
                    title={"OPD HISTORY"}
                    data={data}
                    columns={columns}
                    options={options}/>
            </Grid>
        );
    }
}

const styledComponent = withStyles(styles, { withTheme: true })(PatientOpd);
export default styledComponent;