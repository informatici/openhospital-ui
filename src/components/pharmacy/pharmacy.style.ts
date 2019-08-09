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

    gridContainerTable: {
      margin: "0 auto",
      paddingTop: 30,
      display: "table-caption",
      paddingLeft: 45,
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

    pharmacyTitle: {
      fontWeight: "bold",
      fontSize: 16,
      letterSpacing: 1,
    },

    pharmacyLink: {
      fontWeight: "bold",
      fontSize: 20,
      letterSpacing: 1,
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
      padding: "10px 58px",
    },

    buttonLabel: {
      justifyContent: "center",
      width: 10,
    },

    buttonInventory: {
      textTransform: "none",
      margin: 5,
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
      padding: "10px 15px",
    },

    buttonLabelInventory: {
      justifyContent: "center",
      width: 230,
    },

    paper: {
      padding: 10,
      borderRadius: 10,
      background: theme.palette.primary.main,
      boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
    },

    paperStock: {
      padding: 10,
      width: 330,
      marginLeft: -20,
      borderRadius: 10,
      background: theme.palette.primary.main,
      boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
    },

    paperMovements: {
      padding: 10,
      width: 403,
      marginLeft: -43,
      borderRadius: 10,
      background: theme.palette.primary.main,
      boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
    },

    paperFlat: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      borderRadius: "none",
      background: theme.palette.primary.main,
      boxShadow: "none",
      width: "25%",
    },

    findStock: {
      fontWeight: "bold",
      fontSize: 15,
      letterSpacing: 0.88,
      textAlign: "left",
      paddingRight: 20,
    },

    findStockFilter: {
      fontWeight: "bold",
      fontSize: 15,
      letterSpacing: 0.88,
      paddingTop: 8,
      textAlign: "left",
      paddingRight: 10,
      paddingLeft: 0,
      marginLeft: 50
    },
     
    findMovementsFilter: {
      fontWeight: "bold",
      fontSize: 15,
      letterSpacing: 0.88,
      paddingTop: 8,
      textAlign: "left",
      paddingRight: 10,
      paddingLeft: 0,
      marginLeft: 20
    },

    formField: {
      width: "100%",
    },

    formFieldSelectInput: {
      padding: "6px 0 !important",
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

    select: {
      padding: "6px 0 !important",
      "& :focus": {
        borderRadius: "6px !important",
        border: "1px solid",
        backgroundColor: theme.palette.primary.white,
        padding: "6px 0 !important",
      },
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

    ////////// TABLE STYLES //////////

    rootTable: {
      width: "50%",
      padding: "8px 20px 4px 24px",
      textAlign: "center",
      overflowX: "auto",
    },

    stockTableTitle: {
      fontWeight: "bold",
      fontSize: 20,
      letterSpacing: 1,
      paddingRight: 2,
      paddingLeft: 0,
    },

    stockTableSubtitle: {
      fontWeight: "bold",
      fontSize: 11,
      letterSpacing: 1,
    },

    movementsTableTitle: {
      fontWeight: "bold",
      fontSize: 22,
      letterSpacing: 1,
    },

    movementsTableSubtitle: {
      fontWeight: "bold",

      fontSize: 12,
      letterSpacing: 1,
    },

    table: {
      minWidth: 650,
    },

    boxInfo: {
      display: "flex",
      height: "15px",
      width: "16px",
    },

    boxItem: {
      display: "flex",
      flex: 1,
      textAlign: "center",
      borderRadius: 0,
      boxShadow: "none",
    },

    boxItemZero: {
      marginTop: 50,
      display: "flex",
      width: "120px",
      height: "30px",
      flex: 1,
      textAlign: "left",
      marginBottom: 10,
      borderRadius: 0,
      boxShadow: "none",
      border: "2px solid red",
    },

    boxItemOne: {
      display: "flex",
      width: "250px",
      height: "30px",
      flex: 1,
      textAlign: "left",
      marginBottom: 10,
      borderRadius: 0,
      boxShadow: "none",
      border: "2px solid green",
    },

    boxItemTwo: {
      display: "flex",
      width: "150px",
      height: "30px",
      flex: 1,
      textAlign: "left",
      marginBottom: 10,
      borderRadius: 0,
      boxShadow: "none",
      border: "2px solid orange",
    },

    boxItemThree: {
      display: "flex",
      width: "300px",
      height: "30px",
      flex: 1,
      textAlign: "left",
      marginBottom: 10,
      borderRadius: 0,
      boxShadow: "none",
      border: "2px solid blue",
    },

    boxItemFour: {
      display: "flex",
      width: "250px",
      height: "30px",
      flex: 1,
      textAlign: "left",
      marginBottom: 10,
      borderRadius: 0,
      boxShadow: "none",
      border: "2px solid brown",
    },

    boxItemFive: {
      display: "flex",
      width: "180px",
      height: "30px",
      flex: 1,
      textAlign: "left",
      marginBottom: 10,
      borderRadius: 0,
      boxShadow: "none",
      border: "2px solid orange",
    },

    numberOf: {
      fontSize: 23,
      fontWeight: "bold",
      letterSpacing: 1,
      paddingLeft: 16,
    },

    object: {
      fontSize: 14,
      fontWeight: "bold",
      letterSpacing: 0.26,
    },

    subTitle: {
      fontSize: 10,
      fontWeight: "bold",
      letterSpacing: 0.2,
    },

    cardSubtitle: {
      fontSize: 15,
      fontWeight: "bold",
      letterSpacing: 0.2,
    },

    formatTable: {
      float: "left",
      width: "49%",
    },

    buttonTable: {
      textTransform: "none",
      color: theme.palette.primary.red,
      fontWeight: "bold",
      borderRadius: 20,
      "&:hover": {
        color: theme.palette.primary.white,
        background: theme.palette.primary.red,
      },

      lineHeight: 0.75,
    },

    buttonLabelTable: {
      width: 10,
      height: 40,
    },

    ////////// END TABLE STYLES //////////

    paperDetailsMovements: {
      padding: 9,
      height: 650,
      marginTop: 0,
      width: 753,
      marginRight: 0,
      borderRadius: 10,
      background: theme.palette.primary.main,
      boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
    },

    paperDetailsStock: {
      padding: 10,
      height: 707,
      marginTop: 0,
      width: 803,
      marginRight: -150,
      borderRadius: 10,
      background: theme.palette.primary.main,
      boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
    },
  });

export default styles;
