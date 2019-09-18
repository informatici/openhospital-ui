import { IconButton } from "@material-ui/core";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import { IProps } from './NewPatient';

export function MyErrorSnackbar(props: IProps) {
  const { className, message, onClose } = props;
  const { classes } = this.props;
  return (<SnackbarContent className={clsx(classes[variant], className)} aria-describedby="client-snackbar" message=" SOMETHING WENT WRONG!" action={[
    <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
      <CloseIcon className={classes.icon} />
    </IconButton>,
  ]} />);
}

