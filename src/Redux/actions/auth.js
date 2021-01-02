import axios from 'axios'
import {
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	USER_LOADED,
	REMOVE_ALERT,
	AUTH_ERROR,
	LOADER,
	} from './type';
import { setAlert } from './alert'
import authToken from '../../Utils/authToken';


//Load user

export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		authToken(localStorage.token)
	}
	try {
		const res = await await axios.get("http://localhost:3001/api/userdetails");
		dispatch({
			type: USER_LOADED,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		})
	}
}




//Register User

export const register = ({ name, email, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	localStorage.clear();
	const body = JSON.stringify({ name, email, password })
	try {
		dispatch({
			type: LOADER,
			payload: true
		})
		const res = await axios.post('http://localhost:3001/api/register', body, config);
		console.log("=========", res.data)
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
			loading: false,
		})
		dispatch(loadUser())
		dispatch({
			type: LOADER,
			payload: false
		})
		dispatch(setAlert("Register Sucess Please login", "success"))
	} catch (err) {
		dispatch({
			type: LOADER,
			payload: false
		})
		if (err.response) {
			dispatch(setAlert(err.response.data.errors[0].msg,"error"));
			dispatch({
				type: REGISTER_FAILURE
			});
		} else {
			dispatch(setAlert("Network error ! Please check your connection"));
			dispatch({
				type: REGISTER_FAILURE
			});
		}
	}
};


//Login

export const login = ({email, password}) => async dispatch => {
	delete axios.defaults.headers.common['jwt'];
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	localStorage.clear();
	const body = JSON.stringify({ email, password })
	console.log("body", body);
	try {
		dispatch({
			type: LOADER,
			payload: true
		})
		const res = await axios.post("http://localhost:3001/api/login", body, config);
		console.log("=========", res.data)
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data, loading: false
		})
		dispatch(loadUser())
		dispatch({
			type: LOADER,
			payload: false
		})
	}
	catch (err) {
		dispatch({
			type: LOADER,
			payload: false
		})
		if (err.response) {
		dispatch(setAlert(err.response.data.errors[0].msg,"error"));
			dispatch({
				type: LOGIN_FAILURE
			});
		}
		else {
			dispatch(setAlert("Network error ! Please check your connection"));
		
			dispatch({
				type: LOGIN_FAILURE
			});
		}
	}
};

//Logout 
export const logout = () => dispatch => {
	dispatch({ type: LOGOUT });
	dispatch({
		type: REMOVE_ALERT,
		payload: false
	});
};
