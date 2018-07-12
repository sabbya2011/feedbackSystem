import _ from 'lodash';
import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';

import validateEmails from '../../utilities/validateEmails';
import SurveyField from './SurveyField';
import FIELDS from './formFields';


class SurveyForm extends Component {
    
    renderFields(){
        return _.map(FIELDS,({label,name})=>{
            return (<Field key={name} component={SurveyField} type="text" label={label} name={name}/>);
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values=>this.props.onSurveySubmit())}>
                    {/* <Field type="text" name="surveyTitle" component="input" /> */}
                    {this.renderFields()}
                    <Link to="/surveys" className="btn waves-effect waves-light red left">Cancel</Link>
                    <button className="btn waves-effect waves-light right" type="submit">
                        Submit
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values){
    const errors = {};
    // if(!values.title){
    //     errors.title = "You must provide a title";
    // }
    _.map(FIELDS,({name,label})=>{
        if(!values[name]){
            errors[name] = `You must provide ${label}`;
        }
    });
    if(!errors.recipients){
        errors.recipients = validateEmails(values.recipients);
    }
    return errors;
}
export default reduxForm({
    validate,
    form:'surveyForm',
    destroyOnUnmount:false
})(SurveyForm);