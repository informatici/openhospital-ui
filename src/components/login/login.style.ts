import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    gridContainer: {
      margin: "0 auto",
      paddingTop: 30,
    },

    loginContainer: {
      margin: "0 auto",
      paddingTop: 30,
      float: "left",
      width: "50%",
    },

    summaryContainer: {
      margin: "0 auto",
      paddingTop: 30,
      float: "right",
      width: "50%",
    },

    gridButtonContainer: {
      margin: "10px auto",
      paddingTop: 0,
      paddingLeft: 0,
    },

    divider: {
      backgroundColor: "#8D8D8D",
      width: "100%",
    },

    summaryDivider: {
      backgroundColor: theme.palette.primary.white,
      width: "100%",
    },

    forgotContainer: {
      margin: "10px auto",
      paddingTop: 0,
      paddingLeft: 0,
      flexFlow: "row-reverse",
      marginRight: "80px",
      marginTop: 0,
    },

    forgotLink: {
      color: theme.palette.primary.red,
      fontWeight: "bold",
      fontSize: 12,
    },

    notRegisterContainer: {
      margin: "10px auto",
      paddingTop: 0,
      paddingLeft: 0,
    },

    notRegisterLink: {
      color: theme.palette.primary.red,
      fontWeight: "bold",
      fontSize: 15,
    },

    breadCrumb: {
      fontWeight: "bold",
      fontSize: 12,
      letterSpacing: 0.75,
    },

    paper: {
      padding: 0,
      textAlign: "center",
      borderRadius: 10,
      background: theme.palette.primary.main,
      boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
      float: "left",
    },

    paperFlat: {
      padding: "15px",
      textAlign: "left",
      borderRadius: "none",
      background: theme.palette.primary.main,
      boxShadow: "none",
      width: "100%",
      marginTop: "50px",
    },

    summaryPaperFlat: {
      padding: "15px",
      textAlign: "left",
      borderRadius: "none",
      background: "#fb5f5b",
      boxShadow: "none",
      width: "106%",
      marginTop: "50px",
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

    cssOutlinedInput: {
      borderColor: `${theme.palette.primary.inputBorder} !important`,
      "& legend": {
        width: "0 !important",
      },
    },

    cssFocused: {
      "&$cssFocused": {
        transform: "translate(0px, -20px) scale(1)",
      },
    },

    errorMsg: {
      color: "#cc0000",
      marginBottom: "12px",
    },

    button: {
      textTransform: "none",
      color: theme.palette.primary.red,
      fontWeight: "bold",
      borderRadius: 20,
      "&:hover": {
        color: theme.palette.primary.white,
        background: theme.palette.primary.red,
      },
      "&.mergeButton,&.addButton": {
        marginLeft: 40,
      },
      padding: "12px 55px",
    },

    buttonLabel: {
      justifyContent: "flex-end",
    },

    loadMoreContainer: {
      display: "flex",
      justifyContent: "center",
    },

    logo: {
      display: "flex",
      justifyContent: "center",
      width: "40%",
    },

    inTitle: {
      color: theme.palette.primary.white,
      fontWeight: "bold",
      fontSize: 25,
      textAlign: "center",
    },

    inSummary: {
      color: theme.palette.primary.white,
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
    },

    boxItem: {
      display: "table-cell",
      flex: 1,
      backgroundColor: "#fb5f5b",
      textAlign: "center",
      borderRadius: 0,
      boxShadow: "none",
      border: "1px solid ",
      borderColor: "white",
      width: 70,
    },

    numberOf: {
      fontSize: 30,
      fontWeight: "bold",
      color: theme.palette.primary.white,
      margin: "0px 0px",
    },

    subTitle: {
      fontSize: 10,
      fontWeight: "bold",
      color: theme.palette.primary.white,
      letterSpacing: 0.2,
      margin: "0px 0px",
    },

    subTitleSpec: {
      fontSize: 8,
      fontWeight: "bold",
      color: theme.palette.primary.white,
      letterSpacing: 1.5,
      margin: "0px 0px",
    },
  });

export default styles;
