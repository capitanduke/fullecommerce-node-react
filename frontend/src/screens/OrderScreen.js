import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsOrder } from '../actions/orderAction';

function OrderScreen (props) {


    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsOrder(props.match.params.id));
        return () => {
            
        }
    }, [])

    const payHandler = () => {}
    
return  loading ? <div>Loading.....</div> : error ? <div>{error}</div> : <div>


            {
                        <div className="placeorder" >
                            <div className="placeorder-info"> 
                                <div>
                                    <h3>
                                        Shipping
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