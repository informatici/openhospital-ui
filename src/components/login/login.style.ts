import { createStyles, Theme } from "@material-ui/core/styles";

const defaultItemWidth = 180;
const smItemWidth = 150;
const xsItemWidth = 100;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    gridContainer: {
      display: "flex",
      margin: "0 auto",
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 10,
      paddingRight: 10,
      alignContent: "center",
      alignItems: "center",
      flexDirection: "column",
      [theme.breakpoints.down("xs")]: {
        padding: 0,
      },
    },

    loginPanel: {
      display: "flex",
      marginTop: "2.6%",
      marginBottom: "2.6%",
      marginLeft: 10,
      marginRight: 10,
      flexDirection: "column",
      alignItems: "center",
      margin: "0 auto",
      width: 700,
      [theme.breakpoints.down("md")]: {
        width: 700,
        marginTop: "2.6%",
        marginBottom: "2.6%",
      },
      [theme.breakpoints.down("sm")]: {
        width: 550,
        marginTop: "5.9%",
        marginBottom: "5.9%",
      },
      [theme.breakpoints.down("xs")]: {
        width: 300,
        marginTop: "11%",
        marginBottom: "11%",
      },
    },

    loginForm: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      margin: "0 auto",
      paddingTop: 15,
      paddingBottom: 15,
      width: "60%",
      [theme.breakpoints.down("sm")]: {
        width: "60%",
      },
      [theme.breakpoints.down("xs")]: {
        paddingTop: 0,
        paddingBottom: 0,
        width: "75%",
      },
    },

    scrollIn: {
      display: "flex",
      justifyContent: "center",
      cursor: "pointer",
    },

    summaryPanel: {
      display: "flex",
      marginTop: 15,
      marginBottom: 15,
      marginLeft: 10,
      marginRight: 10,
      flexDirection: "column",
      alignItems: "center",
      margin: "0 auto",
      width: 700,
      [theme.breakpoints.down("md")]: {
        width: 700,
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        marginLeft: 0,
        marginRight: 0,
      },
    },

    summaryTable: {
      display: "flex",
      flexWrap: "wrap",
      margin: "auto",
      marginBottom: 30,
      width: defaultItemWidth * 3,
      [theme.breakpoints.down("sm")]: {
        width: smItemWidth * 3,
      },
      [theme.breakpoints.down("xs")]: {
        width: xsItemWidth * 3,
      },
    },

    tableItem: {
      height: 100,
      border: "1px solid ",
      borderColor: "white",
      width: defaultItemWidth,
      [theme.breakpoints.down("sm")]: {
        width: smItemWidth,
      },
      [theme.breakpoints.down("xs")]: {
        width: xsItemWidth,
      },
    },

    breakTableItem: {
      flexBasis: "100%",
      border: "1px solid ",
      borderColor: "white",
      height: 100,
    },

    gridButtonContainer: {
      display: "flex",
      justifyContent: "center",
      paddingTop: 0,
      paddingLeft: 0,
      margin: 10,
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
      textAlign: "center",
    },

    forgotLink: {
      color: theme.palette.primary.red,
      fontWeight: "bold",
      fontSize: 12,
      [theme.breakpoints.down("xs")]: {
        fontSize: 10,
      },
    },

    notRegisterContainer: {
      margin: "10px auto",
      paddingTop: 0,
      paddingLeft: 0,
      [theme.breakpoints.down("xs")]: {
        fontSize: 10,
      },
    },

    notRegisterLink: {
      color: theme.palette.primary.red,
      fontWeight: "bold",
      fontSize: 15,
      [theme.breakpoints.down("xs")]: {
        fontSize: 12,
      },
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
      // width: "106%",
      marginTop: "50px",
      width: "100%",
    },

    formField: {
      width: "100%",
    },

    formFieldInputLabel: {
      transform: "translate(14px, 19px) scale(1)",
      backgroundColor: "white",
      borderRadius: 2,
      padding: "1px",
    },

    cssOutlinedInput: {
      borderColor: `${theme.palette.primary.inputBorder} !important`,
      "& legend": {
        width: "0 !important",
      },
    },

    cssFocused: {
      "&$cssFocused": {
        transform: "translate(5px, -20px) scale(0.85)",
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
      marginTop: 10,
      fontSize: 14,
      padding: "10px 40px",
      "&:hover": {
        color: theme.palette.primary.white,
        background: theme.palette.primary.red,
      },
      "&.mergeButton,&.addButton": {
        marginLeft: 40,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 12,
        padding: "5px 20px",
      },
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
      width: "100%",
      height: "100%",
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
      fontSize: 12,
      fontWeight: "bold",
      color: theme.palette.primary.white,
      letterSpacing: 1.5,
      margin: "0px 0px",
      [theme.breakpoints.down("xs")]: {
        fontSize: 9,
      },
    },
  });

export default styles;
