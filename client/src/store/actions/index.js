import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS} from './types';

export const fetchUser = () => async dispatch => {
    let res = await axios.get('/api/current_user');
    dispatch({type:FETCH_USER,payload:res.data});
    
}

export const handleToken = token => async dispatch =>{
    let res = await axios.post('/api/stripe',token);
    dispatch({type:FETCH_USER,payload:res.data});
}

export const fetchSurvey = () => async dispatch =>{
    let res = await axios.get('/api/surveys');
    dispatch({type:FETCH_SURVEYS,payload:res.data});
}

export const submitSurvey = (value,history) => async dispatch =>{
    try{
        const res = await axios.post('/api/surveys',value);
        history.push('/surveys');
        dispatch({type:FETCH_USER,payload:res.data});
    }catch(err){
        history.push('/surveys');
        alert("You need to have some credits");
    }
    
}