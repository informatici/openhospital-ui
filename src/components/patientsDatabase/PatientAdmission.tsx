import React, { Component } from "react";
import { Link as LinkRouter } from "react-router-dom";

// local imports
import styles from "./styles/PatientAdmission.style";
import { MaterialButtonRouter } from "../utils/LinkHelper";
import classNames from "classnames";

// material imports
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { FormControlLabel } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";

// constants
import { PATH_PATIENT_THERAPY } from "../../helpers/constants"

export interface Props extends WithStyles<typeof styles> { }

interface State {
	labelWidth: number;
	error: any;
	isLoaded: boolean;
	patientInfo: any;
	anchorEl?: any;
	openOptionalInfo: boolean;
}

class PatientAdmission extends Component<Props, State>{
	state: State = {
		labelWidth: 0,
		error: null,
		isLoaded: false,
		patientInfo: {},
		openOptionalInfo: false,
		anchorEl: null,
	};

	handleClickCollapseOptionalInfo = () => {
		this.setState(state => ({ openOptionalInfo: !state.openOptionalInfo }));
	};

	render(){
		const { classes, patient } = this.props;
		const { openOptionalInfo } = this.state;
		{openOptionalInfo ? <ExpandLess /> : <ExpandMore />;}
		return(
			<Grid item xs={12} sm={9} className={classes.colleagueContent}>
				<Grid item xs={12} className={classes.colleagueProfileHeader}>
					<div style={{ flexDirection: "column", textAlign: "left" }}>
						<Typography color="inherit" className={classes.patientName}>
							{patient.firstName} {patient.secondName}
						</Typography>
						<Typography color="inherit" className={classes.patientAddress}>
							Provenance: <b>{patient.address}</b>
						</Typography>
					</div>
				</Grid>
				&emsp;
				<Divider className={classes.divider} />
				&emsp;
				<Grid item xs={12} className={classes.colleagueProfileHeader}>
					<div style={{ flexDirection: "column", textAlign: "left" }}>
						<Typography color="inherit" className={classes.formTitle}>
							COMPLETE THE FORM
						</Typography>
					</div>
				</Grid>
				<Grid container item spacing={24}>
					<Grid className={classes.formatFormAdmission}>
						<Typography color="inherit" className={classes.drugPrescribed}>
							INCOMING DIAGNOSIS
						</Typography>
						<TextField
							placeholder="Start typing..."
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
							variant="outlined"/>
						&emsp;
						<Typography color="inherit" className={classes.drugPrescribed}>
							TYPE OF ADMISSION
						</Typography>
						<TextField
							placeholder="Start typing..."
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
							variant="outlined"/>
					</Grid>

					<Grid className={classes.formatFormAdmissionDate}>
						<Typography color="inherit" className={classes.drugPrescribed}>
							ADMISSION DATE
						</Typography>
						<Grid style={{marginLeft:10 , marginTop:12}}>   
							&nbsp;
							<TextField
								id="date"
								type="date"
								defaultValue="2017-05-24"
								InputLabelProps={{
								shrink: true,
								}}/>
						</Grid>
						&emsp;
						<MaterialButtonRouter
							component={LinkRouter}
							to="/"
							variant="contained"
							color="secondary"
							classes={{ root: classes.detailButtonICD, label: classes.detailButtonLabelInverse }}>
							<KeyboardArrowRightIcon />
							BROWSE THE ICD 10
						</MaterialButtonRouter>
					</Grid>
				</Grid>
				<Grid item style={{ marginTop: 30 }} xs={12} sm={12}>
					<Grid xs={3} sm={3}>
						<Typography color="inherit" className={classes.drugPrescribed}>
							DRUGS PRESCRIBED
						</Typography>
					</Grid>
					<MaterialButtonRouter component={LinkRouter} to={PATH_PATIENT_THERAPY.replace(':patientId', patient.id)} variant="outlined" color="secondary" classes={{ root: classes.detailButtonTherapy }}>
						Therapy
					</MaterialButtonRouter>
					<TextField
						id="Drugs prescribed"
						placeholder="Describe here which kind of drugs are needed. Please remind to write the quantity."
						className={classNames(classes.formField, classes.cssOutlinedInput)}
						InputLabelProps={{
							classes: {
							root: classes.formFieldInputLabel,
							focused: classes.cssFocused,
							},
						}}
						InputProps={{
							classes: {
							root: classes.formFieldInputNotes,
							notchedOutline: classes.cssOutlinedInput,
							},
						}}
						margin="normal"
						variant="outlined"/>
				</Grid>
				

				<Grid item style={{ marginTop: 30 }} xs={12} sm={12}>
					<Typography color="inherit" className={classes.drugPrescribed}>
						Prescribe laboratory tests
					</Typography>
					&nbsp;
					<FormControlLabel
						control={<Checkbox onClick={this.handleClickCollapseOptionalInfo} />}
						label="Yes. it's necessary"/>
					<FormControlLabel control={<Checkbox />} label="No, it isn't necessary" />
					<Collapse in={openOptionalInfo} style={{ width: "100%" }} timeout="auto" unmountOnExit>
						<Grid item xs={12} sm={8}>
							<FormControl
								variant="outlined"
								className={classNames(classes.formField, classes.formFieldSelectService)}>
								<InputLabel
									ref={ref => {
										this.InputLabelRef = ref;
									}}
									htmlFor="Service type"
									classes={{
										root: classes.formFieldInputLabel,
										focused: classes.selectLabel,
									}}>
									Select one or more laboratory test
								</InputLabel>
								<Select
									className={classes.select}
									input={
										<OutlinedInput
											labelWidth={this.state.InputLabelRef}
											id="Service type"
											classes={{
												input: classes.formFieldSelectInput,
											}}/>
									}>
									<MenuItem value={10}>item1</MenuItem>
									<MenuItem value={20}>Laboratory </MenuItem>
									<MenuItem value={30}>test2</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Collapse>
				</Grid>
				&emsp;
				<Grid item style={{ marginTop: 30 }} xs={12} sm={12}>
					<Typography color="inherit" className={classes.drugPrescribed}>
						NOTES
					</Typography>
					<TextField
						id="Notes"
						className={classNames(classes.formField, classes.cssOutlinedInput)}
						InputLabelProps={{
							classes: {
							root: classes.formFieldInputLabel,
							focused: classes.cssFocused,
							},
						}}
						InputProps={{
							classes: {
							root: classes.formFieldInputNotes,
							notchedOutline: classes.cssOutlinedInput,
							},
						}}
						margin="normal"
						variant="outlined"/>
				</Grid>
				<Grid item xs={12} spacing={24} style={{ marginTop: 100 }} className={classes.detailButtonContainer}>
					<MaterialButtonRouter
						component={LinkRouter}
						to="/"
						variant="contained"
						color="secondary"
						classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}>
						<KeyboardArrowRightIcon />
						Save admission
					</MaterialButtonRouter>
					<MaterialButtonRouter
						component={LinkRouter}
						to="/"
						variant="contained"
						color="secondary"
						classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}>
						<KeyboardArrowRightIcon />
						Print admission
					</MaterialButtonRouter>
					<MaterialButtonRouter
						component={LinkRouter}
						to="/Billing"
						variant="contained"
						color="secondary"
						classes={{ root: classes.detailButton, label: classes.detailButtonLabelInverse }}>
						<KeyboardArrowRightIcon />
						Pay the bill
					</MaterialButtonRouter>
				</Grid>
			</Grid>
		)
	}
}

const styledComponent = withStyles(styles, { withTheme: true })(PatientAdmission);
export default styledComponent;





