import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productAction';

function HomeScreen (props) {

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = useSelector(state => state.productList);

    const [ search, setSearch ] = useState();
    const [ searchFlag, setSearchFlag ] = useState(false);

    const dispatch = useDispatch();

    const searchHandler = (e) => {

        setSearch(e.target.value.toLowerCase());

        if(e.target.value.length > 0){
            setSearchFlag(true);
        } else {
            setSearchFlag(false);
        }

        
    }
    
    
    useEffect(() => {
        
        dispatch(listProducts());
        
        return () => {

            
        }
    }, [])

    

    let searching = [];
    let notFound = "";
   
    
    products.map(product => {
        if( search === product.name.toLowerCase() ){
            searching.push(<li key={product._id}> 
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
            </li>);
        } else {
            notFound = <div>Not Found</div>
        }
    })

    


    return  loading ? <div>Loading......</div> :
    error ? <div>{error}</div> : <div className="home-with-search">

        <div className="search-bar">
            <input type="text" name="search" onChange={searchHandler} />
        </div>

        <ul className="products">

            {searchFlag ? searching : products.map(product => 
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
                </li>)}
            
        </ul>


    </div>
    
     
}

export default HomeScreen;