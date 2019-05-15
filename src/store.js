import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';
import { rootReducer } from './reducer';

const logger =  createLogger({
    collapsed: true,
});
export default createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));
