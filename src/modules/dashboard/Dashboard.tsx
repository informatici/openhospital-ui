
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
import BigSearchIcon from '../utils/icons/svg/BigSearchIcon';
import PlusIcon from '../utils/icons/svg/PlusIcon';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


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
            borderRadius: 10,
            background: theme.palette.primary.main,
            boxShadow: '0 4px 8px 0 rgba(48,49,51,0.1)',
        },
        gridPaddingBottom: {
            paddingBottom: 30
        },
        ctaGrid: {
            paddingBottom: 80
        },
        ctaPatient: {
            height: 167,
            textAlign: 'center',
            // alignItems: 'top',
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
        ctaPatientText: {
            paddingTop: 15,
            fontSize: 16,
            // lineHeight: '42px',
            letterSpacing: 1
        },
        gridContainer: {
            margin: '0 auto',
            paddingTop: 60,
        },
        gridMaterialsCalendar: {
            //
        },
        cardTitle: {
            paddingBottom: 30,
            fontSize: 16,
            letterSpacing: 1
        },
        tabs: {
            boxShadow: ' 0 4px 8px 0 rgba(48,49,51,0.1)',
        },
        tab: {
            textTransform: 'initial',
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 0.26,
            padding: 16,
        },
        tabSelected: {
            color: theme.palette.primary.red,
        },
        tabRadiusSx: {
            borderRadius: '10px 0 0 0',
        },
        tabRadiusDx: {
            borderRadius: '0 10px 0 0',
        },
        cardMaterials: {
            padding: 0
        },
        materialsListItem: {
            borderBottom: `1px solid ${theme.palette.primary.lightGrey}`,
            '&:hover': {
                backgroundColor: '#F9F9F9',
            }
        },
        materialsListItemTitleContainer: {
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '20px !important',
        },
        materialsListItemTitle: {
            fontSize: 18,
            letterSpacing: 1,
            fontWeight: 'bold',
            padding: 5
        },
        materialsListItemTitleWarning: {
            padding: 5,
            fontSize: 12,
            letterSpacing: 0.3,
            color: theme.palette.primary.red,
        },
        materialsListItemBigNumber: {
            fontSize: 48,
            letterSpacing: 1,
            fontWeight: 'bold',
            padding: 5
        },
        materialsListItemBigNumberDesc: {
            fontSize: 14,
            letterSpacing: 0.26,
            color: theme.palette.primary.grey,
            // padding: 5
        }
    }
    );


export interface Props extends WithStyles<typeof styles> { }

interface State {
    value?: number;
}

function TabContainer(props: any) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
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
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <Grid container spacing={24} classes={{ container: classes.gridContainer }}>
                    <Grid container justify='center' className={classes.gridPaddingBottom}>
                        <Grid item xs={4}>
                            <Typography variant="inherit" align="center">
                                Welcome <b>Mario Rossi</b>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify='center' spacing={24} className={classes.ctaGrid}>
                        <Grid item xs={12} sm={4}>
                            <CardActionArea className={classes.ctaPatient}>
                                <SvgIcon component={PlusIcon} />
                                <Typography className={classes.ctaPatientText} color="inherit" align="center">
                                    <b>REGISTER NEW PATIENT</b>
                                </Typography>
                            </CardActionArea>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <CardActionArea className={classes.ctaPatient}>
                                <SvgIcon component={BigSearchIcon} />
                                <Typography className={classes.ctaPatientText} color="inherit" align="center">
                                    <b>SEARCH FOR PATIENTS</b>
                                </Typography>
                            </CardActionArea>
                        </Grid>
                    </Grid>
                    <Grid container justify='center' spacing={24} className={classes.gridMaterialsCalendar}>
                        <Grid item xs={12} sm={6}>
                            <Typography className={classes.cardTitle} variant="inherit" align="left">
                                MATERIALS ARE RUNNING OUT
                        </Typography>
                            <Paper className={classNames(classes.paper, classes.cardMaterials)}>
                                <Tabs className={classes.tabs} variant="fullWidth" value={value} onChange={this.handleChange}>
                                    <Tab className={classNames(classes.tab, classes.tabRadiusSx)} classes={{ selected: classes.tabSelected }} label="Running out drugs" />
                                    <Tab className={classNames(classes.tab, classes.tabRadiusSx)} classes={{ selected: classes.tabSelected }} label="Running out nursing material" />
                                </Tabs>
                                {value === 0 &&
                                    // <TabContainer>Item One</TabContainer>
                                    <div>
                                        <List>
                                            <ListItem className={classes.materialsListItem}>
                                                <Grid container justify='center' spacing={24}>
                                                    <Grid item xs={12} className={classes.materialsListItemTitleContainer}>
                                                        <Typography className={classes.materialsListItemTitle} variant="inherit">
                                                            Eritromicina
                                                        </Typography>
                                                        <Typography className={classes.materialsListItemTitleWarning} variant="inherit">
                                                            The drug is running out
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <Grid item xs>
                                                            <Typography className={classes.materialsListItemBigNumber} variant="inherit" align="center">
                                                                150
                                                        </Typography>
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Typography className={classes.materialsListItemBigNumberDesc} variant="inherit" align="center">
                                                                vials remaining
                                                        </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <Grid item xs>
                                                            4
                                                        </Grid>
                                                        <Grid item xs>
                                                            weeks for the next refueling
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        prova 3
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                            <ListItem className={classes.materialsListItem}>
                                                <Grid container justify='center' spacing={24}>
                                                    <Grid item xs={12} sm={4}>
                                                        prova 4
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        prova 5
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        prova 6
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        </List>
                                    </div>
                                }
                                {value === 1 && <TabContainer>Item Two</TabContainer>}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography className={classes.cardTitle} variant="inherit" align="left">
                                CALENDAR
                        </Typography>
                            <Paper className={classes.paper}>xs=6 sm=3</Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </div >
        );
    }

}


const styledComponent = withStyles(styles, { withTheme: true })(Dashboard);
export default styledComponent;