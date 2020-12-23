import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../actions/orderAction';
import CheckoutSteps from '../components/CheckoutSteps';

function PlaceOrderScreen (props) {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems, shipping, payment } = cart;

    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success : successNewOrder, error, order } = orderCreate;


    if(!shipping.address){
        props.history.push("/shipping");
    } else if(!payment.paymentMethod){
        props.history.push("/payment");
    }

    const itemsPrice = cartItems.reduce((a, c) => a + c.price*c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const placeOrderHandler = () => {

        dispatch(createOrder({orderItems: cartItems, shipping, payment, 
            itemsPrice, shippingPrice, taxPrice, totalPrice
        }));
    }


    useEffect(() => {
        if(successNewOrder){

            props.history.push("/order/" + order._id);
        }
    }, [successNewOrder]);

    

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    }

    
    return  <div>

            <CheckoutSteps />

            {
                
                
                   
                        <div className="placeorder" >
                            <div className="placeorder-info"> 
                                <div>
                                    <h3>
                                        Shipping
                                    </h3>
                                    <div>
                                        {cart.shipping.address}, {cart.shipping.city}
                                        {cart.shipping.postalCode}, {cart.shipping.country} 
                                    </div>
                                </div>
                                <div>
                                    <h3>Payment</h3>
                                    <div>
                                        Payment Methodo : {cart.payment.paymentMethod}
                                    </div>
                                </div>
                                <div>
                                    <ul className="cart-list-container">
                                        <li>
                                            <h3>Shopping Cart</h3>
                                            <h3>Price</h3>
                                        </li>
                                        
                                        {   
                                            cartItems.length === 0 ?
                                            <div>The Cart is empty</div> :
                                            cartItems.map(item => 
                                            <li key={item.product}>
                                                <div className="cart-image">
                                                    <img src={item.image} alt="product"/>
                                                </div>
                                                <div className="cart-name">
                                                    <div>
                                                        <Link to={"/api/products/" + item.product}>
                                                            {item.name}
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        QTY: {item.qty}
                                                    </div>
                                                </div>
                                                <div className="cart-price">
                                                    {item.price} €
                                                </div>
                                            </li>
                                            )
                                        }
                                        
                                        
                                    </ul>
                                </div>
                                
                                
                            </div>
                            <div className="placeorder-action">
                                <ul>
                                    <li>
                                        <button onClick={placeOrderHandler} className="details-button full-width"> Place Order</button>
                                    </li>
                                    <li>
                                        <h3>Order Summary</h3>
                                    </li>
                                    <li>
                                        <div>Items</div>
                                        <div>{itemsPrice}€</div>
                                    </li>
                                    <li>
                                        <div>Shipping</div>
                                        <div>{shippingPrice}€</div>
                                    </li>
                                    <li>
                                        <div>Tax</div>
                                        <div>{taxPrice}€</div>
                                    </li>
                                    <li>
                                        <div>Order Total</div>
                                        <div>{totalPrice}€</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    
                    
                                }

    </div>
}

export default PlaceOrderScreen;