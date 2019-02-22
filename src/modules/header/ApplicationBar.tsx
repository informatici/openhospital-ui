
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/MailOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        grow: {
            flexGrow: 1,
        },
        appBar: {
            height: 58,
            boxShadow: 'none',
        },
        appBar_toolBar: {
            borderBottom: '1px solid #EEEEEE',
            minHeight: 58,
            // sm, small: 600px or larger
            '@media (min-width: 600px)': {
                minHeight: 58,
            },
            // alignItems: 'stretch',
        },
        menuButton: {
            marginLeft: -12,
            marginRight: 20,
        },
        welcomeTitle: {
            letterSpacing: 0.3,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'flex',
                alignItems: 'center',
            },
        },
        title_hospital: {
            fontSize: 12,
            color: theme.palette.primary.darkGrey,
        },
        title_welcome: {
            fontSize: 12,
            color: theme.palette.primary.lightGrey,
        },
        title_name: {
            fontSize: 12,
            color: theme.palette.primary.red,
        },
        searchAndIcons: {
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'flex-end',
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            borderLeft: '1px solid #EEEEEE',
            marginRight: theme.spacing.unit * 2,
            marginLeft: 0,
            width: 463,
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing.unit * 3,
                width: 463,
            },
        },
        searchIcon: {
            width: theme.spacing.unit * 9,
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
            width: '100%',
            height: '100%',
        },
        inputInput: {
            fontSize: 12,
            paddingTop: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
            paddingLeft: theme.spacing.unit * 10,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 200,
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
            width: 218,
            borderLeft: '1px solid #EEEEEE',
            justifyContent: 'flex-end',
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    });

export interface Props extends WithStyles<typeof styles> { }

interface State {
    anchorEl: null | HTMLElement;
    mobileMoreAnchorEl: null | HTMLElement;
}

class ApplicationBar extends React.Component<Props, State> {
    state: State = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
    };

    handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar className={classes.appBar_toolBar}>
                        {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                            <MenuIcon />
                        </IconButton> */}
                        <div className={classes.welcomeTitle}>
                            <Typography className={classes.title_hospital} color="inherit" noWrap>
                                Hospital St. Democrito
                                &nbsp;-&nbsp; 
                        </Typography>
                            <Typography className={classes.title_welcome}>
                                Welcome back,&nbsp;
                        </Typography>
                            <Typography className={classes.title_name}>
                                Mario Rossi
                        </Typography>
                        </div>
                        <div className={classes.searchAndIcons}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search something…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </div>
                            {/* <div className={classes.grow} /> */}
                            <div className={classes.sectionDesktop}>
                                <IconButton color="inherit">
                                    <Badge badgeContent={2} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton color="inherit">
                                    {/* <Badge badgeContent={4} color="secondary"> */}
                                    <MailIcon />
                                    {/* </Badge> */}
                                </IconButton>
                                <IconButton color="inherit">
                                    <CalendarIcon />
                                </IconButton>
                                <IconButton color="inherit">
                                    <SettingsIcon />
                                </IconButton>
                                {/* <IconButton
                                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton> */}
                            </div>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderMobileMenu}
            </div>
        );
    }
}


const styledComponent = withStyles(styles, { withTheme: true })(ApplicationBar);
export default styledComponent;