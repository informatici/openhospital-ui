import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles<
  Theme,
  { type: "error" | "warning" | "info" | "success" }
>((theme) => ({
  root: (props) => ({
    display: "flex",
    border: `0.5px solid ${theme.palette[props.type].main}`,
    borderLeft: `8px solid ${theme.palette[props.type].main}`,
    borderRadius: 1,
    margin: "20px 0px",
    boxShadow: `0 1px 2px 0px black`,
    padding: "16px",
    columnGap: 8,
  }),
  main: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: (props) => ({
    ...theme.typography.h6,
    color: theme.palette[props.type].main,
  }),
  content: {
    flexGrow: 1,
    ...theme.typography.caption,
  },
  icon: (props) => ({
    color: theme.palette[props.type].main,
    display: "flex",
    alignItems: "center",
    padding: 8,
    height: "'100%'",
  }),
}));
