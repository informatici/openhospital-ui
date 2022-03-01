import { BillItemFormFieldName } from "./itemPicker/types";
import { TFields } from "../../../libraries/formDataHandling/types";
import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
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
