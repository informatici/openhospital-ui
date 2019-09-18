import { Card, Grid, Link } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import PatientsListItem from "../PatientsDatabase/PatientsListItem";
import styles from './Ward.style';
export interface Props extends WithStyles<typeof styles> { }

interface State {
  labelWidth: number;
  error: any;
  isLoaded: boolean;
  items: any;
  value?: number;
  
}

class Ward extends React.Component {
  state: State = {
    labelWidth: 0,
    error: null,
    isLoaded: false,
    value: 0,
    
  };

  componentDidMount() {

    // <test>
    const item = {
        patientInfo: {
            isChronic: false,
            lastDocWhoVisitedHim: {
                    name: "Marcus",
                    surname: "Marcus",
                    occupation: "Anesthesiologist",
                    phone: "555 911 118",
                    email: "doc@hospital.org",
            }
            firstName: "Antônio",
            secondName: "Carlos Jobim",
            code: 123456,
            age: 87,
            sex: "M",
            gender: "undefined",
            photo: null,
        }
    };

    const items = [item, item, item, item, item, item, item];
    this.setState({ isLoaded: true, items, });
    // </test>
    
    // fetch("https://uinames.com/api/?ext&amount=9")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //         this.setState({
    //           isLoaded: true,
    //           items: result
    //         });
    //     },
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //     }
    //   )

    // this.setState({
    //   // labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    // });
  }

  handleChange = (event: React.MouseEvent<HTMLElement>, value: number) => {
    this.setState({ value });
  };

