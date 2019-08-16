import { Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import PropTypes from "prop-types";
import * as React from "react";
import ReactDOM from "react-dom";
import { Link as LinkRouter, Link} from "react-router-dom";
import styles from "./Notification.style";
import { MaterialLinkRouter } from "../utils/LinkHelper";

export interface Props extends WithStyles<typeof styles> {}

interface State {
  value?: number;
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  items: any;
}

class Notification extends React.Component<Props, State> {
  state: State = {
    labelWidth: 0,
    value: 0,
    error: null,
    isLoaded: false,
  };

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container item className={classes.gridContainer} justify="center" spacing={24}>
          <Grid item xs={12}>
            <Breadcrumbs aria-label="Breadcrumb" className={classes.breadCrumb}>
            <MaterialLinkRouter color="secondary" component={LinkRouter} to="/dashboard">
                  Home
                </MaterialLinkRouter>
              <Typography color="inherit">Notification</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="inherit" className={classes.notificationTitle}>
              NOTIFICATIONS
            </Typography>
          </Grid>
          <Grid container item className={classes.gridContainer} style={{ flexDirection: "row-reverse" }} xs={12}>
            <Button variant="outlined" color="inherit" classes={{ root: classes.button }}>
              Setting Notification
            </Button>
            &emsp;
          </Grid>
          &emsp;
          <Divider className={classes.divider} />
          &emsp;
        </Grid>
        <Grid container item className={classes.gridContainer} justify="center" spacing={24}>
          <Paper className={classes.paperFlat}>
            <Grid item xs={12}>
              <Grid container item style={{ flexDirection: "row-reverse" }} xs={12}>
                <Button variant="outlined" color="inherit" classes={{ root: classes.deleteButton }}>
                  X
                </Button>
              </Grid>
              <Typography className={classes.notificationTitlePost} color="inherit">
                <b>Dr. Greys add a new event to your calendar.</b>
              </Typography>
              &ensp;
              <Typography color="inherit">
                Event object "consultation before the operation to patient Omar Hasmir
              </Typography>
              &nbsp;
              <Typography className={classes.notificationDate} color="inherit">
                Oggi alle 11.20
              </Typography>
            </Grid>
          </Paper>
          &ensp;
          <Paper className={classes.paperFlat}>
            <Grid item xs={12}>
              <Grid container item style={{ flexDirection: "row-reverse" }} xs={12}>
                <Button variant="outlined" color="inherit" classes={{ root: classes.deleteButton }}>
                  X
                </Button>
              </Grid>
              <Typography className={classes.notificationTitlePost} color="inherit">
                <b>The war still causes hundreds of deaths.</b>
              </Typography>
              &ensp;
              <Typography color="inherit">
                Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
              </Typography>
              &nbsp;
              <Typography className={classes.notificationDate} color="inherit">
                Ieri alle 13.20
              </Typography>
            </Grid>
          </Paper>
          &ensp;
          <Paper className={classes.paperFlat}>
            <Grid item xs={12}>
              <Grid container item style={{ flexDirection: "row-reverse" }} xs={12}>
                <Button variant="outlined" color="inherit" classes={{ root: classes.deleteButton }}>
                  X
                </Button>
              </Grid>
              <Typography className={classes.notificationTitlePost} color="inherit">
                <b>The war still causes hundreds of deaths.</b>
              </Typography>
              &ensp;
              <Typography color="inherit">
                Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
              </Typography>
              &nbsp;
              <Typography className={classes.notificationDate} color="inherit">
                Ieri alle 13.20
              </Typography>
            </Grid>
          </Paper>
          &ensp;
          <Paper className={classes.paperFlat}>
            <Grid item xs={12}>
              <Grid container item style={{ flexDirection: "row-reverse" }} xs={12}>
                <Button variant="outlined" color="inherit" classes={{ root: classes.deleteButton }}>
                  X
                </Button>
              </Grid>
              <Typography className={classes.notificationTitlePost} color="inherit">
                <b>New refilling of Amoxicillin antibiotics between one week.</b>
              </Typography>
              &nbsp;
              <Typography className={classes.notificationDate} color="inherit">
                Ieri alle 13.20
              </Typography>
            </Grid>
          </Paper>
          &ensp;
          <Paper className={classes.paperFlat}>
            <Grid item xs={12}>
              <Grid container item style={{ flexDirection: "row-reverse" }} xs={12}>
                <Button variant="outlined" color="inherit" classes={{ root: classes.deleteButton }}>
                  X
                </Button>
              </Grid>
              <Typography className={classes.notificationTitlePost} color="inherit">
                <b>The war still causes hundreds of deaths.</b>
              </Typography>
              &ensp;
              <Typography color="inherit">
                Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
              </Typography>
              &nbsp;
              <Typography className={classes.notificationDate} color="inherit">
                Ieri alle 13.20
              </Typography>
            </Grid>
          </Paper>
          &ensp;
          <Paper className={classes.paperFlat}>
            <Grid item xs={12}>
              <Grid container item style={{ flexDirection: "row-reverse" }} xs={12}>
                <Button variant="outlined" color="inherit" classes={{ root: classes.deleteButton }}>
                  X
                </Button>
              </Grid>
              <Typography className={classes.notificationTitlePost} color="inherit">
                <b>The war still causes hundreds of deaths.</b>
              </Typography>
              &ensp;
              <Typography color="inherit">
                Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
              </Typography>
              &nbsp;
              <Typography className={classes.notificationDate} color="inherit">
                Ieri alle 13.20
              </Typography>
            </Grid>
          </Paper>
        </Grid>
        &nbsp;
        <Grid container item className={classes.gridContainer} justify="center" spacing={24}>
          <Grid item xs={12} sm={2} className={classes.loadMoreContainer}>
            <Button
              variant="outlined"
              color="inherit"
              classes={{ root: classes.loadMorebutton, label: classes.buttonLabel }}
            >
              LOAD MORE
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Notification.PropTypes = {
  classes: PropTypes.object.isRequired,
};

const styledComponent = withStyles(styles, { withTheme: true })(Notification);
export default styledComponent;
