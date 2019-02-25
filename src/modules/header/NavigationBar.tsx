
import React from 'react';
import OHlogo from "../../assets/images/open-hospital.png";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import { default as Tab, TabProps } from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { NavLink, NavLinkProps } from 'react-router-dom';


const styles = (theme: Theme) =>
    createStyles({
        root: {
        },
        logo: {
            position: 'absolute',
            display: 'flex',
            alignSelf: 'center',
        },
        subApplicationBar: {
            display: 'flex',
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            height: 76,
            boxShadow: '0px 6px 20px rgba(0,0,0,0.1)',
            padding: '0 24px'
        },
        navigationBar: {
            display: 'flex',
            margin: '0 auto',
            maxWidth: 1440,
            alignSelf: 'flex-end',
        },
        tab: {
            textTransform: 'initial',
            // fontFamily: "Open Sans",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 0.26,
            lineHeight: '24px',
            color: theme.palette.primary.grey,
        },
        tabSelected: {
            color: theme.palette.primary.red,
        }
    });

// function TabContainer(props: any) {
//     return (
//         <Typography component="div" style={{ padding: 8 * 3 }}>
//             {props.children}
//         </Typography>
//     );
// }


export interface Props extends WithStyles<typeof styles> { }

interface State {
    value?: number;
}

const LinkTab: React.ComponentType<TabProps & NavLinkProps> = Tab as React.ComponentType<TabProps & NavLinkProps>;
// function LinkTab(props: any) {
//     return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
// }


class NavigationBar extends React.Component<Props, State> {
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
            <NoSsr>
                <div className={classes.subApplicationBar}>
                    <img src={OHlogo} alt="Open Hospital" className={classes.logo} />
                    <Tabs className={classes.navigationBar} variant="fullWidth" value={value} onChange={this.handleChange}>
                        <LinkTab classes={{ root: classes.tab, selected: classes.tabSelected }} component={NavLink} to="/dashboard" label="Dashboard" />
                        <LinkTab classes={{ root: classes.tab, selected: classes.tabSelected }} component={NavLink} to="/patientsDatabase" label="Patients database" />
                        <LinkTab classes={{ root: classes.tab, selected: classes.tabSelected }} component={NavLink} to="/colleaguesDatabase" label="Colleagues database" />
                        <LinkTab classes={{ root: classes.tab, selected: classes.tabSelected }} component={NavLink} to="/pharmacy" label="Pharmacy" />
                        <LinkTab classes={{ root: classes.tab, selected: classes.tabSelected }} component={NavLink} to="/ward" label="Ward" />
                        <LinkTab classes={{ root: classes.tab, selected: classes.tabSelected }} component={NavLink} to="/billing" label="Billing" />
                        <LinkTab classes={{ root: classes.tab, selected: classes.tabSelected }} component={NavLink} to="/news" label="News" />
                    </Tabs>
                </div>
                {/* {value === 0 && <TabContainer>Page One</TabContainer>}
                    {value === 1 && <TabContainer>Page Two</TabContainer>}
                    {value === 2 && <TabContainer>Page Three</TabContainer>} */}
            </NoSsr>
        );
    }

}


const styledComponent = withStyles(styles, { withTheme: true })(NavigationBar);
export default styledComponent;