  public render() {
    const { classes } = this.props;
    const { items } = this.state;
    const { value } = this.state;

    const patients = (
      items && items.length !== 0 ?
        (items.map((item: any) => (
          <PatientsListItem
            info={item}
          />
        ))) :
        <CircularProgress
          className={classes.progress}
          color="secondary"
          style={{ margin: '20px auto' }} />
    )
    
    
    return (
      <div className={classes.root}>
        <Grid container item className={classes.gridContainer} justify="center" spacing={24}>
          <Grid item xs={12}>
            <Breadcrumbs aria-label="Breadcrumb" className={classes.breadCrumb}>
              <Link color="secondary" component={LinkRouter} to="/dashboard">
                Home
              </Link>
              <Typography color="inherit">Ward</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="inherit" className={classes.wardTitle}>
              WARD
            </Typography>
          </Grid>
          &emsp;
          <Divider className={classes.divider} />
          &emsp;
          <Grid item xs={12}>
          <Tabs
                indicatorColor="none"
                textColor="secondary"
                value={value}
                onChange={this.handleChange}
                variant="fullWidth"
              >
              <Tab className={classes.wardLink} label="Inpatient department (IPD)"/>
              &emsp;
              <Tab className={classes.wardLink} label="Outpatient department (OPD)"/>
            </Tabs>
          </Grid>
          </Grid>
          {value === 0 && (
            //INPATIENT DEPARTMENT//
            <div>
          <Grid container item className={classes.gridContainer} justify="center" spacing={24}>
        <Grid container item className={classes.gridContainer} justify="center" spacing={24}>
          <Paper className={classes.paperFlat}>
            <Grid container item spacing={24}>
              &emsp;
              <Grid item xs={12} className={classes.inputContainer}>
                <Typography variant="inherit" className={classes.findWard}>
                  SUMMARY
                </Typography>
              </Grid>
              <Grid container item className={classes.gridContainer} justify="center" spacing={24}>
              <Grid item className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%", padding: "2px" }}>
                    <Typography className={classes.numberOf}>14</Typography>
                    <Typography className={classes.object}>PATIENTS</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%", padding: "2px" }}>
                    <Typography className={classes.numberOf}>2</Typography>
                    <Typography className={classes.subTitle}>PATIENTS ADMITTED</Typography>
                    <Typography className={classes.object}>TODAY</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%", padding: "2px" }}>
                    <Typography className={classes.numberOf}>12</Typography>
                    <Typography className={classes.subTitle}>PATIENTS ADMITTED</Typography>
                    <Typography className={classes.object}>THIS MONTH</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%", padding: "2px" }}>
                    <Typography className={classes.numberOf}>46%</Typography>
                    <Typography className={classes.object}>BOR</Typography>
                    <Typography className={classes.subTitle}>(Bed Occupancy Rate)</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%", padding: "2px" }}>
                    <Typography className={classes.numberOf}>3.5</Typography>
                    <Typography className={classes.object}>AVERAGE LOSS</Typography>
                    <Typography className={classes.subTitle}>(Length of Stay)</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%", padding: "2px" }}>
                    <Typography className={classes.numberOf}>68%</Typography>
                    <Typography className={classes.object}>TOTAL BOR*</Typography>
                    <Typography className={classes.subTitle}>(Bed Occupancy Rate)</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%", padding: "2px" }}>
                    <Typography className={classes.numberOf}>4.7</Typography>
                    <Typography className={classes.object}>AVERAGE LOSS*</Typography>
                    <Typography className={classes.subTitle}>(Length of Stay)</Typography>
                  </CardContent>
                </Card>
              </Grid>
              </Grid>
              <Typography variant="inherit" >
                * Data related to all wards
              </Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid item container className={classes.gridContainer} justify='center' spacing={24}>
          <Paper className={classes.paperFlat}>
            <Grid container item spacing={24} className={classes.inputContainer}>
              <Grid item xs={12} style={{ display: 'flex' }}>
                <Typography variant="inherit" className={classes.findPatient}>
                  FIND A PATIENT
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="inherit" className={classes.findSubtitle}>
                  Find the patient in ward
                </Typography>
              </Grid>
            </Grid>
            <Grid container item spacing={24}>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="patientID"
                  label="Patient ID (PID)"
                  className={classNames(classes.formField, classes.cssOutlinedInput)}
                  InputLabelProps={{
                    classes: {
                      focused: classes.cssFocused,
                      root: classes.formFieldInputLabel,
                      
                    },
                  }}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.cssOutlinedInput,
                      root: classes.formFieldInput,
                      
                    },
                  }}

                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="Outpatient Number (ODP)"
                  label="Outpatient Number (ODP)"
                  className={classNames(classes.formField, classes.cssOutlinedInput)}
                  InputLabelProps={{
                    classes: {
                      root: classes.formFieldInputLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.formFieldInput,
                      notchedOutline: classes.cssOutlinedInput,
                    },
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="Inpatient Number (IDP)"
                  label="Inpatient Number (IDP)"
                  className={classNames(classes.formField, classes.cssOutlinedInput)}
                  InputLabelProps={{
                    classes: {
                      root: classes.formFieldInputLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.formFieldInput,
                      notchedOutline: classes.cssOutlinedInput,
                    },
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={2} style={{marginTop:16}}>
                <FormControl variant="outlined"
                  className={classNames(classes.formField, classes.formFieldSelect)}>
                  <InputLabel
                    htmlFor="​Range Age"
                    classes={{
                      root: classes.formFieldInputLabel,
                      focused: classes.selectLabel
                    }}
                  >
                    Range Age
                      </InputLabel>
                  <Select
                    className={classes.select}
                    input={
                      <OutlinedInput
                        name="Range Age"
                        id="Range Age"
                        classes={{
                          input: classes.formFieldSelectInput
                        }}
                      />
                    }
                  >
                    <MenuItem value={10}>0/3 mesi</MenuItem>
                    <MenuItem value={20}>6/12 mesi</MenuItem>
                    <MenuItem value={30}>12/24 mesi</MenuItem>
                    <MenuItem value={40}>24/48 mesi</MenuItem>
                    <MenuItem value={50}>5/8 anni</MenuItem>
                    <MenuItem value={60}>8/14 anni</MenuItem>
                    <MenuItem value={70}>15/20 anni</MenuItem>
                    <MenuItem value={80}>20/25 anni</MenuItem>
                    <MenuItem value={90}>30/35 anni</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2} style={{marginTop:16}}>
                <FormControl variant="outlined"
                  className={classNames(classes.formField, classes.formFieldSelect)}>
                  <InputLabel
                    htmlFor="​Gender"
                    classes={{
                      root: classes.formFieldInputLabel,
                      focused: classes.selectLabel
                    }}
                  >
                    Gender
                      </InputLabel>
                  <Select
                    className={classes.select}
                    input={
                      <OutlinedInput
                        name="Gender"
                        id="Gender"
                        classes={{
                          input: classes.formFieldSelectInput
                        }}
                      />
                    }
                  >
                    <MenuItem value={10}>Male</MenuItem>
                    <MenuItem value={20}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid container justify="flex-end" item spacing={24}>
                <Grid item xs={12} className={classes.searchButton}>
                  <Button variant="outlined" color="inherit" classes={{ root: classes.button, label: classes.buttonLabel }}>
                    Search
                    </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        &nbsp;
        <Grid container  item className={classes.filterContainer} justify="center" spacing={24}>
          <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
            <Typography variant="inherit">
              &emsp;<b>Which admitted patient are you searching for?</b>
              <p style={{ paddingLeft: '17px' }}>Use the filter for a faster search</p>
            </Typography>
          </Grid>
          <Grid container style={{ paddingTop: '15px', fontWeight: 'bold' }} justify='flex-end' xs={3}>Filter</Grid>
          <Grid item style={{ paddingTop: 0 }} xs={3} sm={3} >
            <FormControl variant='outlined' className={classNames(classes.formField, classes.formFieldSelect)}>
              <Select className={classes.select}
                input={
                  <OutlinedInput
                    labelWidth={300}
                    name="filter"
                    id="filter"
                    classes={{
                      input: classes.formFieldSelectInput
                    }}
                  />
                }
              >
                <MenuItem value={10}>Admitted today</MenuItem>
                <MenuItem value={20}>Admitted less than 3 days ago</MenuItem>
                <MenuItem value={30}>Admitted from 3 to 7 days ago</MenuItem>
                <MenuItem value={30}>Admitted more than 7 days ago</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container item  spacing={24}>
            {patients}
          </Grid>
          <Grid container item style={{padding: 30, justifyContent:"center"}}>
            <Button variant="outlined" color="inherit" justify="center" classes={{ root: classes.loadMoreButton }}>
              Load More
            </Button>
          </Grid>
        </Grid>
        </Grid>
        </div>
        )}
        {value === 1 && (
          //OUTPATIENT DEPARTMENT//
          <div>
             <Grid container item className={classes.gridContainer} justify="center" spacing={24}>
        <Grid container item className={classes.gridContainer} justify="center" spacing={24}>
          <Paper className={classes.paperFlat}>
            <Grid container item spacing={24}>
              &emsp;
              <Grid item xs={12} className={classes.inputContainer}>
                <Typography variant="inherit" className={classes.findWard}>
                  SUMMARY
                </Typography>
              </Grid>
              <Grid container item className={classes.gridContainer} justify="center" spacing={24}>
              <Grid item className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%", padding: "2px" }}>
                    <Typography className={classes.numberOf}>10</Typography>
                    <Typography className={classes.object}>PATIENTS</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%", padding: "2px" }}>
                    <Typography className={classes.numberOf}>5</Typography>
                    <Typography className={classes.subTitle}>PATIENTS ADMITTED</Typography>
                    <Typography className={classes.object}>TODAY</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%", padding: "2px" }}>
                    <Typography className={classes.numberOf}>15</Typography>
                    <Typography className={classes.subTitle}>PATIENTS ADMITTED</Typography>
                    <Typography className={classes.object}>THIS MONTH</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%", padding: "2px" }}>
                    <Typography className={classes.numberOf}>50%</Typography>
                    <Typography className={classes.object}>BOR</Typography>
                    <Typography className={classes.subTitle}>(Bed Occupancy Rate)</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%", padding: "2px" }}>
                    <Typography className={classes.numberOf}>3.8</Typography>
                    <Typography className={classes.object}>AVERAGE LOSS</Typography>
                    <Typography className={classes.subTitle}>(Length of Stay)</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%", padding: "2px" }}>
                    <Typography className={classes.numberOf}>68%</Typography>
                    <Typography className={classes.object}>TOTAL BOR*</Typography>
                    <Typography className={classes.subTitle}>(Bed Occupancy Rate)</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item className={classes.boxInfo}>
                <Card className={classNames(classes.boxItem)}>
                  <CardContent style={{ width: "100%", padding: "2px" }}>
                    <Typography className={classes.numberOf}>4.7</Typography>
                    <Typography className={classes.object}>AVERAGE LOSS*</Typography>
                    <Typography className={classes.subTitle}>(Length of Stay)</Typography>
                  </CardContent>
                </Card>
              </Grid>
              </Grid>
              <Typography variant="inherit" >
                * Data related to all wards
              </Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid item container className={classes.gridContainer} justify='center' spacing={24}>
          <Paper className={classes.paperFlat}>
            <Grid container item spacing={24} className={classes.inputContainer}>
              <Grid item xs={12} style={{ display: 'flex' }}>
                <Typography variant="inherit" className={classes.findPatient}>
                  FIND A PATIENT
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="inherit" className={classes.findSubtitle}>
                  Find the patient in ward
                </Typography>
              </Grid>
            </Grid>
            <Grid container item spacing={24}>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="patientID"
                  label="Patient ID (PID)"
                  className={classNames(classes.formField, classes.cssOutlinedInput)}
                  InputLabelProps={{
                    classes: {
                      focused: classes.cssFocused,
                      root: classes.formFieldInputLabel,
                      
                    },
                  }}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.cssOutlinedInput,
                      root: classes.formFieldInput,
                      
                    },
                  }}

                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="Outpatient Number (ODP)"
                  label="Outpatient Number (ODP)"
                  className={classNames(classes.formField, classes.cssOutlinedInput)}
                  InputLabelProps={{
                    classes: {
                      root: classes.formFieldInputLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.formFieldInput,
                      notchedOutline: classes.cssOutlinedInput,
                    },
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="Inpatient Number (IDP)"
                  label="Inpatient Number (IDP)"
                  className={classNames(classes.formField, classes.cssOutlinedInput)}
                  InputLabelProps={{
                    classes: {
                      root: classes.formFieldInputLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.formFieldInput,
                      notchedOutline: classes.cssOutlinedInput,
                    },
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={2} style={{marginTop:16}}>
                <FormControl variant="outlined"
                  className={classNames(classes.formField, classes.formFieldSelect)}>
                  <InputLabel
                    htmlFor="​Range Age"
                    classes={{
                      root: classes.formFieldInputLabel,
                      focused: classes.selectLabel
                    }}
                  >
                    Range Age
                      </InputLabel>
                  <Select
                    className={classes.select}
                    input={
                      <OutlinedInput
                        name="Range Age"
                        id="Range Age"
                        classes={{
                          input: classes.formFieldSelectInput
                        }}
                      />
                    }
                  >
                    <MenuItem value={10}>0/3 mesi</MenuItem>
                    <MenuItem value={20}>6/12 mesi</MenuItem>
                    <MenuItem value={30}>12/24 mesi</MenuItem>
                    <MenuItem value={40}>24/48 mesi</MenuItem>
                    <MenuItem value={50}>5/8 anni</MenuItem>
                    <MenuItem value={60}>8/14 anni</MenuItem>
                    <MenuItem value={70}>15/20 anni</MenuItem>
                    <MenuItem value={80}>20/25 anni</MenuItem>
                    <MenuItem value={90}>30/35 anni</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2} style={{marginTop:16}}>
                <FormControl variant="outlined"
                  className={classNames(classes.formField, classes.formFieldSelect)}>
                  <InputLabel
                    htmlFor="​Gender"
                    classes={{
                      root: classes.formFieldInputLabel,
                      focused: classes.selectLabel
                    }}
                  >
                    Gender
                      </InputLabel>
                  <Select
                    className={classes.select}
                    input={
                      <OutlinedInput
                        name="Gender"
                        id="Gender"
                        classes={{
                          input: classes.formFieldSelectInput
                        }}
                      />
                    }
                  >
                    <MenuItem value={10}>Male</MenuItem>
                    <MenuItem value={20}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid container justify="flex-end" item spacing={24}>
                <Grid item xs={12} className={classes.searchButton}>
                  <Button variant="outlined" color="inherit" classes={{ root: classes.button, label: classes.buttonLabel }}>
                    Search
                    </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        &nbsp;
        <Grid container  item className={classes.filterContainer} justify="center" spacing={24}>
          <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
            <Typography variant="inherit">
              &emsp;<b>Which admitted patient are you searching for?</b>
              <p style={{ paddingLeft: '17px' }}>Use the filter for a faster search</p>
            </Typography>
          </Grid>
          <Grid container style={{ paddingTop: '15px', fontWeight: 'bold' }} justify='flex-end' xs={3}>Filter</Grid>
          <Grid item style={{ paddingTop: 0 }} xs={3} sm={3} >
            <FormControl variant='outlined' className={classNames(classes.formField, classes.formFieldSelect)}>
              <Select className={classes.select}
                input={
                  <OutlinedInput
                    labelWidth={300}
                    name="filter"
                    id="filter"
                    classes={{
                      input: classes.formFieldSelectInput
                    }}
                  />
                }
              >
                <MenuItem value={10}>Admitted today</MenuItem>
                <MenuItem value={20}>Admitted less than 3 days ago</MenuItem>
                <MenuItem value={30}>Admitted from 3 to 7 days ago</MenuItem>
                <MenuItem value={30}>Admitted more than 7 days ago</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container item  spacing={24}>
            {Patients}
          </Grid>
          <Grid container item style={{padding: 30, justifyContent:"center"}}>
            <Button variant="outlined" color="inherit" justify="center" classes={{ root: classes.loadMoreButton }}>
              Load More
            </Button>
          </Grid>
        </Grid>
        </Grid>
          </div>
        )}
      </div>
    );
  }
}

Ward.PropTypes = {
  classes: PropTypes.object.isRequired,
};

const styledComponent = withStyles(styles, { withTheme: true })(Ward);
export default styledComponent;
