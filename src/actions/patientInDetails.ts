import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getPatientAPI } from '../../dummyAPI';
import { loading } from './loading'
import { AppState } from '../reducers/index';
import { 
	GET_PATIENT, 
	CLEAR_PATIENT_IN_DETAILS, 
	PatientInDetailsActionTypes, 
	Patient } from '../types/patients';

export function getPatient(patient: Patient): PatientInDetailsActionTypes{
	return {
		type: GET_PATIENT,
		patient,
	}
}

export function getPatientThunk(id: string): ThunkAction<void, AppState, null, AnyAction>{
	return (dispatch) => {
		dispatch(loading(true))
		return getPatientAPI(id).then((patient) => {
			dispatch(loading(false))
			dispatch(getPatient(patient))
		})
	}
}

export function clearPatientInDetails(): PatientInDetailsActionTypes{
	return {
		type: CLEAR_PATIENT_IN_DETAILS,
		patient: {},
	}
} 