
import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
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
        subApplicationBar: {
            display: 'flex',
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            height: 76,
            boxShadow: 'none',
        },
        // appBar_toolBar: {
        //     borderBottom: '1px solid #EEEEEE',
        //     minHeight: 58,
        //     // sm, small: 600px or larger
        //     '@media (min-width: 600px)': {
        //         minHeight: 58,
        //     },
        // },
        navigationBar: {
            display: 'flex',
            margin: '0 auto',
            maxWidth: 1440,
            // height: 76,
            alignSelf: 'flex-end',
        },
        tab: {
            textTransform: 'initial',
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
                    <Tabs className={classes.navigationBar} variant="fullWidth" value={value} onChange={this.handleChange}>
                        <LinkTab className={classes.tab} component={NavLink} to="/dashboard" label="Dashboard" />
                        <LinkTab className={classes.tab} component={NavLink} to="/test" label="Patients database" />
                        <LinkTab className={classes.tab} component={NavLink} to="/test" label="Colleagues database" />
                        <LinkTab className={classes.tab} component={NavLink} to="/test" label="Pharmacy" />
                        <LinkTab className={classes.tab} component={NavLink} to="/test" label="Ward" />
                        <LinkTab className={classes.tab} component={NavLink} to="/test" label="Billing" />
                        <LinkTab className={classes.tab} component={NavLink} to="/test" label="News" />
                        {/* <LinkTab label="Page One" href="page1" />
                            <LinkTab label="Page Two" href="page2" /> */}
                        {/* <LinkTab label="Page Three" href="page3" /> */}
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