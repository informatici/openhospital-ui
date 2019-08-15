import React, { Component } from "react";
import _ from "lodash";
import { Link as LinkRouter } from "react-router-dom";

// local imports
import { MaterialButtonRouter } from "../utils/LinkHelper";
import styles from "./styles/PatientExamination.style";
import MUIDataTable from "mui-datatables";

// material imports
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Tooltip from '@material-ui/core/Tooltip';

// constants
import { PATH_NEW_LAB_TEST } from "../../config/constants"

export interface Props extends WithStyles <typeof styles> {}

interface State {
    labelWidth: number;
    error: any;
    isLoaded: boolean;
    items: any;
}

class PatientExamination extends Component <Props, State> {
    state: State = {
        labelWidth: 0,
        error: null,
        isLoaded: false,
        items: [],
    };

    public render() {
        const { classes } = this.props;
        const columns = ["Date", "Examination", "Result", "Notes"];
        const data = [
            ['15/09/2019', "blood exam", "negative", "-"],
            ['12/06/2017', "drugs test exam", "positive", "-"],
            ['15/09/2016', "blood exam", "negative", "-"],
            ['15/09/2014', "fat exam", "positive", "-"],
            ['15/09/2010', "blood exam", "negative", "-"],
            ['15/09/2016', "blood exam", "negative", "-"],
            ['15/09/2014', "fat exam", "positive", "-"],
            ['15/09/2010', "blood exam", "negative", "-"],
            ['15/09/2016', "blood exam", "negative", "-"],
            ['15/09/2014', "fat exam", "positive", "-"],
            ['15/09/2010', "blood exam", "negative", "-"],
        ];
        const options = {
            filterType: 'checkbox',
        };

        return (
            <Grid item xs={12} sm={9} className={classes.patientContent}>
                <Grid item xs={12} className={classes.patientProfileHeader}>
                    <div style={{ flexDirection: "column", textAlign: "left" }}>
                        <Typography color="inherit" className={classes.patientName}>
                            Modotoky Tokai
                        </Typography>
                        <Typography color="inherit" className={classes.patientAddress}>
                            Provenance: <b>District, Village</b>
                        </Typography>
                    </div>
                    <Tooltip title="Prescribe new Exam" interactive>
                        <MaterialButtonRouter component={LinkRouter} to={PATH_NEW_LAB_TEST} variant="outlined" color="inherit" classes={{ root: classes.detailNewExamButton, label: classes.detailButtonLabel }}>
                            New Exam
                        </MaterialButtonRouter>
                    </Tooltip>
                </Grid>
                &emsp;
                <Divider className={classes.divider} />
                &emsp;
                <MUIDataTable
                    title={"EXAMINATION"}
                    data={data}
                    columns={columns}
                    options={options}/>
                &emsp;
            </Grid>
        );
    }
}

const styledComponent = withStyles(styles, { withTheme: true })(PatientExamination);
export default styledComponent;