import * as React from "react";
import _ from "lodash";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import HospitalIcon from "@material-ui/icons/LocalHospital";
import Avatar from "@material-ui/core/Avatar";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Link as LinkRouter } from "react-router-dom";
import styles from "./PatientsDatabase.style";
import { MaterialCardActionAreaRouter } from "../utils/LinkHelper";
import { number } from 'prop-types';
import { Patient } from 'generate';
export interface Props extends WithStyles<typeof styles> { }

interface State {
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  items: any[];

}

interface IProps {
  info: Patient;
}


class Patients extends React.Component<IProps> {




  render() {
    // debugger;
    const { classes } = this.props;

    let patientInfo = this.props.info;

    patientInfo.isChronic = _.sample([true, false]);
    patientInfo.lastDocWhoVisitedHim = {
      name: "Marcus",
      surname: "Marcus",
      occupation: _.sample(["Anesthesiologist", "Cardiologist", "Dermatologist", "Gastroenterologist", "Pneumologist"]),
      phone: "555 911 118",
      email: "doc@hospital.org",
    };

    const item = (
      <Grid item xs={12} sm={4}>
        <Paper className={classes.paper}>
          <MaterialCardActionAreaRouter
            className={classes.cardAction}
            component={LinkRouter}
            to={"/PatientDatabase/PatientDetails/" + this.props.info.code}
          >
            <Grid container className={classes.patientContainer} justify="center" spacing={24}>
              <Grid item xs={12}>
                <Typography color="inherit" className={classes.patientName}>
                  {patientInfo.firstName} {patientInfo.secondName}
                </Typography>
                {/* </Grid> */}
                {/* <Grid item xs={12}> */}
                <Typography color="inherit">
                  PatientID: <b>{patientInfo.code}</b>
                </Typography>
                <Typography color="inherit">
                  Age: <b>{patientInfo.age}</b> &nbsp; Sex:<b>{patientInfo.sex}</b>
                </Typography>

                {/* </Grid> */}
                {/* <Grid item xs={12}> */}
                <Typography color="inherit">{patientInfo.gender}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Avatar alt="Remy Sharp" src={patientInfo.photo} className={classes.avatar} />
              </Grid>
              <Grid item xs={12} className={classes.infoContainer}>
                <Typography color="inherit">
                  <b>Last admission:</b> 12.06.18
                  </Typography>
                {/* </Grid> */}
                {/* <Grid item xs={12} className={classes.infoContainer}> */}
                <Typography color="inherit">
                  <b>Reason for visit:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </Typography>
                {/* </Grid> */}
                {/* <Grid item xs={12} className={classes.infoContainer}> */}
                <Typography color="inherit">
                  <b>Treatment made:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </Typography>
              </Grid>
              {patientInfo.isChronic && (
                <Grid item xs={12} className={classes.infoContainer}>
                  <Typography color="secondary" className={classes.iconAndText}>
                    <HospitalIcon style={{ marginRight: "5px" }} />
                    Chronic patient
                    </Typography>
                </Grid>
              )}
            </Grid>
          </MaterialCardActionAreaRouter>
          <MaterialCardActionAreaRouter
            className={classes.cardAction}
            component={LinkRouter}
            to="/colleagues/ColleagueDetails"
          >
            <Grid container item className={classes.patientContainer} justify="center" spacing={24}>
              <Grid item xs={12} className={classes.infoContainer}>
                <Typography color="inherit">
                  <b>LAST DOCTOR WHO VISIT THE PATIENT:</b>
                </Typography>
              </Grid>
              <Grid container item className={classes.patientContainer} justify="center" spacing={24}>
                <Grid item xs={12} sm={3} style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={patientInfo.photo}
                    className={classNames(classes.avatar, "avatarSmall")}
                  />
                  <div style={{ flexDirection: "column" }} />
                </Grid>
                <Grid item xs={12} sm={9} style={{ textAlign: "left" }}>
                  <Typography color="secondary" style={{ fontWeight: "bold" }}>
                    Dr. {patientInfo.lastDocWhoVisitedHim.surname} {patientInfo.lastDocWhoVisitedHim.name}
                  </Typography>
                  <Typography color="inherit">{patientInfo.lastDocWhoVisitedHim.occupation}</Typography>
                  <br />
                  <Typography color="secondary" className={classes.iconAndText}>
                    <PhoneIcon style={{ marginRight: "5px" }} />
                    {patientInfo.lastDocWhoVisitedHim.phone}
                  </Typography>
                  <Typography color="secondary" className={classes.iconAndText}>
                    <MailIcon style={{ marginRight: "5px" }} />
                    {patientInfo.lastDocWhoVisitedHim.email}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </MaterialCardActionAreaRouter>
        </Paper>
      </Grid>
    );

    return item;
  }
}

const styledComponent = withStyles(styles, { withTheme: true })(Patients);
export default styledComponent;
