import { Card, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import classNames from "classnames";
import PropTypes from "prop-types";
import * as React from "react";
import { Link } from "react-router-dom";
import styles from "./News.style";
import { MaterialLinkRouter } from "../utils/LinkHelper";

export interface Props extends WithStyles<typeof styles> { }

interface State {
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  items: any;
}

class News extends React.Component {
  state: State = {
    labelWidth: 0,
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
              <MaterialLinkRouter color="secondary" component={Link} to="/dashboard">
                Home
              </MaterialLinkRouter>
              <Typography color="inherit">News</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="inherit" className={classes.newsTitle}>
              NEWS
            </Typography>
          </Grid>
        </Grid>
        <Grid container item className={classes.gridContainer} justify="center" spacing={24}>
          <Divider className={classes.divider} />
          &emsp;
        </Grid>
        <Grid container item className={classes.gridContainer} spacing={24}>
          <Grid item className={classes.gridContainer} xs={6}>
            <Typography variant="inherit" className={classes.findNews}>
              Filter news by
            </Typography>
          </Grid>
          <Grid container item className={classes.gridContainer} xs={6}>
            <Typography variant="inherit" className={classes.findNewsFilter}>
              Filter
            </Typography>
            <Grid item xs={6}>
              <Select
                variant="outlined"
                className={classNames(classes.select, classes.formField)}
                input={
                  <OutlinedInput
                    labelWidth={300}
                    name="filter"
                    id="filter"
                    classes={{
                      input: classes.formFieldSelectInput,
                    }}
                  />
                }
              >
                <MenuItem value={10}>Most Recent</MenuItem>
                <MenuItem value={20}>Last Updated</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item className={classes.gridContainer} spacing={24}>
          <Grid className={classes.formatNewsCard}>
            <Paper className={classNames(classes.paper)}>
              <Grid item xs={12} className={classes.newsContainer}>
                &emsp;
                <Typography className={classes.newsDate} color="inherit">
                  22.01.2019
                </Typography>
                &nbsp;
                <Typography className={classes.newsTitlePost} color="inherit">
                  <b>The war still causes hundreds of deaths.</b>
                </Typography>
                &ensp;
                <Typography color="inherit">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
                  gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum
                  sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </Typography>
                &nbsp;
                <Typography className={classes.newsSign} color="inherit">
                  <b>Written by Mario Rossi</b>
                </Typography>
                &nbsp;
                <Link className={classes.readMore} color="secondary" component={Link} to="/NewsDetails">
                  Read full article >
                </Link>
              </Grid>
            </Paper>
          </Grid>
          <Grid className={classes.formatNewsCard}>
            <Paper className={classNames(classes.paper)}>
              <Grid item xs={12} className={classes.newsContainer}>
                &emsp;
                <Typography className={classes.newsDate} color="inherit">
                  22.01.2019
                </Typography>
                &nbsp;
                <Typography className={classes.newsTitlePost} color="inherit">
                  <b>The war still causes hundreds of deaths.</b>
                </Typography>
                &ensp;
                <Typography color="inherit">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
                  gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum
                  sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </Typography>
                &nbsp;
                <Typography className={classes.newsSign} color="inherit">
                  <b>Written by Mario Rossi</b>
                </Typography>
                &nbsp;
                <Link className={classes.readMore} color="secondary" component={Link} to="/NewsDetails">
                  Read full article >
                </Link>
              </Grid>
            </Paper>
          </Grid>
          <Grid className={classes.formatNewsCard}>
            <Paper className={classNames(classes.paper)}>
              <Grid item xs={12} className={classes.newsContainer}>
                &emsp;
                <Typography className={classes.newsDate} color="inherit">
                  22.01.2019
                </Typography>
                &nbsp;
                <Typography className={classes.newsTitlePost} color="inherit">
                  <b>The war still causes hundreds of deaths.</b>
                </Typography>
                &ensp;
                <Card>
                  <CardMedia
                    className={classes.media}
                    image="https://www.armytimes.com/resizer/ynKn6slYNUZI6fX60TlzkmWzjSU=/1200x0/filters:quality(100)/arc-anglerfish-arc2-prod-mco.s3.amazonaws.com/public/CC24XKCEBZE7PF3HUGRYWXXIBY.jpg"
                  />
                </Card>
                &ensp;
                <Typography color="inherit">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
                  gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum
                  sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </Typography>
                &nbsp;
                <Typography className={classes.newsSign} color="inherit">
                  <b>Written by Mario Rossi</b>
                </Typography>
                &nbsp;
                <Link className={classes.readMore} color="secondary" component={Link} to="/NewsDetails">
                  Read full article >
                </Link>
              </Grid>
            </Paper>
          </Grid>
          <Grid className={classes.formatNewsCard}>
            <Paper className={classNames(classes.paper)}>
              <Grid item xs={12} className={classes.newsContainer}>
                &emsp;
                <Typography className={classes.newsDate} color="inherit">
                  22.01.2019
                </Typography>
                &nbsp;
                <Typography className={classes.newsTitlePost} color="inherit">
                  <b>The war still causes hundreds of deaths.</b>
                </Typography>
                &ensp;
                <Typography color="inherit">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
                  gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum
                  sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </Typography>
                &nbsp;
                <Typography className={classes.newsSign} color="inherit">
                  <b>Written by Mario Rossi</b>
                </Typography>
                &nbsp;
                <Link className={classes.readMore} color="secondary" component={Link} to="/NewsDetails">
                  Read full article >
                </Link>
              </Grid>
            </Paper>
          </Grid>
          <Grid className={classes.formatNewsCard}>
            <Paper className={classNames(classes.paper)}>
              <Grid item xs={12} className={classes.newsContainer}>
                &emsp;
                <Typography className={classes.newsDate} color="inherit">
                  22.01.2019
                </Typography>
                &nbsp;
                <Typography className={classes.newsTitlePost} color="inherit">
                  <b>The war still causes hundreds of deaths.</b>
                </Typography>
                &ensp;
                <Typography color="inherit">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
                  gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum
                  sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </Typography>
                &nbsp;
                <Typography className={classes.newsSign} color="inherit">
                  <b>Written by Mario Rossi</b>
                </Typography>
                &nbsp;
                <Link className={classes.readMore} color="secondary" component={Link} to="/NewsDetails">
                  Read full article >
                </Link>
              </Grid>
            </Paper>
          </Grid>
          <Grid className={classes.formatNewsCard}>
            <Paper className={classNames(classes.paper)}>
              <Grid item xs={12} className={classes.newsContainer}>
                &emsp;
                <Typography className={classes.newsDate} color="inherit">
                  22.01.2019
                </Typography>
                &nbsp;
                <Typography className={classes.newsTitlePost} color="inherit">
                  <b>The war still causes hundreds of deaths.</b>
                </Typography>
                &ensp;
                <Typography color="inherit">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
                  gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum
                  sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </Typography>
                &nbsp;
                <Typography className={classes.newsSign} color="inherit">
                  <b>Written by Mario Rossi</b>
                </Typography>
                &nbsp;
                <Link className={classes.readMore} color="secondary" component={Link} to="/NewsDetails">
                  Read full article >
                </Link>
              </Grid>
            </Paper>
          </Grid>

          <Grid className={classes.formatNewsCard}>
            <Paper className={classes.paper}>
              <Grid item xs={12} className={classes.newsContainer}>
                &emsp;
                <Typography className={classes.newsDate} color="inherit">
                  22.01.2019
                </Typography>
                &nbsp;
                <Typography className={classes.newsTitlePost} color="inherit">
                  <b>The war still causes hundreds of deaths.</b>
                </Typography>
                &ensp;
                <Typography color="inherit">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
                  gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum
                  sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </Typography>
                &nbsp;
                <Typography className={classes.newsSign} color="inherit">
                  <b>Written by Mario Rossi</b>
                </Typography>
                &nbsp;
                <Link className={classes.readMore} color="secondary" component={Link} to="/NewsDetails">
                  Read full article >
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        &nbsp;
        <Grid container item className={classes.gridContainer} justify="center" spacing={24}>
          <Grid item xs={12} sm={2} className={classes.loadMoreContainer}>
            <Button variant="outlined" color="inherit" classes={{ root: classes.button, label: classes.buttonLabel }}>
              Load more
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

News.PropTypes = {
  classes: PropTypes.object.isRequired,
};

const styledComponent = withStyles(styles, { withTheme: true })(News);
export default styledComponent;
