import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productAction';

function HomeScreen (props) {

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = useSelector(state => state.productList);

    const [ search, setSearch ] = useState();
    const [ categories, setCategories ] = useState();
    const [ searchFlag, setSearchFlag ] = useState(false);
    const [ categoriesFlag, setCategoriesFlag ] = useState(false);

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
        } 
    })

    const categoriesHandler = (e) => {
        setCategories(e.target.value);

        setCategoriesFlag(true);
        
        if( e.target.value === "all"){
            setCategoriesFlag(false);
        }
    }

    let searchCategories = [];

    products.map(product => {
        if( categories === product.category ){
            searchCategories.push(<li key={product._id}> 
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
        } 
    })


    return  loading ? <div>Loading......</div> :
    error ? <div>{error}</div> : <div className="home-with-search">

        <div className="search-bar">
            <input type="text" name="search" onChange={searchHandler} />

            <select name="categories" onChange={categoriesHandler}>
                <option value="all">Select category</option>
                {products.map(product => 
                    <option key={product._id} value={product.category}>{product.category}</option>
                )}
                
            </select>

            


        </div>

        <ul className="products">

            {searchFlag ? searching : categoriesFlag ? searchCategories : products.map(product => 
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