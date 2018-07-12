import React from 'react';
import {connect} from 'react-redux';
import FIELDS from './formFields';
import {submitSurvey} from '../../store/actions';
import {withRouter} from 'react-router-dom';

const SurveyReview = (props)=>{

    const reviewFields = FIELDS.map(({label,name})=>{
        return(
            <div key={name}>
                <label>{label}</label>
                <div>{props.formValues[name]}</div>
            </div>
        )
    });

    return(
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="btn waves-effect waves-light left yellow darken-3" 
                onClick={()=>props.onCancel()}>
                Cancel
            </button>
            <button className="btn waves-effect waves-light right green"
                onClick={()=>props.onSubmitSurvey(props.formValues,props.history)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>

        </div>
    )
};
const mapStateToProps = state=>{
    return {
        formValues:state.form.surveyForm.values
    };
}
const mapDispatchToProps = dispatch =>{
    return {
        onSubmitSurvey : (payload,history)=>{
            dispatch(submitSurvey(payload,history));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SurveyReview));