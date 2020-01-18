import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    formField: {
      width: "100%",
    },
    cssOutlinedInput: {
      borderColor: `${theme.palette.primary.inputBorder} !important`,
      "& legend": {
        width: "0 !important",
      },
    },
    formFieldInputLabel: {
      transform: "translate(14px, 19px) scale(1)",
      backgroundColor: "white",
      borderRadius: 2,
      padding: "1px",
    },
    cssFocused: {
      "&$cssFocused": {
        transform: "translate(5px, -20px) scale(0.85)",
      },
    },
    formFieldInput: {
      padding: "6px 0",
      "& input": {
        padding: 6,
      },
    },
  });

export default styles;