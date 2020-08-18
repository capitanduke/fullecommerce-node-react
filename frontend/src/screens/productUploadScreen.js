import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { uploadProduct } from '../actions/uploadProductAction';

function ProductUploadScreen(props) {

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [count, setCount] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState('');
  

  const productUpload = useSelector(state => state.uploadProduct);
  const { loading, product, error } = productUpload;
  const dispatch = useDispatch();

  //const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  
  useEffect(() => {
    
    return () => {
      //
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(uploadProduct(name, image, brand, price, category, count, description, rating, reviews));
  }


  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Create Account</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="name">
            Name
          </label>
          <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="image">
            Image
          </label>
          <input type="text" name="image" id="image" onChange={(e) => setImage(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="brand">
            Brand
          </label>
          <input type="text" name="brand" id="brand" onChange={(e) => setBrand(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="price">
            Price
          </label>
          <input type="text" name="price" id="price" onChange={(e) => setPrice(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="category">
            Category: 
          </label>
          <input type="text" name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="count">
            Count in stock: 
          </label>
          <input type="text" name="count" id="count" onChange={(e) => setCount(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="description">
            Description: 
          </label>
          <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="rating">
            Rating: 
          </label>
          <input type="text" name="rating" id="rating" onChange={(e) => setRating(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="reviews">
            Reviews: 
          </label>
          <input type="text" name="reviews" id="reviews" onChange={(e) => setReviews(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Upload</button>
        </li>
        <li>
          {/*<Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" >Sign In</Link>*/}

        </li>

      </ul>
    </form>
  </div>
}
export default ProductUploadScreen;