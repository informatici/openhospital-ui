import produce from 'immer';
import { LOADING, LoadingAction } from '../types/loading';

export default function loading(state: boolean = false, action: LoadingAction){
	return produce(state, (draft) => {
		switch(action.type) {
			case LOADING :
				return action.status
		}
	})
}