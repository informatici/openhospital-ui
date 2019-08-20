import {
	RECEIVE_PATIENTS,
	ADD_NEW_PATIENT,
	DELETE_PATIENT,
	UPDATE_PATIENT_DETAILS,
} from '../actions/patients';

export default function patients(state={}, action){
	switch(action.type){
		case RECEIVE_PATIENTS :
			return {
				...state,
				...action.patients,
			}
		case ADD_NEW_PATIENT :
			return {
				...state,
				[action.patient.id]: action.patient,
			}
		case DELETE_PATIENT :
			// this case clones the state in order to keep the reducer as a pure function
			// then it looks for a key that matches the object whithin the action and 
			// delete it from the cloned state. At last, it return the up-to-date state to
			// be the new state.
			const newState = { ...state }
			Object.keys(state).forEach((key) => 
				key === action.patient.id ? delete newState[key] : null)
			return {
				...newState,
			}
		case UPDATE_PATIENT_DETAILS :
			// this case finds, inside the state, the object that matches with the one 
			// inside the action. After that, it replaces the object through index 
			// similarity when returning the state.
			let index = Object.keys(state).find((key) => 
				state[key].id === action.patient.id ? key : null) 
			return {
				...state,
				[index]: action.patient,
			}
		default :
			return state
	}
}