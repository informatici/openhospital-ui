import * as React from "react";
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './Footer.style';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import ApplicationBar from "./ApplicationBar";
// import NavigationBar from "./NavigationBar";


export interface Props extends WithStyles<typeof styles> { }

class Footer extends React.Component<Props> {
    public render() {
        const { classes } = this.props;
        return (
            <footer>
                <div className={classes.footerContainer}>
                    <Grid container justify='space-between' className={classes.footerContainerGrid}>
                        <Grid item xs={4}>
                            <Typography className={classes.footerInfo}>
                                Open Hospital è un progetto di ISF
                    </Typography>
                            <Typography className={classes.footerInfo}>
                                Open Hospital è un progetto di ISF
                    </Typography>
                            <Typography className={classes.footerInfo}>
                                Open Hospital è un progetto di ISF
                    </Typography>
                            <Typography className={classes.footerInfo}>
                                Open Hospital è un progetto di ISF
                    </Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.logoISF}>
                            <Typography className={classes.footerInfo}>
                                Open Hospital è un progetto di ISF
                    </Typography>
                            <Typography className={classes.footerInfo}>
                                Open Hospital è un progetto di ISF
                    </Typography>
                            <Typography className={classes.footerInfo}>
                                Open Hospital è un progetto di ISF
                    </Typography>
                            <Typography className={classes.footerInfo}>
                                Open Hospital è un progetto di ISF
                    </Typography>
                        </Grid>
                    </Grid>
                </div>
            </footer>
        );
    }
}

const styledComponent = withStyles(styles, { withTheme: true })(Footer);
export default styledComponent;