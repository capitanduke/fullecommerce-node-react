import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productAction';
import Axios from 'axios';

function ProductsScreen(props) {


  const [modalVisible, setModalVisible] = useState(false);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState('');

  const [messageCreate, setMessageCreate] = useState(false);
  

  const productSave = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, message: messageSave, error: errorSave } = productSave;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
  
  
  const dispatch = useDispatch(); 

  const productList = useSelector(state => state.productList);
  const { loading, products, success } = productList;

  
  useEffect(() => {
    
    if(successSave){
      setModalVisible(false);
      setMessageCreate(true)
      setTimeout(
        () => setMessageCreate(false), 
        5000
      );
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, productDelete]);

  const openModal = (product) => {
      setModalVisible(true);
      setId(product._id);
      setName(product.name);
      setImage(product.image);
      setBrand(product.brand);
      setPrice(product.price);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setRating(product.rating);
      setReviews(product.reviews);
  }

  const handleDeleteProduct = (product) => {
    dispatch(deleteProduct(product._id));
  }

  const submitHandler = (e) => {
    console.log(countInStock);
    e.preventDefault();
    dispatch(saveProduct({_id: id, name, image, brand, price, category, countInStock, description, rating, reviews}));
  }

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async(e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try{
      const {data} = await Axios.post('/api/uploads', bodyFormData, {
        headers: { 'Content-Type' : 'multipart/form-data',
        Authorization : `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error){
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }

  }


  return <div className="content content-margined">
    {messageCreate && <div className="container-message">
      <h1>{messageSave}</h1>
    </div>}
    <div className="product-header">
      <h3>Products</h3>
      <button className="button primary" onClick={() => openModal({})}>Create Product</button>
    </div>

    {modalVisible && <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Create Account</h2>
          </li>
          <li>
            {loadingSave && <div>Loading...</div>}
            {errorSave && <div>{errorSave}</div>}
          </li>
          <li>
            <label htmlFor="name">
              Name
            </label>
            <input type="name" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="image">
              Image
            </label>
            <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="imageFile">
              Image File
            </label>
            <input type="file" name="imageFile" id="imageFile" label="Choose image" 
              onChange={uploadFileHandler}>
            </input>
            { loadingUpload && "loading....." }
            { errorUpload &&  "error" }
          </li>
          <li>
            <label htmlFor="brand">
              Brand
            </label>
            <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="price">
              Price
            </label>
            <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="category">
              Category: 
            </label>
            <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="countInStock">
              Count in stock: 
            </label>
            <input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="description">
              Description: 
            </label>
            <textarea type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}>
            </textarea>
          </li>
          <li>
            <label htmlFor="rating">
              Rating: 
            </label>
            <input type="text" name="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="reviews">
              Reviews: 
            </label>
            <input type="text" name="reviews" id="reviews" value={reviews} onChange={(e) => setReviews(e.target.value)}>
            </input>
          </li>
          <li>
          <button type="submit" className="button primary">{ id ? 'EDIT' : 'CREATE' }</button>
          </li>
          <li>
            <button onClick={() => setModalVisible(false)} className="button secondary">Back</button>
          </li>
          <li>
            {/*<Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" >Sign In</Link>*/}

          </li>

        </ul>
      </form>
    </div>}

    <div className="product-list">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => 
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price} €</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <button className="button" onClick={()=>openModal(product)}>Edit</button>
                {' '}
                <button className="button" onClick={() => handleDeleteProduct(product)}>Delete</button>
              </td>
            </tr>
          )}
            
        </tbody>
      </table>
    </div>
    
  </div>
  
  
  
}

export default ProductsScreen;