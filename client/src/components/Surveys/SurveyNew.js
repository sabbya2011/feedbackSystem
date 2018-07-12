import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFromReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

class SurveyNew extends Component {

    state = {
        showFormReview:false
    }
    renderContent(){
        if(this.state.showFormReview){
            return <SurveyFromReview onCancel={()=>this.setState({showFormReview:false})}/>
        }else{
            return <SurveyForm onSurveySubmit={()=>this.setState({showFormReview:true})} />
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form:'surveyForm'
})(SurveyNew);