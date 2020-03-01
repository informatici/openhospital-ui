import { Grid, Link, Paper, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import * as React from "react";
import { Link as LinkRouter } from "react-router-dom";
import styles from "./Setting.style";
import classNames from "classnames";
export interface Props extends WithStyles<typeof styles> {}

interface State {
  value?: number;
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  items: any;
}

class Setting extends React.Component<Props, State> {
  state: State = {
    labelWidth: 0,
    value: 0,
    error: null,
    isLoaded: false,
  };

  public static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container item className={classes.gridContainer} justify="center" spacing={24}>
          <Grid item xs={12}>
            <Breadcrumbs aria-label="Breadcrumb" className={classes.breadCrumb}>
              <Link color="secondary" component={LinkRouter} to="/dashboard">
                Home
              </Link>
              <Typography color="inherit">Settings</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="inherit" className={classes.settingTitle}>
              SETTINGS
            </Typography>
          </Grid>
          &emsp;
          <Divider className={classes.divider} />
          &emsp;
        </Grid>
        <Paper container item className={classes.paper} xs={12}>
          <Grid
            container
            item
            style={{ padding: "30px" }}
            className={classes.gridContainer}
            justify="center"
            spacing={24}
          >
            <Grid style={{ display: "left", paddingRight: "65px" }} item spacing={16}>
              <Avatar alt="Remy Sharp" src={""} className={classes.avatar}>
                <AddPhotoIcon />
              </Avatar>
            </Grid>
            <Grid item xs={12} sm={6} style={{ paddingTop: "100px" }}>
              <Typography style={{ paddingBottom: "20px" }} color="inherit" className={classes.settingTitle}>
                GENERAL INFORMATION
              </Typography>
              <TextField
                required
                id="userName"
                label="Username"
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
                margin="normal"
                variant="outlined"
              />
              &nbsp;
              <TextField
                required
                id="fullName"
                label="Full Name"
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
                margin="normal"
                variant="outlined"
              />
              &nbsp;
              <Typography style={{ paddingBottom: "20px" }} color="inherit" className={classes.settingTitle}>
                ROLE
              </Typography>
              <TextField
                required
                id="role"
                label="Profession"
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
                margin="normal"
                variant="outlined"
              />
              &nbsp;
              <Typography style={{ paddingBottom: "20px" }} color="inherit" className={classes.settingTitle}>
                DESCRIPTION
              </Typography>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  defaultValue="Specific responsibilities vary greatly depending on the area of specialism. However, generic duties of the job include: 
            - undertaking patient consultations and physical 
              examinations.
            - organising workloads.
            - performing surgical procedures.
            - providing general pre- and post-operative care.
            - monitoring and administering medication.
            - assessing and planning treatment requirements.
            - liaising daily with staff including other doctors, 
              non-medical management staff and healthcare 
              professionals.
            - writing reports and maintaining records.
            - promoting health education."
                  multiline
                  rows="12"
                  className={classNames(classes.formField, classes.cssOutlinedInput)}
                  InputLabelProps={{
                    classes: {
                      root: classes.formFieldInputLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              &nbsp;
              <Button
                style={{ marginTop: "40px", height: "55px", justifyContent: "center", width: "200px" }}
                variant="outlined"
                color="inherit"
                classes={{ root: classes.button, label: classes.ButtonLabel }}
              >
                SAVE
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const styledComponent = withStyles(styles, { withTheme: true })(Setting);
export default styledComponent;
