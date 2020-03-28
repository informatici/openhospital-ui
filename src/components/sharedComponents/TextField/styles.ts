import { createStyles, Theme } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginBottom: "14px",
      [theme.breakpoints.down("xs")]: {
        marginBottom: "5px",
      },
    },

    formField: {
      width: "100%",
    },

    input: {
      [theme.breakpoints.down("sm")]: {
        padding: "15px 10px",
        fontSize: "14px",
      },
    },

    formFieldInputLabel: {
      transform: "translate(14px, 20.5px) scale(1)",
      backgroundColor: "white",
      borderRadius: 2,
      padding: "1px",
      [theme.breakpoints.down("sm")]: {
        transform: "translate(9px, 15.5px) scale(1)",
        fontSize: 14,
      },
    },

    cssFocused: {
      "&$cssFocused": {
        transform: "translate(5px, -20px) scale(0.85)",
      },
    },

    cssOutlinedInput: {
      borderColor: `${theme.palette.primary.inputBorder} !important`,
      [theme.breakpoints.down("sm")]: {
        // height: 7,
      },
      "& legend": {
        width: "0 !important",
      },
    },

    helperText: {
      margin: "10px 0px 0px 0px",
      position: "absolute",
      top: 53,
      [theme.breakpoints.down("sm")]: {
        top: 43,
      },
    },
  });
