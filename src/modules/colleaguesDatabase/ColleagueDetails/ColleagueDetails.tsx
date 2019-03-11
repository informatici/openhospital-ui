import * as React from "react";
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link as LinkRouter, LinkProps } from 'react-router-dom';
import { MaterialNavLinkRouter, MaterialLinkRouter } from '../../utils/LinkHelper';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ChatIcon from '@material-ui/icons/Sms';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import maleAvatar from "../../../assets/images/male.png";
import femaleAvatar from '../../../assets/images/female.png';
// import Colleague from './Colleague';

import styles from './ColleagueDetails.style';
export interface Props extends WithStyles<typeof styles> { }

interface State {
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  items: any;
}

class ColleagueDetails extends React.Component<Props, State> {

  state: State = {
    labelWidth: 0,
    error: null,
    isLoaded: false,
    items: [],
  };


  public render() {
    const { classes } = this.props;
    // const { items, isLoaded, error } = this.state;

    return (
      <div className={classes.root}>
        <Grid container className={classes.gridContainer} justify='center' spacing={24}>
          <Grid container item spacing={24}>
            <Grid item xs={12}>
              <Breadcrumbs aria-label="Breadcrumb" className={classes.breadCrumb}>
                <MaterialLinkRouter color="secondary" component={LinkRouter} to="/dashboard">
                  Home
              </MaterialLinkRouter>
                <MaterialLinkRouter color="secondary" component={LinkRouter} to="/colleagues">
                  <Typography color="inherit">Your colleagues</Typography>
                </MaterialLinkRouter>
                <Typography color="inherit">Colleague details</Typography>
              </Breadcrumbs>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="inherit" className={classes.colleaguesTitle}>
                COLLEAGUE DETAILS
              </Typography>
            </Grid>
          </Grid>
          <Grid container item justify='center' spacing={24}>
            <Paper className={classes.paperHeader}>
              <Grid item xs={12} className={classes.colleagueProfileHeader}>
                <Avatar alt="Remy Sharp" src={_.sample([maleAvatar, femaleAvatar])} className={classes.avatar} />
                <div style={{ flexDirection: 'column', textAlign: 'left' }}>
                  <Typography color="inherit" className={classes.colleagueName}>Dr. Marcus Gross</Typography>
                  <Typography color="inherit" className={classes.colleagueProfession}>Profession: <b>Pneumologist</b></Typography>
                </div>
                <Button variant="outlined" color="inherit" classes={{ root: classes.chatButton, label: classes.chatButtonLabel }}>
                  <ChatIcon className={classes.buttonIcon} />
                  Chat with doctor
                    </Button>
              </Grid>
            </Paper>
            <Grid container item justify='center' spacing={24}>
              <Grid item xs={12} sm={3} className={classes.sidebar}>
                <Typography color="inherit" className={classes.contacts}>CONTACTS</Typography>
                <Divider className={classes.divider}/>
              </Grid>
              <Grid item xs={12} sm={9} className={classes.colleagueContent}>
                amici
          </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}


const styledComponent = withStyles(styles, { withTheme: true })(ColleagueDetails);
export default styledComponent;