import * as React from "react";
import { Card, Grid, Link } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Link as LinkRouter } from "react-router-dom";
import styles from "./NewsDetails.style";

export interface Props extends WithStyles<typeof styles> {}

interface State {
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  items: any;
}

class NewsDetails extends React.Component {
  state: State = {
    labelWidth: 0,
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
              <Link color="secondary" component={LinkRouter} to="/News">
                NEWS
              </Link>
              <Typography color="inherit">News</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid container item className={classes.gridContainer} spacing={24}>
            <Grid item className={classes.gridContainer} xs={6}>
              <Typography variant="inherit" className={classes.findNews}>
                NEWS DETAILS
              </Typography>
            </Grid>
            <Grid container item className={classNames(classes.addNewsButton, classes.gridContainer)} xs={6}>
              <Grid item xs={8} />
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  color="inherit"
                  classes={{ root: classes.button, label: classes.buttonLabel }}
                >
                  WRITE A NEWS
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
        </Grid>
        <Grid container item className={classes.gridContainerBody} spacing={24}>
          <Grid className={classes.formatNewsPost}>
            <Grid className={classes.gridContainer} float="right" xs={16}>
              <Paper className={classNames(classes.paper)}>
                <Card>
                  <CardMedia
                    className={classes.media}
                    image="https://www.armytimes.com/resizer/ynKn6slYNUZI6fX60TlzkmWzjSU=/1200x0/filters:quality(100)/arc-anglerfish-arc2-prod-mco.s3.amazonaws.com/public/CC24XKCEBZE7PF3HUGRYWXXIBY.jpg"
                  >
                    <div className={classes.overlay}>
                      <Typography className={classes.newsDateOverlay} color="inherit">
                        22.01.2019
                      </Typography>
                      &nbsp;
                      <Typography className={classes.newsTitleOverlay} color="inherit">
                        <b>The war still causes hundreds of deaths.</b>
                      </Typography>
                      &nbsp;
                      <Typography className={classes.newsSignOverlay} color="inherit">
                        <b>Written by Mario Rossi</b>
                      </Typography>
                    </div>
                  </CardMedia>
                </Card>
                &emsp;
                <Typography color="inherit">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, qui illo! Perferendis, quia,
                  commodi assumenda neque impedit dicta necessitatibus quaerat temporibus ad deserunt at natus
                  voluptatibus, tempora libero amet id? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quibusdam, qui illo! Perferendis, quia, commodi assumenda neque impedit dicta necessitatibus quaerat
                  temporibus ad deserunt at natus voluptatibus, tempora libero amet id? Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Quibusdam, qui illo! Perferendis, quia, commodi assumenda neque impedit
                  dicta necessitatibus quaerat temporibus ad deserunt at natus voluptatibus, tempora libero amet id?
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, qui illo! Perferendis, quia,
                  commodi assumenda neque impedit dicta necessitatibus quaerat temporibus ad deserunt at natus
                  voluptatibus, tempora libero amet id? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quibusdam, qui illo! Perferendis, quia, commodi assumenda neque impedit dicta necessitatibus quaerat
                  temporibus ad deserunt at natus voluptatibus, tempora libero amet id? Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Quibusdam, qui illo! Perferendis, quia, commodi assumenda neque impedit
                  dicta necessitatibus quaerat temporibus ad deserunt at natus voluptatibus, tempora libero amet id?
                </Typography>
                &nbsp;
              </Paper>
            </Grid>
          </Grid>

          <Grid className={classes.formatNewsCard}>
            <Grid className={classes.gridContainer} float="left" xs={12}>
              <Typography variant="inherit" className={classes.findNews}>
                OTHER ARTICLES
              </Typography>
              <Paper className={classNames(classes.paper)}>
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
                <Link className={classes.readMore} color="red" component={LinkRouter} to="/NewsDetails">
                  Read full article >
                </Link>
              </Paper>
            </Grid>
            <Grid className={classes.gridContainer} float="left" xs={12}>
              <Paper className={classNames(classes.paper)}>
                &emsp;
                <Typography className={classes.newsDate} color="inherit">
                  22.01.2019
                </Typography>
                &nbsp;
                <Typography className={classes.newsTitlePost} color="inherit">
                  <b>The war still causes hundreds of deaths.</b>
                </Typography>
                &nbsp;
                <CardMedia
                  className={classes.mediaArticles}
                  image="https://www.armytimes.com/resizer/ynKn6slYNUZI6fX60TlzkmWzjSU=/1200x0/filters:quality(100)/arc-anglerfish-arc2-prod-mco.s3.amazonaws.com/public/CC24XKCEBZE7PF3HUGRYWXXIBY.jpg"
                />
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
                <Link className={classes.readMore} color="red" component={LinkRouter} to="/NewsDetails">
                  Read full article >
                </Link>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styledComponent = withStyles(styles, { withTheme: true })(NewsDetails);
export default styledComponent;
