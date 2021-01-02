
import {
	ADD_TO_CART_SUCCESS, CLEAR_CART,
	DECR_PRODUCT_QTY, DELETE_CART_ITEM,
	INCR_PRODUCT_QTY
} from './type';
import { setAlert } from './alert'
import axios from 'axios';




export const addToCart = (productId,qty,history) => async dispatch => {

	try {
		
		const res = await axios.get(`http://localhost:3001/api/singleproduct/${productId}`)
		console.log(res.data);
		let product = res.data.product;
		product.qty = qty;
		dispatch({
			type: ADD_TO_CART_SUCCESS,
			payload: product
		});
		dispatch(setAlert("Add to cart", "success"))
		history.push(`/cart/${productId}?qty=${qty}`);
	} catch (err) {
		console.log(err);
	}
}

export const increaseProductQty = (productId) => async dispatch => {
	try{
		dispatch({
			type: INCR_PRODUCT_QTY,
			payload: {
				id: productId
			}
		});
	}catch(err){
		console.log(err);
	}
};
export const decreaseProductQty = (productId) => async dispatch => {
	try{
		dispatch({
			type: DECR_PRODUCT_QTY,
			payload: {
				id: productId
			}
		});
	}catch(err){
		console.log(err);
	}
		
	
};

export const deleteCartItem = (productId) => async dispatch => {
	try{
		dispatch({
			type: DELETE_CART_ITEM,
			payload: {
				id: productId
			}
		});
	}catch(err){
		console.log(err);
	}
	
};

export const clearCart = () => async dispatch => {
	try{
		dispatch({
			type: CLEAR_CART,
		});
	}catch(err){
		console.log(err);
	}
};


