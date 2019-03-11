import * as React from "react";
import ReactDOM from 'react-dom';
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
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import maleAvatar from "../../assets/images/male.png";
import femaleAvatar from '../../assets/images/female.png';
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

  componentDidMount() {
    // fetch("https://uinames.com/api/?ext&amount=9")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {

    //       setTimeout(() => {
    //         this.setState({
    //           isLoaded: true,
    //           items: result
    //         });
    //       }, 300)
    //     },
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //     }
    //   )

    // this.setState({
    //   labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    // });
  }


  public render() {
    const { classes } = this.props;
    // const { items, isLoaded, error } = this.state;

    // const colleagues = (
    //   items && items.length !== 0 ?
    //     (items.map((item: any) => (
    //       <Colleague
    //         info={item}
    //       // surname={item.surname}
    //       />
    //     ))) :
    //     <CircularProgress className={classes.progress} color="secondary" style={{ margin: '20px auto' }} />
    // )

    return (
      <div className={classes.root}>
        <Grid container className={classes.gridContainer} justify='center' spacing={24}>
          <Grid container item  spacing={24}>
            {/* <Grid container item justify='center' spacing={24}> */}
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
          {/* </Grid> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}


const styledComponent = withStyles(styles, { withTheme: true })(ColleagueDetails);
export default styledComponent;