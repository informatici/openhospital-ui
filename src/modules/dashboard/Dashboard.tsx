
import React from 'react';
// import Tabs from '@material-ui/core/Tabs';
// import NoSsr from '@material-ui/core/NoSsr';
// import { default as Tab, TabProps } from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
// import { NavLink, NavLinkProps } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import SvgIcon from '@material-ui/core/SvgIcon';
// import SearchIcon from '../../assets/icons/bigSearch.svg';
import BigSearchIcon from '../utils/icons/BigSearchIcon';
import PlusIcon from '../utils/icons/PlusIcon';


const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            // color: 'black'
        },
        paper: {
            padding: theme.spacing.unit * 2,
            textAlign: 'center',
            // color: theme.palette.text.secondary,
        },
        gridPatient: {
            paddingTop: 30
        },
        ctaPatient: {
            height: 167,
            textAlign: 'center',
            borderRadius: 10,
            background: theme.palette.primary.main,
            boxShadow: '0 8px 16px 0 rgba(48,49,51,0.1)',
            // color: 'green'
            '&:hover': {
                background: 'linear-gradient(180deg, #E82758 0%, #FE4641 100%)',
                boxShadow: '0 8px 16px 0 rgba(254,70,65,0.33)',
                color: theme.palette.primary.white,
            }
        },
        gridContainer: {
            margin: '0 auto',
            paddingTop: 60,
        },
    });


export interface Props extends WithStyles<typeof styles> { }

interface State {
    value?: number;
}

class Dashboard extends React.Component<Props, State> {
    state: State = {
        value: 0,
    };

    handleChange = (event: React.MouseEvent<HTMLElement>, value: number) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        // const { value } = this.state;

        return (
            <div className={classes.root}>
                <Grid container spacing={24} classes={{ container: classes.gridContainer }}>
                    <Grid container justify='center'>
                        <Grid item xs={2}>
                            <Typography variant="inherit" align="center">
                                Welcome <b>Mario Rossi</b>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify='center' spacing={24} className={classes.gridPatient}>
                        <Grid item xs={12} sm={4}>
                            <CardActionArea className={classes.ctaPatient}>
                                <SvgIcon component={PlusIcon} />
                                <Typography variant="h6" color="inherit" align="center">
                                    <b>REGISTER NEW PATIENT</b>
                                </Typography>
                            </CardActionArea>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <CardActionArea className={classes.ctaPatient}>
                                <SvgIcon component={BigSearchIcon} />
                                <Typography variant="h6" color="inherit" align="center">
                                    <b>SEARCH FOR PATIENTS</b>
                                </Typography>
                            </CardActionArea>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>xs=6 sm=3</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>xs=6 sm=3</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>xs=6 sm=3</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>xs=6 sm=3</Paper>
                    </Grid>
                </Grid>
            </div >
        );
    }

}


const styledComponent = withStyles(styles, { withTheme: true })(Dashboard);
export default styledComponent;