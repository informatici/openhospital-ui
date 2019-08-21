import { LOADING } from '../actions/loading'

export default function loading(state, action){
	if (action.type === LOADING){
		return action.status
	}
	return false
} 