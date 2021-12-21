import { PRODUCT_UPLOAD_REQUEST, PRODUCT_UPLOAD_SUCCESS, PRODUCT_UPLOAD_FAIL } from '../constants/uploadConstants';
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../constants/productConstants';
import Axios from 'axios';


const uploadProduct = (name, image, brand, price, category, count, description, rating, reviews) => async (dispatch) => {
   
    dispatch({type: PRODUCT_UPLOAD_REQUEST, payload: {name, image, brand, price, category, count, description, rating, reviews}});
    try {
        const {data} = await Axios.post("/api/product/upload", {name, image, brand, price, category, count, description, rating, reviews});
        dispatch({type: PRODUCT_UPLOAD_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_UPLOAD_FAIL, payload: error.message});
    }

}

const productList = (products) => async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST, payload: {products}});
    try{
        const {data} = await Axios.get("/api/product/product-list");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    } catch(err) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: err.message})
    }
}



export { uploadProduct, productList };