import * as React from "react";
import _ from "lodash";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link as LinkRouter } from "react-router-dom";
import { MaterialLinkRouter, MaterialButtonRouter } from "../utils/LinkHelper";
import classNames from "classnames";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import styles from "./styles/Opd.style";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from '@material-ui/core/TextField';
import MUIDataTable from "mui-datatables";

// constants
import { PATH_NEW_OPD } from "../../config/constants"

export interface Props extends WithStyles<typeof styles> { }

interface State {
  InputLabelRef: number;
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  items: any;
  
}

class PatientOpd extends React.Component<Props, State> {
  state: State = {
    labelWidth: 0,
    error: null,
    isLoaded: false,
    items: [],
    InputLabelRef: 0
    
  }

  public render() {
    const { classes } = this.props;
    
    const columns = ["Date","Disease","Disease Type","Status"];
    
    const data = [
      ["15/09/2019","Meningitis","Priority infectious deseases","new"],
      ["15/09/2019","Meningitis","Priority infectious deseases","new"],
      ["15/09/2019","Meningitis","Priority infectious deseases","new"],
      ["15/09/2019","Meningitis","Priority infectious deseases","new"],
      ["15/09/2019","Meningitis","Priority infectious deseases","new"],
    ];

    const options = {
      filterType: 'checkbox',
    };

    return (
      <Grid item xs={12} sm={9} className={classes.patientContent}>
        <Grid item xs={12} className={classes.patientProfileHeader}>
          <div style={{ flexDirection: "column", textAlign: "left" }}>
            <Typography color="inherit" className={classes.patientName}>
              Modotoky Tokai
            </Typography>
            <Typography color="inherit" className={classes.patientAddress}>
              Provenance: <b>District, Village</b>
            </Typography>
          </div>
          <MaterialButtonRouter component={LinkRouter} to={PATH_NEW_OPD} variant="outlined" color="inherit" classes={{ root: classes.opdButton }}>
             Create New OPD
          </MaterialButtonRouter>
        </Grid>
        &emsp;
        <Divider className={classes.divider} />
        &emsp;
        
        <MUIDataTable
         title={"OPD HISTORY"}
         data={data}
         columns={columns}
         options={options}
         />
        
      </Grid>
    );
  }
}

const styledComponent = withStyles(styles, { withTheme: true })(PatientOpd);
export default styledComponent;
