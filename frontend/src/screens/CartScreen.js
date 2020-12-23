import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartAction';
import { removeFromCart } from '../actions/cartAction';

function CartScreen (props) {


    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;


    const cartProducts = useSelector(state => state.cart);
    const { cartItems, loading, error } = cartProducts;

    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
        }
        
    }, []);

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    }


    
    return  <div>

            {
                loading ? <h1>loading.............</h1> : error ? <h1>{error}</h1> : (
                
                   
                        <div className="cart" >
                            <div className="cart-list"> 
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
                                                    QTY:
                                                    <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                                        {[...Array(item.countInStock).keys()].map(x => 
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option> )}
                                                    </select>
                                                    <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)}>
                                                        Delete
                                                    </button>
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
                            <div className="cart-action">
                                <h3>Subtotal ({ cartItems.reduce((a, c) => a + c.qty, 0) } items)
                                :
                                € { cartItems.reduce((a, c) => a + c.price * c.qty, 0) } </h3>
                                
                                <button onClick={checkoutHandler} className="details-button full-width" disabled={cartItems.length === 0}>
                                    Proceed to check out
                                </button>
                            </div>
                        </div>
                    
                    
                
                
                )
                                }

    </div>
}

export default CartScreen;