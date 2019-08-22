import produce from 'immer';

import {
	GET_PATIENT,
	CLEAR_PATIENT_IN_DETAILS,
} from '../actions/patientInDetails';

export default function patients(state={}, action){
	return produce(state, draft => {
		switch(action.type){
			case GET_PATIENT :
				return action.patient;
			case CLEAR_PATIENT_IN_DETAILS :
				return {};
		}
	})
}