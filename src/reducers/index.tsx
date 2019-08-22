import { combineReducers } from 'redux';
import patients from './patients';
import patientInDetails from './patientInDetails';
import loading from './loading';

export default combineReducers({
	patientInDetails,
	patients,
	loading,
})