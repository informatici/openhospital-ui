import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    paper: {
      padding: 0,
      textAlign: "center",
      borderRadius: 10,
      background: theme.palette.primary.main,
      boxShadow: "0 4px 8px 0 rgba(48,49,51,0.1)",
    },

    paperPerson: {
      display: "flex",
      justifyContent: "center",
    },

    paperFlat: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      borderRadius: "none",
      background: theme.palette.primary.main,
      boxShadow: "none",
      width: "100%",
    },

    gridContainer: {
      margin: "0 auto",
      paddingTop: 30,
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
    },

    breadCrumb: {
      fontWeight: "bold",
      fontSize: 12,
      letterSpacing: 0.75,
    },

    billingTitle: {
      fontWeight: "bold",
      fontSize: 16,
      letterSpacing: 1,
    },

    findBilling: {
      fontWeight: "bold",
      fontSize: 14,
      letterSpacing: 0.88,
      textAlign: "left",
      paddingRight: 20,
    },

    findService: {
      fontWeight: "bold",
      fontSize: 14,
      letterSpacing: 0.88,
      textAlign: "left",
      paddingRight: 20,
    },

    findPayment: {
      fontWeight: "bold",
      fontSize: 14,
      letterSpacing: 0.88,
      textAlign: "left",
      paddingRight: 20,
      paddingBottom: 30,
    },

    findSummary: {
      fontWeight: "bold",
      fontSize: 14,
      letterSpacing: 0.88,
      textAlign: "left",
      paddingRight: 20,
      paddingBottom: 30,
    },

    insertInfoBilling: {
      fontSize: 14,
      letterSpacing: 0.78,
      textAlign: "left",
      wordWrap: "break-word",
    },

    insertInfoService: {
      fontSize: 14,
      letterSpacing: 0.78,
      textAlign: "left",
      wordWrap: "break-word",
    },

    insertStatusPayment: {
      fontSize: 14,
      letterSpacing: 0.78,
      textAlign: "left",
      wordWrap: "break-word",
    },

    insertInfoCashier: {
      fontSize: 14,
      letterSpacing: 0.78,
      textAlign: "left",
      wordWrap: "break-word",
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

    formFieldInputCashier: {
      padding: "2px 0px 11px",
      "& input": {
        padding: 6,
      },
      marginTop: "-5px",
    },

    formFieldInputNotes: {
      padding: "10px",
    },

    formFieldInputLabel: {
      transform: "translate(14px, 14px) scale(1)",
    },

    formFieldSelect: {
      marginTop: "16px",
      marginBottom: "8px",
    },

    formFieldSelectService: {
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
        border: "1px solid",
        backgroundColor: theme.palette.primary.white,
        padding: "6px 0 !important",
      },
    },

    selectLabel: {
      transform: "translate(0px, -20px) scale(1) !important",
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

    inputContainer: {
      display: "flex",
    },

    billingContainer: {
      paddingTop: 20,
      paddingBottom: 20,
    },

    divider: {
      backgroundColor: "#8D8D8D",
      // opacity: 0.2,
      width: "100%",
    },

    media: {
      height: 10,
      width: 10,
    },

    statusInfoPayment: {
      fontWeight: "bold",
      fontSize: "30px",
      textAlign: "left",
    },

    formatFormPayment: {
      float: "left",
      width: "38.33%",
      padding: "50px",
    },

    formatFormPaymentButton: {
      float: "left",
      width: "10.33%",
      padding: "55px",
    },

    billingbuttonBill: {
      textTransform: "none",
      color: theme.palette.primary.red,
      fontWeight: "bold",
      borderRadius: 20,
      maxWidth: 145,
      "&:hover": {
        color: theme.palette.primary.white,
        background: theme.palette.primary.red,
      },
    },

    billingbuttonPay: {
      textTransform: "none",
      color: theme.palette.primary.red,
      fontWeight: "bold",
      borderRadius: 20,
      width: 145,
      "&:hover": {
        color: theme.palette.primary.white,
        background: theme.palette.primary.red,
      },
    },

    buttonIcon: {
      marginRight: 5,
    },

    buttonLabel: {
      justifyContent: "center",
      width: 100,
    },

    formatPaymentButtonBill: {
      padding: "5px 0px",
      width: "50%",
      marginTop: 96,
      fontWeight: "bold",
    },

    formatPaymentButtonPay: {
      padding: "5px 0px",
      width: "50%",
      marginTop: 60,
      fontWeight: "bold",
    },

    boxInfo: {
      display: "flex",
      paddingBottom: 10,
    },

    boxItem: {
      display: "flex",
      flex: 1,
      textAlign: "center",
      borderRadius: 0,
      boxShadow: "none",
      border: "1px solid ",
    },

    numberOf: {
      fontSize: 48,
      fontWeight: "bold",
      letterSpacing: 1,
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

    formFieldSelectDetails: {
      padding: "1px 61px",
    },
  });

export default styles;
