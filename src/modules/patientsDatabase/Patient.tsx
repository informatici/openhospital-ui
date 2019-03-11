import * as React from "react";
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
// import { Link as LinkRouter, LinkProps } from 'react-router-dom';
// import { MaterialNavLinkRouter, MaterialLinkRouter } from '../utils/LinkHelper';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import HospitalIcon from '@material-ui/icons/LocalHospital';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import maleAvatar from "../../assets/images/male.png";
import femaleAvatar from "../../assets/images/female.png";
import CardActionArea from '@material-ui/core/CardActionArea';

import styles from './PatientsDatabase.style';
export interface Props extends WithStyles<typeof styles> { }

interface State {
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  items: any;
}

class Patient extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    // debugger;
    let classes = this.props.classes;
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let patientInfo = this.props.info;
    patientInfo.nickname = patientInfo.name.substring(0, 1).toLowerCase() + '.' + patientInfo.surname.toLowerCase();
    patientInfo.pid = 32040;
    patientInfo.opd = 8937821;
    patientInfo.isChronic = _.sample([true, false]);
    patientInfo.lastDocWhoVisitedHim = {
      name: 'Marcus',
      surname: 'Marcus',
      occupation: _.sample(['Anesthesiologist', 'Cardiologist', 'Dermatologist', 'Gastroenterologist', 'Pneumologist']),
      phone: '555 911 118',
      email: 'doc@hospital.org',
    }

    const item =
      <Grid item xs={12} sm={4}>
        <Paper className={classNames(classes.paper)}>
          <CardActionArea className={classes.cardAction}>
            <Grid container className={classes.patientContainer} justify='center' spacing={24}>
              <Grid item xs={12}>
                <Typography color="inherit" className={classes.patientName}>{patientInfo.name} {patientInfo.surname}</Typography>
                {/* </Grid> */}
                {/* <Grid item xs={12}> */}
                <Typography color="inherit">PID: <b>{patientInfo.pid}</b> - OPD: <b>{patientInfo.opd}</b></Typography>
                {/* </Grid> */}
                {/* <Grid item xs={12}> */}
                <Typography color="inherit">{patientInfo.gender}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Avatar alt="Remy Sharp" src={patientInfo.photo} className={classes.avatar} />
              </Grid>
              <Grid item xs={12} className={classes.infoContainer}>
                <Typography color="inherit"><b>Last admission:</b> 22.01.2019</Typography>
              {/* </Grid> */}
              {/* <Grid item xs={12} className={classes.infoContainer}> */}
                <Typography color="inherit"><b>Reason for visit:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit</Typography>
              {/* </Grid> */}
              {/* <Grid item xs={12} className={classes.infoContainer}> */}
                <Typography color="inherit"><b>Treatment made:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit</Typography>
              </Grid>
              {patientInfo.isChronic &&
                <Grid item xs={12} className={classes.infoContainer}>
                  <Typography color="secondary" className={classes.iconAndText}><HospitalIcon style={{ marginRight: '5px' }} />Chronic patient</Typography>
              </Grid>
              }
            </Grid>
          </CardActionArea>
          <Grid container item className={classes.patientContainer} justify='center' spacing={24}>
            <Grid item xs={12} className={classes.infoContainer}>
              <Typography color="inherit"><b>LAST DOCTOR WHO VISIT THE PATIENT:</b></Typography>
            </Grid>
            <Grid container item className={classes.patientContainer} justify='center' spacing={24}>
              <Grid item xs={12} sm={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Avatar alt="Remy Sharp" src={patientInfo.photo} className={classNames(classes.avatar, 'avatarSmall')} />
                <div style={{ flexDirection: 'column' }}>
                </div>
              </Grid>
              <Grid item xs={12} sm={9} style={{ textAlign: 'left' }}>
                <Typography color="secondary" style={{ fontWeight: 'bold' }}>Dr. {patientInfo.lastDocWhoVisitedHim.surname} {patientInfo.lastDocWhoVisitedHim.name}</Typography>
                <Typography color="inherit">{patientInfo.lastDocWhoVisitedHim.occupation}</Typography>
                <br />
                <Typography color="secondary" className={classes.iconAndText}><PhoneIcon style={{ marginRight: '5px' }} />{patientInfo.lastDocWhoVisitedHim.phone}</Typography>
                <Typography color="secondary" className={classes.iconAndText}><MailIcon style={{ marginRight: '5px' }} />{patientInfo.lastDocWhoVisitedHim.email}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

    return (
      item
    )

  }

}

const styledComponent = withStyles(styles, { withTheme: true })(Patient);
export default styledComponent;