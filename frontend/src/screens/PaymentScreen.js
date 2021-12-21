import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartAction';
import CheckoutSteps from '../components/CheckoutSteps';


function PaymentScreen(props) {

  const [paymentMethod, setPaymentMethod] = useState('');
  
  
  /*const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;*/
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({paymentMethod}));
    props.history.push("/placeorder");
  }
  return <div>
    
    <CheckoutSteps />


    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Payment</h2>
          </li>
          <li>
            <div>
              <input type="radio" name="paymentMethod" id="paymentMethod" value="paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}>
              </input>
              <label htmlFor="paymentMethod">
                Paypal
              </label>
            </div>
          </li>
          <li>
            <button type="submit" className="button primary">Continue</button>
          </li>
        </ul>
      </form>
    </div>
  </div>
}
export default PaymentScreen;