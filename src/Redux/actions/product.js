
import {  ALL_PRODUCT,SIGNLE_PRODUCT,LOAD_PAGE} from './type';
import axios from 'axios';
import authToken from '../../Utils/authToken';

export const getALlProduct = () => async dispatch => {
	if (localStorage.token) {
		authToken(localStorage.token)
	}
	try {
		dispatch({
			type: LOAD_PAGE
		})
		const res = await axios.get("http://localhost:3001/api/allproduct")
		console.log(res.data);
		dispatch({
			type: ALL_PRODUCT,
			payload: ([...res.data.product])
		})
	} catch (err) {
		console.log(err);
	}
}


export const getSingleProductDetails = (id) => async dispatch => {
	
	if (localStorage.token) {
		authToken(localStorage.token)
	}
	try {
		dispatch({
			type: LOAD_PAGE
		})
		const res = await axios.get(`http://localhost:3001/api/singleproduct/${id}`)
		console.log(res.data);
		dispatch({
			type: SIGNLE_PRODUCT,
			payload: res.data.product
		})

	} catch (err) {
		console.log(err);
	}
}



