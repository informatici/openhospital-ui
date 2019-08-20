import {
	GET_PATIENT,
} from '../actions/patientInDetails';

export default function patients(state={}, action){
	switch(action.type){
		case GET_PATIENT :
			return {
				[action.patient.id]: action.patient,
			}
		default :
			return state;
	}
}