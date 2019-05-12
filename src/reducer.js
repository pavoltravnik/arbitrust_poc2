import { combineReducers } from 'redux';
import createContractReducer from './features/CreateContract/reducer';

export const rootReducer = combineReducers({
	createContractReducer: createContractReducer,
});