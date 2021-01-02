import {
	ADD_TO_CART_FAILURE,
	ADD_TO_CART_REQUEST,
	ADD_TO_CART_SUCCESS,
	 CLEAR_CART,
	DECR_PRODUCT_QTY,
	 DELETE_CART_ITEM,
	INCR_PRODUCT_QTY
} from '../actions/type';

let initialState = {
	cartItems: [],
	loading: false,
	errorMessage: ''
};
export default function (state = initialState, action)  {
	let { type, payload } = action;
	switch (type) {
		case ADD_TO_CART_REQUEST:
			return {
				...state,
				loading: true
			};
		case ADD_TO_CART_SUCCESS:
			let item = state.cartItems.find(cartItem => cartItem._id === payload._id);
			if (item) {
				return {
					...state,
					loading: false,
					cartItems: [...state.cartItems]
				};
			}
			else {
				return {
					...state,
					loading: false,
					cartItems: [...state.cartItems, payload]
				};
			}
		case ADD_TO_CART_FAILURE:
			return {
				...state,
				loading: false,
				errorMessage: payload
			};
		case INCR_PRODUCT_QTY:
			let increasedProducts = state.cartItems.map(cartItem => {
				if (cartItem._id === payload.id) {
					cartItem.qty = cartItem.qty + 1
					return cartItem;
				}
				return cartItem;
			});
			return {
				...state,
				cartItems: increasedProducts
			};
		case DECR_PRODUCT_QTY:
			let decreasedProducts = state.cartItems.map(cartItem => {
				if (cartItem._id === payload.id) {
					cartItem.qty = (cartItem.qty - 1) <= 0 ? 1 : cartItem.qty - 1;
					return cartItem;
				}
				return cartItem;
			});
			return {
				...state,
				cartItems: decreasedProducts
			};
		case DELETE_CART_ITEM:
			let filteredCarItems = state.cartItems.filter(cartItem => {
				return cartItem._id !== payload.id;
			});
			return {
				...state,
				cartItems: filteredCarItems
			};
		case CLEAR_CART:
			return {
				...state,
				loading: false,
				cartItems: []
			};
		default: return state;
	}
};

