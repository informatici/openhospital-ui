// api fuctions, which will be used inside the thunks, to be imported when ready

export const RECEIVE_PATIENTS = 'RECEIVE_PATIENTS';
export const ADD_NEW_PATIENT = 'ADD_NEW_PATIENT';
export const DELETE_PATIENT = 'DELETE_PATIENT';
export const UPDATE_PATIENT_DETAILS = 'UPDATE_PATIENT_DETAILS';

receivePatients = (patients) => {
	return {
		type: RECEIVE_PATIENTS,
		patients,
	}
}

export receivePatientsThunk = () => {
	return (dispatch) => {
		return ()
	}
}

addNewPatient = (patient) => {
	return {
		type: ADD_NEW_PATIENT,
		patient,
	}
}

export addNewPatientThunk = () => {
	return (dispatch) => {
		return ()
	}
}

deletePatient = (patient) => {
	return {
		type: DELETE_PATIENT,
		patient,
	}
}

export deletePatientThunk = () => {
	return (dispatch) => {
		return ()
	}
}

updatePatientDetails = (patient) => {
	return {
		type: UPDATE_PATIENT_DETAILS,
		patient,
	}
}

export updatePatientDetailsThunk = () => {
	return (dispatch) => {
		return ()
	}
}