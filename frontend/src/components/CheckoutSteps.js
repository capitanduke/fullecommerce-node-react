import React from 'react';
import { useSelector } from 'react-redux';



function CheckoutSteps() {

    const userSignin = useSelector(state=>state.userSignin);
    const { userInfo } = userSignin;


    const shippingData = useSelector(state=>state.shipping);
    const { shipping } = shippingData;

    const paymentState = useSelector(state=>state.payment);
    const { payment } = paymentState;


    return <div className="checkout-steps-container">
            { 
                userInfo ? 
                <div className="active-line">Signin</div> 
                
                : 
                
                <div className="deactive-line">Signin</div>
            }

            { 
                shipping ? 
                <div className="active-line">Shipping</div> 
                
                : 
                
                <div className="deactive-line">Shipping</div>
            }

            {
                payment ?
                <div className="active-line">Payment</div>
                :
                <div className="deactive-line">Payment</div>
            }

            {
                payment ?
                <div className="active-line">Place Order</div>
                :
                <div className="deactive-line">Place Order</div>
            }
            
            
            
            
        </div>
}

export default CheckoutSteps;