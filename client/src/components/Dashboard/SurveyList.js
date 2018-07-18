import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurvey } from '../../store/actions';

class SurveyList extends Component {
    componentDidMount() {
        this.props.getSurveyList();
    }

    renderSurveys(){
        if(this.props.surveyList){
            return this.props.surveyList.reverse().map(survey=>{
                return (<div className="card darken-1" key={survey._id}>
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no}</a>
                    </div>
                </div>);
            });
        }
        
    }
    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        surveyList: state.survey
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getSurveyList: (token) => {
            dispatch(fetchSurvey(token));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyList);