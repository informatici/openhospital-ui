import {
	getPatientAPI,
} from '../helpers/api';

export const GET_PATIENT = 'GET_PATIENT';

function getPatient(patient){
	return {
		type: GET_PATIENT,
		patient,
	}
}

export function getPatientThunk(id){
	return (dispatch) => {
		console.log("inside getPatientThunk()" + location.id)
		return getPatientAPI(id).then((patient) => {
			dispatch(getPatient(patient))
		})
	}
}