import React from 'react'
import { Switch, Route, BrowserRouter } from "react-router-dom";
import PrivateRoutes from "./Components/Routes/PrivateRoutes"
import Login from './Components/Admin/Login/Login';
import Signup from './Components/Admin/Signup/Signup'
import Home from './Components/Home/Home';
import Layout from './Components/Hoc/Layout'
import Product from './Components/Product/Product';
import ProductDetails from './Components/Product/ProductDetails';
import CartPage from './Components/Product/CartPage';

const Routes = () => {
	return (
		<div>
			<BrowserRouter>
				
			<Switch>
			<Layout>
				<Route path="/" exact component={Home} />
				<Route path="/login" exact component={Login} />
				<Route path="/signup" exact component={Signup}/>
				<PrivateRoutes path="/product" exact component={Product}/>
				
				<PrivateRoutes path="/productdetails/:id" exact component={ProductDetails} />
				<PrivateRoutes exact path="/cart/:id" component={CartPage} />
			</Layout>
			</Switch>
			</BrowserRouter>
		</div>
	)
}

export default Routes
