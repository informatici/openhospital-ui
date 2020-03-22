import { createStyles, Theme } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    formField: {
      width: "100%",
    },

    input: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 12,
      },
    },

    formFieldInputLabel: {
      transform: "translate(14px, 19px) scale(1)",
      backgroundColor: "white",
      borderRadius: 2,
      padding: "1px",
      [theme.breakpoints.down("sm")]: {
        fontSize: 12,
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
  });
