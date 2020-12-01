import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productAction';

function HomeScreen (props) {

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = useSelector(state => state.productList);

    const dispatch = useDispatch();
    
    useEffect(() => {

        dispatch(listProducts());
        return () => {
            
        }
    }, [])


    return  loading ? <div>Loading......</div> :
    error ? <div>{error}</div> : <ul className="products">
        
        {
            
        products.map(product => 
            <li key={product._id}> 
                <div className="product">
                    <Link to={'/details/' + product._id}>
                        <img className="product-image" src={product.image} alt="product" />
                    </Link>
                    <div className="product-name">
                        <Link to={'/details/' + product._id}>
                            {product.name}
                        </Link>
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">€{product.price}</div>
                    <div className="product-rating">{product.rating} Stars {product.reviews}</div>
                </div>
            </li>)
        }
    </ul> 
}

export default HomeScreen;