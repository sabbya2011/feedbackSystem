import {combineReducers} from 'redux';
import authReducers from './authReducers';
import {reducer as reduxFormReducer} from 'redux-form';

export default combineReducers({
    auth:authReducers,
    form:reduxFormReducer
})