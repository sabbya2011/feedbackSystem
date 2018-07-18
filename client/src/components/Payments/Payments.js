import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import { handleToken } from '../../store/actions';

class Payments extends Component {
    render() {
        return (
            <div>
                <StripeCheckout
                    name="Feedback Distributor"
                    description="$5 for 5 feedback forms"
                    amount={500}
                    token={token=>this.props.postStripeToken(token)}
                    stripeKey={process.env.REACT_APP_STRIPE_KEY}>
                    
                    <button className="btn">Add Credits</button>
                </StripeCheckout>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postStripeToken : (token)=>{
            dispatch(handleToken(token));
        }
    }
}

export default connect(null,mapDispatchToProps)(Payments);