import React,{Fragment} from 'react'
import './style.css'
import Snack from '../../Common/Snack/SnackBar'
import { removeAlert } from '../../Redux/actions/alert';
//Redux
import { connect } from 'react-redux';
import { getSingleProductDetails } from '../../Redux/actions/product'
import { addToCart } from '../../Redux/actions/cart'
import {Grid } from '@material-ui/core';
import Spinner from '../../Common/Spinner/Spinner';
const ProductDetails = (props) => {
	const {getSingleProductDetails,addToCart,alert,removeAlert} = props
	const productInfo = props?.product?.get_single_product
	const load = props.product?.loading
	React.useEffect(() => {
		getSingleProductDetails(props.match.params.id)
	}, [props.match.params.id])

	
	const addProductToCart = (productId) => {
		const quantity = 1;
		addToCart(productId, quantity);
	};
	const handleCloses = () => {
		removeAlert()
	};

	return (
		<div>
			{
				load ?<Spinner/> :
				
					<Fragment>
						<Snack type={alert.type} key="" message={alert.message} open={alert.open} close={handleCloses} />
						<div>
							<h4 className="para" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Product Details</h4>
						</div>
						
								{
									Object.keys(productInfo).length > 0 ? <Fragment>
										<Grid container>
											<Grid item md={2}>
											
											</Grid>
											<Grid item md={4}>
												<img src={productInfo.image} alt="" />
											</Grid>
											<Grid item md={4}>
												<div className="product_details">
												<p><span className="span_product">Produt Name</span>&nbsp; {productInfo.name}</p>
												</div>
											<div className="product_details">
											<p><span className="span_product">Brand </span>&nbsp; {productInfo.brand}</p>
											</div>
										<div className="product_details">
											<p><span className="span_product">Category </span>&nbsp;{productInfo.category}</p>
										</div>
										<div className="product_details">
											<p><span className="span_product">Price </span>&nbsp; {productInfo.price} &#8377;</p>
										</div>
										<div>
											<p ><span className="span_product">Stock </span>&nbsp; {productInfo.qty}</p>
										</div>
											<div>
											<p className="para"><span className="span_product">Description </span>&nbsp; {productInfo.description}</p>
											</div>
											
											
										<button className="product_d_button" onClick={(e) => addProductToCart(productInfo._id)}>Add to cart</button>
											</Grid>
											<Grid item md={2}>

											</Grid>
										</Grid>
										
										
									</Fragment> : null
								}
							
					</Fragment> 
			}
		</div>
	)
}

const mapStateToProps = state => ({
	product: state.product,
	alert: state.alert,
})

export default connect(mapStateToProps, { getSingleProductDetails, addToCart, removeAlert })(ProductDetails);
