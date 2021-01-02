import {ALL_PRODUCT,LOAD_PAGE,SIGNLE_PRODUCT } from '../actions/type'

const initailState = {
	get_all_product: [],
	loading: false,
	get_single_product:{}

}

export default function (state = initailState, action) {
	const { type, payload } = action
	switch (type) {
		case LOAD_PAGE:
			return {
				...state,
				loading: true
			};
		case ALL_PRODUCT:
			return {
				...state,
				get_all_product: payload,
				loading: false
			}
		case SIGNLE_PRODUCT:
			return{
				...state,
				get_single_product:payload,
				loading:false
			}	
		default:
			return state
	}
}