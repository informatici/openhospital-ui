import * as React from "react";
import ReactDOM from 'react-dom';
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
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import maleAvatar from "../../assets/images/male.png";
import femaleAvatar from "../../assets/images/female.png";

import styles from './ColleaguesDatabase.style';
export interface Props extends WithStyles<typeof styles> { }

interface State {
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  items: any;
}

class Colleague extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    // debugger;
    let classes = this.props.classes;
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let colleagueInfo = this.props.info;
    colleagueInfo.nickname = colleagueInfo.name.substring(0, 1).toLowerCase() + '.' + colleagueInfo.surname.toLowerCase();

    const item =
      // numbers.map((num: number) =>
      <Grid item xs={12} sm={4}>
        <Paper className={classNames(classes.paper)}>
          <Grid container className={classes.colleagueContainer} justify='center' spacing={24}>
            <Grid item xs={12}>
              <Avatar alt="Remy Sharp" src={colleagueInfo.photo} className={classes.avatar} />
            </Grid>
            <Grid item xs={12}>
              <Typography color="inherit">{colleagueInfo.name} {colleagueInfo.surname}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="inherit">{colleagueInfo.nickname}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="inherit">Profession: Pneumologist</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="secondary">{colleagueInfo.phone}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="secondary">{colleagueInfo.email}</Typography>
            </Grid>
          </Grid>
          <Grid container item className={classes.colleagueContainer} justify='center' spacing={24}>
            <Grid item xs={12}>
              <Divider style={{ marginLeft: '-31px', marginRight: '-31px' }} />
            </Grid>
            <Grid item xs={12}>
              <Typography color="inherit">LAST PATIENTS VISITED</Typography>
            </Grid>
            <Grid container item className={classes.colleagueContainer} justify='center' spacing={24}>
              <Grid item xs={6} style={{ display: 'flex' }}>
                <Avatar alt="Remy Sharp" src={colleagueInfo.photo} className={classNames(classes.avatar, 'avatarSmall')} />
                <div style={{ flexDirection: 'column' }}>
                  <Typography color="inherit">Gross</Typography>
                  <Typography color="inherit">Marcus</Typography>
                </div>
              </Grid>
              <Grid item xs={6} style={{ display: 'flex' }}>
              <Avatar alt="Remy Sharp" src={colleagueInfo.photo} className={classNames(classes.avatar, 'avatarSmall')} />
                <div style={{ flexDirection: 'column' }}>
                  <Typography color="inherit">Gross</Typography>
                  <Typography color="inherit">Marcus</Typography>
                </div>
              </Grid>
              <Grid item xs={6} style={{ display: 'flex' }}>
              <Avatar alt="Remy Sharp" src={colleagueInfo.photo} className={classNames(classes.avatar, 'avatarSmall')} />
                <div style={{ flexDirection: 'column' }}>
                  <Typography color="inherit">Gross</Typography>
                  <Typography color="inherit">Marcus</Typography>
                </div>
              </Grid>
              <Grid item xs={6} style={{ display: 'flex' }}>
              <Avatar alt="Remy Sharp" src={colleagueInfo.photo} className={classNames(classes.avatar, 'avatarSmall')} />
                <div style={{ flexDirection: 'column' }}>
                  <Typography color="inherit">Gross</Typography>
                  <Typography color="inherit">Marcus</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    // );

    return (
      item
    )

  }

}

const styledComponent = withStyles(styles, { withTheme: true })(Colleague);
export default styledComponent;