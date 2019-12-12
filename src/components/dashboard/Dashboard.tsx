import React from "react";
import { Link as LinkRouter } from "react-router-dom";

// local imports
import { MaterialCardActionAreaRouter } from "../utils/LinkHelper";
import BigSearchIcon from "../utils/icons/svg/BigSearchIcon";
import PlusIcon from "../utils/icons/svg/PlusIcon";
import styles from "./styles/Dashboard.style";
import MaterialPanel from "./MaterialPanel";
import CalendarPanel from "./CalendarPanel";

// material imports
import Typography from "@material-ui/core/Typography";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SvgIcon from "@material-ui/core/SvgIcon";

// constants
import { 
    PATH_PATIENTS_DATABASE,
    PATH_NEW_PATIENT,
} from "../../helpers/constants";

export interface Props extends WithStyles<typeof styles> {}

class Dashboard extends React.Component<Props> {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24} classes={{ container: classes.gridContainer }}>
                    <Grid container justify="center" className={classes.gridPaddingBottom}>
                        <Grid item xs={4}>
                            <Typography variant="inherit" align="center" className={classes.welcomeTitle}>
                                Welcome <b>Mario Rossi</b>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" spacing={24} className={classes.ctaGrid}>
                        <Grid item xs={12} sm={4}>
                            <MaterialCardActionAreaRouter
                                className={classes.ctaPatient}
                                component={LinkRouter}
                                to={PATH_NEW_PATIENT}>
                                <SvgIcon component={PlusIcon} />
                                <Typography className={classes.ctaPatientText} color="inherit" align="center">
                                    <b>REGISTER NEW PATIENT</b>
                                </Typography>
                            </MaterialCardActionAreaRouter>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <MaterialCardActionAreaRouter
                                className={classes.ctaPatient}
                                component={LinkRouter}
                                to={PATH_PATIENTS_DATABASE}>
                                <SvgIcon component={BigSearchIcon} />
                                <Typography className={classes.ctaPatientText} color="inherit" align="center">
                                    <b>SEARCH FOR PATIENTS</b>
                                </Typography>
                            </MaterialCardActionAreaRouter>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" spacing={24} className={classes.gridMaterialsCalendar}>
                        <MaterialPanel/>
                        <CalendarPanel/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styledComponent = withStyles(styles, { withTheme: true })(Dashboard);
export default styledComponent;