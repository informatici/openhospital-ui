import * as React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import styles from "./Footer.style";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ISFLogo from "../../assets/images/isf.png";

export interface Props extends WithStyles<typeof styles> {}

class Footer extends React.Component<Props> {
  public render() {
    const { classes } = this.props;
    return (
      <footer>
        <div className={classes.footerContainer}>
          <Grid container justify="space-between" className={classes.footerContainerGrid}>
            <Grid item xs={12} sm={3}>
              <Typography className={classes.footerInfo}>
                <a href="https://www.informaticisenzafrontiere.org/" target="_blank" className={classes.linkISF}>
                  Open Hospital
                </a>{" "}
                è un progetto di ISF
              </Typography>
              <Typography className={classes.footerInfo}>
                2005 - 2019 ISF Informatici senza frontiere - ONLUS
              </Typography>
              <Typography className={classes.footerInfo}>Viale IV Novembre, 100 - 31100 Treviso - Italy</Typography>
              <Typography className={classes.footerInfo}>C.F. 94106980264</Typography>
            </Grid>
            <Grid item xs={12} sm={3} className={classes.logoISFContainer}>
              <img src={ISFLogo} alt="Informatici Senza Frontiere" className={classes.logoISF} />
            </Grid>
          </Grid>
        </div>
      </footer>
    );
  }
}

const styledComponent = withStyles(styles, { withTheme: true })(Footer);
export default styledComponent;
