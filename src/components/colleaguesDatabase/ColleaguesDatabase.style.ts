import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      // marginTop: 50
    },
    paper: {
      // padding: theme.spacing.unit * 2,
      padding: 0,
      textAlign: "center",
      // color: theme.palette.text.secondary,
      borderRadius: 10,
      background: theme.palette.primary.main,
      boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
    },
    paperPerson: {
      display: "flex",
      justifyContent: "center",
    },
    paperFlat: {
      // display: 'flex',
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      // color: theme.palette.text.secondary,
      borderRadius: "none",
      background: theme.palette.primary.main,
      boxShadow: "none",
      width: "100%",
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

    colleaguesTitle: {
      fontWeight: "bold",
      fontSize: 16,
      letterSpacing: 1,
    },
    findColleagues: {
      fontWeight: "bold",
      fontSize: 14,
      letterSpacing: 0.88,
      textAlign: "left",
      paddingRight: 20,
    },
    insertInfoColleagues: {
      fontSize: 14,
      letterSpacing: 0.78,
      textAlign: "left",
    },
    detailButtonContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    detailButton: {
      textTransform: "none",
      color: theme.palette.primary.red,
      fontWeight: "bold",
      borderRadius: 20,
      marginBottom: "8px",
      "&:hover": {
        color: theme.palette.primary.white,
        background: theme.palette.primary.red,
      },
    },
    detailButtonLabel: {
      justifyContent: "flex-end",
    },
    formField: {
      width: "100%",
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
    formFieldSelect: {
      marginTop: "16px",
      marginBottom: "8px",
    },
    formFieldSelectInput: {
      padding: "6px 0 !important",
    },
    select: {
      padding: "6px 0 !important",
      "& :focus": {
        borderRadius: "6px !important",
        border: `1px solid ${theme.palette.primary.inputBorder} !important`,
        backgroundColor: theme.palette.primary.white,
        padding: "6px 0 !important",
      },
    },
    selectLabel: {
      // '&$focused': {
      // color: 'purple !important',
      transform: "translate(0px, -20px) scale(1) !important",
      // },
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
    inputContainer: {
      display: "flex",
    },
    avatar: {
      height: 104,
      width: 104,
      margin: "0 auto",
      border: "4px solid #e6e6e6",
      "&.avatarSmall": {
        height: 44,
        width: 44,
        margin: 0,
      },
    },
    colleagueContainer: {
      paddingTop: 0,
      paddingBottom: 20,
      marginTop: 0,
    },
    cardAction: {
      borderBottom: `1px solid ${theme.palette.primary.lightGrey}`,
      "&:hover $avatar": {
        border: `4px solid ${theme.palette.primary.red}`,
      },
    },
  });

export default styles;
