import * as React from "react";
import _ from "lodash";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link as LinkRouter } from "react-router-dom";
import { MaterialLinkRouter, MaterialButtonRouter } from "../../utils/LinkHelper";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import Tooltip from '@material-ui/core/Tooltip';
import styles from "./PatientVaccine.style";
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
      <div className={classes.root}>
        <Grid container className={classes.gridContainer} justify="center" spacing={24}>
          <Grid container item spacing={24}>
            <Grid item xs={12}>
              <Breadcrumbs aria-label="Breadcrumb" className={classes.breadCrumb}>
                <MaterialLinkRouter color="secondary" component={LinkRouter} to="/dashboard">
                  Home
                </MaterialLinkRouter>
                <MaterialLinkRouter color="secondary" component={LinkRouter} to="/patientsDatabase">
                  <Typography color="inherit">Patient Database</Typography>
                </MaterialLinkRouter>
                <Typography color="inherit">Patient Vaccine</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="inherit" className={classes.patientTitle}>
                PATIENT VACCINE
              </Typography>
            </Grid>
          </Grid>
          <Grid container item justify="center" spacing={24}>
            <Grid container item justify="center" spacing={24}>
              <Grid item xs={12} sm={3} className={classes.sidebar}>
                <Avatar alt="Remy Sharp" src={""} className={classes.avatar}>
                  <AddPhotoIcon />
                </Avatar>
                <Typography color="inherit" className={classes.avatarTitle}>
                  HEALTH INFORMATION
                </Typography>
                <Typography color="inherit" className={classes.patientIdTitle}>
                  PATIENT ID
                </Typography>
                <Typography color="inherit" className={classes.patientIdNumber}>
                  32040
                </Typography>
                <Typography color="inherit" className={classes.opdTitle}>
                  OPD
                </Typography>
                <Typography color="inherit" className={classes.opdNumber}>
                  8937821
                </Typography>
                <Typography color="inherit" className={classes.bloodGroup}>
                  Blood Group
                </Typography>
                <Typography color="inherit" className={classes.bloodType}>
                  A+
                </Typography>
                <Typography color="inherit" className={classes.notes}>
                  Notes:
                </Typography>
                <Typography color="inherit" className={classes.notesDetails}>
                  Pneumonia and malnutrition
                </Typography>
                <Typography color="inherit" className={classes.notesDetails}>
                  Grasses, Gluten
                </Typography>
                &emsp;
                <Divider className={classes.divider} />
                &emsp;
                <Typography color="inherit" className={classes.admissionDate}>
                  Last Admission:&nbsp;<b>22.01.2019</b>
                </Typography>
                <Typography color="inherit" className={classes.reasonVisit}>
                  Reason for visit:
                </Typography>
                <Typography color="inherit" className={classes.reasonVisitType}>
                  {" "}
                  Pneumonia and malnutrition
                </Typography>
                <Typography color="inherit" className={classes.treatment}>
                  Treatment made:
                </Typography>
                <Typography color="inherit" className={classes.treatmentType}>
                  {" "}
                  Pneumonia and malnutrition
                </Typography>
                <MaterialButtonRouter
                  style={{ marginTop: 30 }}
                  component={LinkRouter}
                  to="/"
                  variant="outlined"
                  color="inherit"
                  classes={classes.detailButtonLabelPrint}
                >
                  Print health information
                </MaterialButtonRouter>
              </Grid>
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
                  <MaterialButtonRouter component={LinkRouter} to="/patientDatabase/Vaccine" variant="outlined" color="inherit" classes={{ root: classes.detailNewVaccineButton, label: classes.detailButtonLabel }}>
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
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styledComponent = withStyles(styles, { withTheme: true })(PatientVaccine);
export default styledComponent;
