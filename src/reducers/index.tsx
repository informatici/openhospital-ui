import { combineReducers } from 'redux';
import patients from './patients';
import patientInDetails from './patientInDetails';

export default combineReducers({
	patientInDetails,
	patients,
})