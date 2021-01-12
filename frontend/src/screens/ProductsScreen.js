import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productAction';
import Axios from 'axios';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import NoAccess from '../components/NoAccess';


function ProductsScreen(props) {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

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
  const { loading: loadingDelete, success: successDelete, error: errorDelete, message: messageDelete } = productDelete;

  const dispatch = useDispatch(); 

  const productList = useSelector(state => state.productList);
  const { loading, products, success } = productList;

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    
    if(successSave || successDelete){
      setModalVisible(false);
      setMessageCreate(true)
      setTimeout(
        () => setMessageCreate(false), 
        5000
      );
    }

    if(userInfo){
      if(userInfo.isAdmin){
        dispatch(listProducts());
      }
    } else {
      setFlag(true);
    }


    return () => {
      //
    };
  }, [successSave, productDelete]);

  const openModal = (product) => {
    setModalVisible(true);


    if(product._id){
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
    } else {
      setId("");
      setName(""); 
      setImage("");
      setBrand("");
      setPrice("");
      setCategory("");
      setCountInStock("");
      setDescription("");
      setRating("");
      setReviews("");
    }
      
      
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({_id: id, name, image, brand, price, category, countInStock, description, rating, reviews}));
  }

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  

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


  /* DIALOG MODAL CONFIRM DELETE*/
  const [status, setStatus] = useState(false);

  const handleClickOpen = () => {
    setStatus(true);
  };

  const handleClose = () => {
    setStatus(false);
  };

  const handleAgree = (product) => {
    dispatch(deleteProduct(product._id));
    setStatus(false);
  };
  const handleDisagree = () => {
    setStatus(false);
  };


  return flag ? <NoAccess /> : <div className="content content-margined">
    {messageCreate && successSave && <div className="container-message">
      <h1>{messageSave}</h1>
    </div> || successDelete && <div className="container-message">
      <h1>{messageDelete}</h1>
    </div>}
    <div className="product-header">
      <h3>Products</h3>
      <button className="button primary" onClick={() => openModal({})}>Create Product</button>
    </div>

    {modalVisible && <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>{ id ? 'EDIT PRODUCT' : 'CREATE PRODUCT' }</h2>
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
            {/*<label htmlFor="image">
              Image
            </label>
            <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)}>
            </input>*/}
          </li>
          <li>
            <label htmlFor="imageFile">
              Image File
            </label>
            <input type="file" name="imageFile" id="imageFile" label="Choose image" 
              onChange={uploadFileHandler}>
            </input>
            { loadingUpload && "loading....." }
            { errorUpload && <div>{errorUpload}</div> }
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
            <input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}>
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
                <Button variant="contained" classes={{ root: 'my-class-name' }} onClick={()=>openModal(product)}>Edit</Button>
                {' '}
                <Button variant="contained" color="secondary" onClick={() => handleClickOpen(product)}>Delete</Button>
              </td>

              <Dialog
                open={status}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete Product"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Do you want to delete this product?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleDisagree()} color="primary">
                    Disagree
                  </Button>
                  <Button onClick={() => handleAgree(product)} color="primary" autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </tr>
            
          )}
            
        </tbody>
      </table>
    </div>


    
    
  </div>
  
  
  
}

export default ProductsScreen;