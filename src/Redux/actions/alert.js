import { SHOW_ALERT, REMOVE_ALERT } from '../actions/type';

export const setAlert = (data, typeRes) => dispatch => {

	dispatch({
		type: SHOW_ALERT,
		payload: {
			message: data,
			type: typeRes,
			open: true,
		}
	});
};

export const removeAlert = () => dispatch => {
	dispatch({
		type: REMOVE_ALERT
	});
}