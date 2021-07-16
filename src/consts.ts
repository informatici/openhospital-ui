import { createMuiTheme } from "@material-ui/core";

export const AUTH_KEY = "auth";
export const PERMISSION_KEY = "permission";

export const DATEPICKERTHEME = createMuiTheme({
  palette: {
    primary: {
      main: "#444444",
    },
    secondary: {
      light: "#444444",
      main: "#444444",
      contrastText: "#444444",
    },
  },
});
