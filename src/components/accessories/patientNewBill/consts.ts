import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const ItemGroups = {
  medical: {
    id: "MED",
    value: "bill.medical",
  },
  surgery: {
    id: "OPE",
    value: "bill.surgery",
  },
  other: {
    id: "CST",
    value: "bill.other",
  },
  exam: {
    id: "EXA",
    value: "bill.exam",
  },
};
