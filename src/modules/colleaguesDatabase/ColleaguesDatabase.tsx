import * as React from "react";
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

import styles from './ColleaguesDatabase.style';
export interface Props extends WithStyles<typeof styles> { }

class ColleaguesDatabase extends React.Component<Props> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container className={classes.gridContainer} justify='center' spacing={24}>
          <Grid container item className={classes.ciao} justify='center' spacing={24}>
            <Grid item xs={12}>
              {/* <Paper className={classes.paper}> */}
              <Breadcrumbs aria-label="Breadcrumb" className={classes.breadCrumb}>
                <MaterialLinkRouter color="secondary" component={LinkRouter} to="/dashboard">
                  Home
              </MaterialLinkRouter>
                <Typography color="inherit">Colleagues</Typography>
              </Breadcrumbs>
              {/* </Paper> */}
            </Grid>
            {/* <Grid container justify="center" className={classes.gridPaddingBottom}> */}
            <Grid item xs={12}>
              <Typography variant="inherit" className={classes.colleaguesTitle}>
                COLLEAGUES
              </Typography>
            </Grid>
          </Grid>
          {/* <Grid container justify="center" className={classes.gridPaddingBottom}> */}
          <Grid container item justify='center' className={classes.gridContainer} spacing={24}>
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
                  <Grid item xs={2}>
                    <TextField
                      id="name"
                      label="Name or Username*"
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
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      id="surname"
                      label="Surname"
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
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
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
                    />
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}


const styledComponent = withStyles(styles, { withTheme: true })(ColleaguesDatabase);
export default styledComponent;