import React, { Fragment } from "react";
import { Grid, Typography, Divider } from '@material-ui/core'
import { decreaseProductQty, deleteCartItem, increaseProductQty } from "../../Redux/actions/cart"
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux'
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 360,
	},
});

const CartPage = (props) => {
	const classes = useStyles();
	const { decreaseProductQty, deleteCartItem, increaseProductQty } = props
	const cartItems = props.cart?.cartItems

	const calculateTotal = () => {
		let total = 0;
		cartItems.forEach(cartItem => {
			total += cartItem.qty * cartItem.price;
		});
		return total;
	};


	const calculateTax = () => {
		return (calculateTotal() * 18) / 100;
	};

	const grandTotal = () => {
		return calculateTotal() + calculateTax();
	};

	const increaseQty = (productId) => {
		increaseProductQty(productId)
	};

	const decreaseQty = (productId) => {
		decreaseProductQty(productId)
	};

	const deleteItem = (productId) => {
		deleteCartItem(productId)
	};

	return (
		<Fragment>
			<Grid style={{ display: "flex", justifyContent: "center", overflowX: "hidden", maxWidth: "100vw", padding: "2rem" }} container spacing={2}>
				<Grid item md={8}>
					<Paper className={classes.root}>
						{
							cartItems.length > 0 ?

								<TableContainer className={classes.container}>
									<Table stickyHeader size="small" aria-label="a dense table">
										<TableHead>
											<TableRow>
												<TableCell style={{ fontWeight: "600" }} >S.no</TableCell>
												<TableCell style={{ fontWeight: "600" }}>Images</TableCell>
												<TableCell style={{ fontWeight: "600" }} align="left">Product Name</TableCell>
												<TableCell style={{ fontWeight: "600" }} align="left">Quantity</TableCell>

												<TableCell style={{ fontWeight: "600" }} align="left">Price</TableCell>
												<TableCell style={{ fontWeight: "600" }} align="left">Inc Qty</TableCell>
												<TableCell style={{ fontWeight: "600" }} align="left">Dec Qty</TableCell>
												<TableCell style={{ fontWeight: "600" }} align="left">Delete</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>

											{cartItems ? cartItems.map((cartItem, i) => (
												<TableRow key={i}>
													<TableCell component="th" scope="row">
														{i + 1}
													</TableCell>

													<TableCell align="left" >{<img src={cartItem.image} alt="" width="50" height="50" style={{ borderRadius: "50px" }} />}</TableCell>

													<TableCell align="left">{cartItem.name}</TableCell>
													<TableCell align="left">{cartItem.qty}</TableCell>
													<TableCell align="left">
														{cartItem?.price?.toFixed(2) * cartItem?.qty} &#8377;
											</TableCell>
													<TableCell align="left">
														<AddIcon onClick={() => increaseQty(cartItem._id)} style={{ cursor: "pointer" }} />
													</TableCell>
													<TableCell align="left">
														<RemoveIcon onClick={() => decreaseQty(cartItem._id)} style={{ cursor: "pointer" }} />
													</TableCell>
													<TableCell align="left">
														<DeleteIcon onClick={() => deleteItem(cartItem._id)} style={{ cursor: "pointer" }} />
													</TableCell>

												</TableRow>
											)) : ""}
										</TableBody>
									</Table>

								</TableContainer> : <div>
									<Typography style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "2rem" }}>Opps ! Your cart is Empty Please click here <Link to="/product">Add to cart</Link> <SentimentVeryDissatisfiedIcon /></Typography>
								</div>
						}
					</Paper>
				</Grid>

				<Grid item md={4}>
					{
						 cartItems.length > 0 ?
							<Paper className={classes.root}>
								<Typography style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "1rem" }}>Total Bill</Typography>
								<Divider />
								<div style={{ display: "flex", justifyContent: "space-evenly", paddingBottom: "1rem" }}>
									<Typography>Total Price</Typography>
									<Typography>{calculateTotal().toFixed(2)} &#8377;</Typography>
								</div>
								<div style={{ display: "flex", justifyContent: "space-evenly", paddingBottom: "1rem" }}>
									<Typography>Tax Gst 18%</Typography>
									<Typography>{calculateTax().toFixed(2)} &#8377;</Typography>
								</div><Divider />
								<div style={{ display: "flex", justifyContent: "space-evenly", padding: "1rem" }}>
									<Typography>Grand Total</Typography>
									<Typography>{grandTotal().toFixed(2)} &#8377;</Typography>
								</div>
							</Paper>
							: null}
				</Grid>
			</Grid>
		</Fragment>
	);
};
const mapStateToProps = state => ({
	product: state.product,
	cart: state.cart
})

export default connect(mapStateToProps, { decreaseProductQty, increaseProductQty, deleteCartItem })(CartPage);
