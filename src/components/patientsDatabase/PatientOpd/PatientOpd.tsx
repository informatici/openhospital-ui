import * as React from "react";
import _ from "lodash";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link as LinkRouter } from "react-router-dom";
import { MaterialLinkRouter, MaterialButtonRouter } from "../../utils/LinkHelper";
import classNames from "classnames";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddPhotoIcon from "@material-ui/icons/AddAPhoto";
import styles from "./PatientOpd.style";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from '@material-ui/core/TextField';
import MUIDataTable from "mui-datatables";
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
                <Typography color="inherit">Patient OPD</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="inherit" className={classes.patientTitle}>
                PATIENT OPD
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
                  <MaterialButtonRouter component={LinkRouter} to="/patientDatabase/Opd" variant="outlined" color="inherit" classes={{ root: classes.opdButton }}>
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
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styledComponent = withStyles(styles, { withTheme: true })(PatientOpd);
export default styledComponent;
