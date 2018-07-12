import React, {Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUser} from '../../store/actions';

import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Dashboard from '../Dashboard/Dashboard';
import Surveynew from '../Surveys/SurveyNew';


class App extends Component{
    componentDidMount(){
       this.props.getCurrentUser();
    }
    render(){
        return (
            <div className='container'>
                
                
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route exact path='/' component={Landing} />
                        <Route exact path='/surveys' component={Dashboard} />
                        <Route path='/surveys/new' component={Surveynew} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
};



const mapDispatchToProps = dispatch =>{
    return {
        getCurrentUser: () => dispatch(fetchUser())
    }
}
export default connect(null,mapDispatchToProps)(App);