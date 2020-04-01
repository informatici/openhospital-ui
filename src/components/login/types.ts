import { WithStyles } from "@material-ui/core";
import styles from "./login.style";

interface ILoginProps {
  successRoute: string;
}

export type TLoginProps = ILoginProps & WithStyles<typeof styles>;

export type TSummaryBoard = WithStyles<typeof styles>;
