import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      // marginTop: 50
    },

    gridContainer: {
      margin: "0 auto",
      paddingTop: 30,
    },

    breadCrumb: {
      fontWeight: "bold",
      fontSize: 12,
      letterSpacing: 0.75,
    },

    divider: {
      backgroundColor: "#8D8D8D",
      width: "100%",
    },

    paper: {
      padding: 0,
      width: "80%",
      borderRadius: 10,
      margin: "0 auto",
      background: theme.palette.primary.main,
      boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
    },

    settingTitle: {
      fontWeight: "bold",
      fontSize: 25,
      letterSpacing: 1,
    },

    sidebar: {
      backgroundColor: theme.palette.primary.darkGrey,
      color: theme.palette.primary.white,
      padding: "40px 30px !important",
    },

    avatar: {
      height: 200,
      width: 200,
      margin: "0 auto",
      border: "4px solid #e6e6e6",
      "&.avatarSmall": {
        height: 80,
        width: 80,
        margin: 0,
      },
    },

    avatarTitle: {
      marginTop: 30,
      textAlign: "center",
    },
    formField: {
      width: "100%",
      margin: "8px 0 !important",
    },
    formFieldInput: {
      padding: "6px 0",
      "& input": {
        padding: 6,
      },
    },
    formFieldInputLabel: {
      transform: "translate(14px, 14px) scale(1)",
    },

    colleagueContent: {
      backgroundColor: "#F9F9F9",
      padding: "40px !important",
    },

    cssOutlinedInput: {
      borderColor: `${theme.palette.primary.inputBorder} !important`,
      "& legend": {
        width: "0 !important",
      },
    },
    cssFocused: {
      "&$cssFocused": {
        // color: 'purple',
        transform: "translate(0px, -20px) scale(1)",
      },
    },

    buttonLabel: {
      justifyContent: "center",
      width: 10,
    },

    button: {
      textTransform: "none",
      color: theme.palette.primary.red,
      fontWeight: "bold",
      fontSize: "18px",
      "&:hover": {
        color: theme.palette.primary.white,
        background: theme.palette.primary.red,
      },
      "&.mergeButton,&.addButton": {
        marginLeft: 40,
      },
    },
  });

export default styles;
