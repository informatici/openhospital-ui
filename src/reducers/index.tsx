import { combineReducers } from 'redux';
import patients from './patients';
import patientInDetails from './patientInDetails';
import loading from './loading';

const rootReducer = combineReducers({
	patientInDetails,
	patients,
	loading,
})

export type AppState = ReturnType<typeof rootReducer>