import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsOrder } from '../actions/orderAction';
import { removeFromCart } from '../actions/cartAction';
import { orderEmpty } from '../actions/orderAction';


function OrderScreen (props) {

    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        dispatch(detailsOrder(props.match.params.id));

        cartItems.forEach(element => dispatch(removeFromCart(element.product)));

        dispatch(orderEmpty());


        return () => {
            
        }
    }, [])

    const test = useSelector(state => state);
    console.log(test);


    const payHandler = () => {}
    
return  loading ? <div>Loading.....</div> : error ? <div>{error}</div> : <div>


            {
                        <div className="placeorder" >
                            <div className="placeorder-info"> 
                                <div>
                                    <h3>
                                        Shipping2
                                    </h3>
                                    <div>
                                        {order.shipping.address}, {order.shipping.city}
                                        {order.shipping.postalCode}, {order.shipping.country} 
                                    </div>
                                    <div>
                                        { order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered" }
                                    </div>
                                </div>
                                <div>
                                    <h3>Payment</h3>
                                    <div>
                                        Payment Methodo : {order.payment.paymentMethod}
                                    </div>
                                    <div>
                                        { order.isPaid ? "Paid at " + order.paidAt : "Not paid" }
                                    </div>
                                </div>
                                <div>
                                    <ul className="cart-list-container">
                                        <li>
                                            <h3>Shopping Cart</h3>
                                            <h3>Price</h3>
                                        </li>
                                        
                                        {   
                                            order.orderItems.length === 0 ?
                                            <div>The Cart is empty</div> :
                                            order.orderItems.map(item => 
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
                                        <button onClick={payHandler} className="details-button full-width"> Pay Now</button>
                                    </li>
                                    <li>
                                        <h3>Order Summary</h3>
                                    </li>
                                    <li>
                                        <div>Items</div>
                                        <div>{order.itemsPrice}€</div>
                                    </li>
                                    <li>
                                        <div>Shipping</div>
                                        <div>{order.shippingPrice}€</div>
                                    </li>
                                    <li>
                                        <div>Tax</div>
                                        <div>{order.taxPrice}€</div>
                                    </li>
                                    <li>
                                        <div>Order Total</div>
                                        <div>{order.totalPrice}€</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    
                    
                                }

    </div>
}

export default OrderScreen;