import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import loader from './loader'
import alert from './alert'
import auth from './auth'
import product from './product'
import cart from './cart'
const persistConfig = {
	key: 'root',
	storage,
}



const rootReducer = combineReducers({
	alert,
	auth,
	loader,
	product,
	cart
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer;