import {combineReducers} from 'redux';
import authReducers from './authReducers';
import surveyReducers from './surveyReducers';
import {reducer as reduxFormReducer} from 'redux-form';

export default combineReducers({
    auth:authReducers,
    survey:surveyReducers,
    form:reduxFormReducer
})