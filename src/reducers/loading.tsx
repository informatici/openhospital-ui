import produce from 'immer';
import { LOADING } from '../actions/loading';

export default function loading(state = null, action){
	return produce(state, (draft) => {
		switch(action.type) {
			case LOADING :
				draft = action.status
				return draft
		}
	})
}