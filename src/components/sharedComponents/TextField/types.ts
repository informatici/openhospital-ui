import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { FieldInputProps } from "formik";

interface ITextFieldProps {
  classes: Record<string, any>;
  field: FieldInputProps<any>;
  label: string;
  type?: string;
  isValid: boolean;
  errorText: string;
}

export type IProps = ITextFieldProps & WithStyles<typeof styles>;
