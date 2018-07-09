import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Payments from '../Payments/Payments';

class Header extends Component{
    renderContent(){
        switch(this.props.auth){
            case null:{
                return ;
            }
            case false:{
                return <li><a href='/auth/google'>Login With Google</a></li>
            }
            default : {
                return [
                    <li key="1"><Payments/></li>,
                    <li key="2">Credits : {this.props.auth.credits}</li>,
                    <li key="3"><a href='/api/logout'>Logout</a></li>
                ]
            }
        }
    }
    render() {
        return ( 
            <nav>
                <div className='nav-wrapper'>
                    <Link
                        to={this.props.auth?'/surveys':'/'}
                        className='left brand-logo'>
                        Feedback Distributor
                    </Link>
                    <ul className='right'>
                        {this.renderContent()}
                    </ul>
                </div>
            </nav> 
        )
    }
       
};
const mapStateToProps = state => {
    return {
        auth:state.auth
    }
}
export default connect(mapStateToProps)(Header);