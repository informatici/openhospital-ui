import * as React from "react";
import _ from "lodash";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link as LinkRouter } from "react-router-dom";
import { MaterialLinkRouter, MaterialButtonRouter } from "../utils/LinkHelper";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import Tooltip from '@material-ui/core/Tooltip';
import styles from "./styles/PatientVaccination.style";
import MUIDataTable from "mui-datatables";
export interface Props extends WithStyles<typeof styles> {}

interface State {
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  items: any;
}

class PatientVaccine extends React.Component<Props, State> {
  state: State = {
    labelWidth: 0,
    error: null,
    isLoaded: false,
    items: [],
  };

  public render() {
    const { classes } = this.props;

    const columns = ["Date","Vaccine","Vaccine Type"] ;
      
      const data = [
        ['15/09/2019',"BCG","CHILD"],
        ['12/06/2017',"POLIO","CHILD"],
        ['15/09/2016',"MEASLES","NO PREGNANT"],
        ['15/09/2014',"VACCINE DOSE 1","PREGNANT"],
        ['15/09/2010',"BCG","CHILD"],
        ['15/09/2019',"BCG","CHILD"],
        ['12/06/2017',"POLIO","CHILD"],
        ['15/09/2016',"MEASLES","NO PREGNANT"],
        ['15/09/2014',"VACCINE DOSE 1","PREGNANT"],
        ['15/09/2010',"BCG","CHILD"],
        ['15/09/2019',"BCG","CHILD"],
        ['12/06/2017',"POLIO","CHILD"],
        ['15/09/2010',"BCG","CHILD"],
        ['15/09/2019',"BCG","CHILD"],
        ['12/06/2017',"POLIO","CHILD"],
        ['15/09/2016',"MEASLES","NO PREGNANT"],
        ['15/09/2014',"VACCINE DOSE 1","PREGNANT"],
        ['15/09/2010',"BCG","CHILD"],
      ];

      const options = {
        filterType:'dropdown',
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
          <Tooltip title="Prescribe new Vaccine" interactive>
          <MaterialButtonRouter component={LinkRouter} to="/patient-database/new-vaccination" variant="outlined" color="inherit" classes={{ root: classes.detailNewVaccineButton, label: classes.detailButtonLabel }}>
           New Vaccine
          </MaterialButtonRouter>
          </Tooltip>
        </Grid>
        &emsp;
        <Divider className={classes.divider} />
        &emsp;
        <MUIDataTable
          className={classes.patientExamination}
          title={"VACCINE"}
          data={data}
          columns={columns}
          options={options}
        />
      </Grid>
    );
  }
}

const styledComponent = withStyles(styles, { withTheme: true })(PatientVaccine);
export default styledComponent;
