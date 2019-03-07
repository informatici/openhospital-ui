import * as React from "react";
import ReactDOM from 'react-dom';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link as LinkRouter, LinkProps } from 'react-router-dom';
import { MaterialNavLinkRouter, MaterialLinkRouter } from '../utils/LinkHelper';
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
}

function AvatarItem(classes: any) {

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const listItems: any = numbers.map((num: number) =>
    <Grid item xs={12} sm={4} key={num.toString()}>
      <Paper className={classNames(classes.paper)}>
        <Grid container className={classes.gridContainer} justify='center' spacing={24}>
          <Grid item xs={12}>
            <Avatar alt="Remy Sharp" src={maleAvatar} className={classes.avatar} />
          </Grid>
          <Grid item xs={12}>
            <Typography color="inherit">Dr. Meredith Grey</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="inherit">m.grey</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
  return (
    listItems
  )
}
class ColleaguesDatabase extends React.Component<Props, State> {

  state: State = {
    // age: '',
    // name: 'hai',
    labelWidth: 0,
  };

  componentDidMount() {
    // debugger;
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }


  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container className={classes.gridContainer} justify='center' spacing={24}>
          <Grid container item justify='center' spacing={24}>
            <Grid item xs={12}>
              <Breadcrumbs aria-label="Breadcrumb" className={classes.breadCrumb}>
                <MaterialLinkRouter color="secondary" component={LinkRouter} to="/dashboard">
                  Home
              </MaterialLinkRouter>
                <Typography color="inherit">Colleagues</Typography>
              </Breadcrumbs>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="inherit" className={classes.colleaguesTitle}>
                COLLEAGUES
              </Typography>
            </Grid>
          </Grid>
          <Grid container item justify='center' spacing={24}>
            <Paper className={classes.paperFlat}>
              <Grid container item spacing={24}>
                <Grid item xs={12} className={classes.inputContainer}>
                  <Typography variant="inherit" className={classes.findColleagues}>
                    FIND A COLLEAGUES
                </Typography>
                  <Typography variant="inherit" className={classes.insertInfoColleagues}>
                    Insert the information of your colleagues
                </Typography>
                </Grid>
              </Grid>
              <form>
                <Grid container item spacing={24}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      id="name"
                      label="Name or Username*"
                      className={classNames(classes.formField, classes.cssOutlinedInput)}
                      InputLabelProps={{
                        classes: {
                          root: classes.formFieldInputLabel,
                          focused: classes.cssFocused,
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: classes.formFieldInput,
                          notchedOutline: classes.cssOutlinedInput,
                        },
                      }}
                      // value="{this.state.name}"
                      // onChange={this.handleChange('name')}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      id="surname"
                      label="Surname"
                      className={classNames(classes.formField, classes.cssOutlinedInput)}
                      InputLabelProps={{
                        classes: {
                          root: classes.formFieldInputLabel,
                          focused: classes.cssFocused,
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: classes.formFieldInput,
                          notchedOutline: classes.cssOutlinedInput,
                        },
                      }}
                      // value="{this.state.name}"
                      // onChange={this.handleChange('name')}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined"
                      className={classNames(classes.formField, classes.formFieldSelect)}>
                      <InputLabel
                        ref={ref => {
                          this.InputLabelRef = ref;
                        }}
                        htmlFor="​profession"
                        classes={{
                          root: classes.formFieldInputLabel,
                          focused: classes.selectLabel
                        }}
                      >
                        Profession / Specialization / Usergroup
                      </InputLabel>
                      <Select
                        className={classes.select}
                        // value={this.state.age}
                        // onChange={this.handleChange}
                        input={
                          <OutlinedInput
                            labelWidth={this.state.InputLabelRef}
                            name="​professionSpecializationUsergroup"
                            id="profession"
                            // inputProps={{                          
                            classes={{
                              // root: classes.formFieldSelectInput,
                              input: classes.formFieldSelectInput
                            }}
                          // }}
                          />
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>

                    {/* <TextField
                      id="profession"
                      label="Profession / Specialization / Usergroup"
                      className={classNames(classes.formField, classes.cssOutlinedInput)}
                      InputLabelProps={{
                        classes: {
                          focused: classes.cssFocused,
                        },
                      }}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.cssOutlinedInput,
                        },
                      }}
                      // value="{this.state.name}"
                      // onChange={this.handleChange('name')}
                      margin="normal"
                      variant="outlined"
                    /> */}
                  </Grid>
                  <Grid item xs={12} sm={2} classes={{ item: classes.detailButtonContainer }}>
                    <Button variant="outlined" color="inherit" classes={{ root: classes.detailButton, label: classes.detailButtonLabel }}>
                      Search
                      <KeyboardArrowRightIcon />
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          <Grid container item style={{ padding: '12px 0' }} spacing={24}>
            {AvatarItem(classes)}
            {/* <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <Avatar alt="Remy Sharp" src={maleAvatar} className={classes.avatar} />
              </Paper>
            </Grid> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}


const styledComponent = withStyles(styles, { withTheme: true })(ColleaguesDatabase);
export default styledComponent;