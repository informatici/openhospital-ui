import React, { Component } from "react";
import { Link as LinkRouter } from "react-router-dom";

// local imports
import styles from './styles/HealthInfoBar.style';
import { MaterialButtonRouter } from "../utils/LinkHelper";

// material imports
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

export interface Props extends WithStyles<typeof styles> { }

class HealthInfoBar extends Component<Props>{

	render() {
		const { classes, patient } = this.props;
		return(
			<Grid item xs={12} sm={3} className={classes.sidebar}>
                <Avatar alt="Remy Sharp" src={""} className={classes.avatar}>
                    <AddPhotoIcon />
                </Avatar>
                <Typography color="inherit" className={classes.avatarTitle}>
                    HEALTH INFORMATION
                </Typography>
                <Typography color="inherit" className={classes.patientIdTitle}>
                    PATIENT ID
                </Typography>
                <Typography color="inherit" className={classes.patientIdNumber}>
                    {patient.id}
                </Typography>
                <Typography color="inherit" className={classes.bloodGroup}>
                    Blood Group
                </Typography>
                <Typography color="inherit" className={classes.bloodType}>
                    {patient.bloodType}
                </Typography>
                <Typography color="inherit" className={classes.notes}>
                    Next Kin:
                </Typography>
                <Typography color="inherit" className={classes.notesDetails}>
                    {patient.nextKin}
                </Typography>
                &emsp;
                <Typography color="inherit" className={classes.notes}>
                    Notes:
                </Typography>
                <Typography color="inherit" className={classes.notesDetails}>
                    {patient.notes}
                </Typography>
                &emsp;
                <Divider className={classes.divider} />
                &emsp;
                <Typography color="inherit" className={classes.admissionDate}>
                    Last Admission:&nbsp;<b>{patient.lastAdmission}</b>
                </Typography>
                <Typography color="inherit" className={classes.reasonVisit}>
                    Reason for visit:
                </Typography>
                <Typography color="inherit" className={classes.reasonVisitType}>
                    {patient.reasonOfVisit}
                </Typography>
                <Typography color="inherit" className={classes.treatment}>
                    Treatment made:
                </Typography>
                <Typography color="inherit" className={classes.treatmentType}>
                    {patient.treatment}
                </Typography>
                <MaterialButtonRouter
                    style={{ marginTop: 30 }}
                    component={LinkRouter}
                    to="/"
                    variant="outlined"
                    color="inherit"
                    classes={classes.detailButtonLabelPrint}>
                    Print health information
                </MaterialButtonRouter>
            </Grid>
		)
	}
}

const styledComponent = withStyles(styles, { withTheme: true })(HealthInfoBar);
export default styledComponent;