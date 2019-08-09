import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { LOGIN_PATH } from "../../App";
import Tooltip from '@material-ui/core/Tooltip';
import MoreIcon from "@material-ui/icons/MoreVert";
import NotifyIcon from "../../assets/icons/notify.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import ChatIcon from "../../assets/icons/chat.svg";
import SettingsIcon from "../../assets/icons/settings.svg";
import LogoutIcon from "../../assets/icons/logout.svg";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    grow: {
      flexGrow: 1,
    },
    appBar: {
      height: 58,
      boxShadow: "none",
    },
    appBar_toolBar: {
      borderBottom: "1px solid #EEEEEE",
      minHeight: 58,
      // sm, small: 600px or larger
      "@media (min-width: 600px)": {
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
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        alignItems: "center",
      },
    },
    title_hospital: {
      fontSize: 12,
      color: theme.palette.primary.darkGrey,
    },
    title_welcome: {
      fontSize: 12,
      color: theme.palette.primary.grey,
    },
    title_name: {
      fontSize: 12,
      color: theme.palette.primary.red,
    },
    searchAndIcons: {
      display: "flex",
      flexGrow: 1,
      justifyContent: "flex-end",
      height: "100%",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      borderLeft: "1px solid #EEEEEE",
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: 463,
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing.unit * 3,
        width: 463,
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.primary.text,
    },
    inputRoot: {
      color: "inherit",
      width: "100%",
      height: "100%",
    },
    inputInput: {
      fontSize: 12,
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200,
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
      width: 225,
      borderLeft: "1px solid #EEEEEE",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  });

export interface Props extends WithStyles<typeof styles> {}

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

  logout () {
      localStorage.clear();
      window.location.pathname = `${LOGIN_PATH}`;
};

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
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
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              {/* <MailIcon /> */}
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              {/* <NotificationsIcon /> */}
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
                Hospital St. Democrito &nbsp; &nbsp;
              </Typography>
              <Typography className={classes.title_welcome}>Welcome back,&nbsp;</Typography>
              <Typography className={classes.title_name}>Mario Rossi</Typography>
            </div>
            <div className={classes.searchAndIcons}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SvgIcon>
                    <path
                      d={
                        "M19.9900125,18.7425 L14.8464419,13.5925 C16.0049938,12.1575 16.6991261,10.335 16.6991261,8.35 C16.701623,3.7475 12.9588015,0 8.35955056,0 C3.75780275,0 0.0149812734,3.7475 0.0149812734,8.3525 C0.0149812734,12.9575 3.75780275,16.705 8.35705368,16.705 C10.3370787,16.705 12.1598002,16.01 13.5930087,14.85 L18.7365793,20 L19.9900125,18.7425 Z M8.35955056,14.9275 C4.73907615,14.9275 1.79275905,11.9775 1.79275905,8.3525 C1.79275905,4.7275 4.73907615,1.7775 8.35955056,1.7775 C11.980025,1.7775 14.9263421,4.7275 14.9263421,8.3525 C14.9263421,11.9775 11.980025,14.9275 8.35955056,14.9275 Z M2.85642946,7.9975 L4.63171036,7.9975 C4.63171036,6.135 6.14481898,4.62 8.00499376,4.62 L8.00499376,2.8425 C5.16604245,2.8425 2.85642946,5.155 2.85642946,7.9975 Z"
                      }
                    />
                  </SvgIcon>
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
                <a href="../Notification">
                <Tooltip title="Notification" interactive>
                  <IconButton>
                    <Badge badgeContent={2} color="secondary">
                      <img src={NotifyIcon} />
                    </Badge>
                  </IconButton>
                  </Tooltip>
                </a>
                <Tooltip title="Chat" interactive>
                <IconButton>
                <Badge badgeContent={4} color="secondary">
                  <img src={ChatIcon} />
                </Badge>
                </IconButton>
                </Tooltip>
                <a href="../Calendar">
                <Tooltip title="Calendar" interactive>
                  <IconButton>
                    <img src={CalendarIcon} />
                  </IconButton>
                  </Tooltip>
                </a>
                <a href="../setting">
                <Tooltip title="Settings" interactive>
                  <IconButton>
                    <img src={SettingsIcon} />
                  </IconButton>
                 </Tooltip> 
                </a>
                <a>
                <Tooltip title="Logout" interactive>
                  <IconButton onClick={this.logout} >
                    <img src={LogoutIcon} />
                  </IconButton>
                  </Tooltip>
                </a>

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
