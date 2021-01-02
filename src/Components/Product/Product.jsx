import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { removeAlert } from '../../Redux/actions/alert';
import Snack from '../../Common/Snack/SnackBar'
//Redux
import { connect } from 'react-redux';
import { getALlProduct } from '../../Redux/actions/product'
import { addToCart } from '../../Redux/actions/cart'
import Spinner from '../../Common/Spinner/Spinner';

const useStyles = makeStyles({
	root: {
		width:300,
		display:"flex",
		justifyContent:"center",
		flexDirection:"column",
		alignItems:"center",
	},
	root2:{
		display:"flex",
		justifyContent:"center",

		"& .MuiGrid-container":{
			display:"flex",
			justifyContent:"center",

			"& .MuiGrid-item":{
				margin:20
			}
		}
	},
	image:{
		display:"flex",
		justifyContent:"center",
		alignItems:"center"
	},
	media: {
		height: 140,
	},
});
const Product = (props) => {
	const classes = useStyles();
	const history = useHistory()
	
	const { getALlProduct, addToCart, removeAlert, alert } = props
	const productData = props.product?.get_all_product
	const load = props.product?.loading

	React.useEffect(() => {
		getALlProduct()
	}, [])

	const redirects = (id) => {
		history.push(`/productdetails/${id}`)
	}
	const addProductToCart = (productId) => {
		const quantity = 1;
		addToCart(productId, quantity);
	};
	const handleCloses = () => {
		removeAlert()
	};

	

	return (
		<>
			{
				load ? <Spinner /> :
					<div className={classes.root2}>
						<Snack type={alert.type} key="" message={alert.message} open={alert.open} close={handleCloses} />
						<Grid container>
							{
							productData ?	productData.map((sdata) => (
									<Grid item>
										<Card className={classes.root}>
											<CardActionArea>
												<div className={classes.image} onClick={(e) => redirects(sdata._id)}>
													<img src={sdata.image} alt="" />
												</div>
												<CardContent>
													<Typography gutterBottom variant="h6" component="h2">
														Produt Name: <span className="brand_name">{sdata.name}</span>
													</Typography>
													<Typography gutterBottom variant="h6" component="h2">
														Brand: <span className="brand_name">{sdata.brand}</span> 
													</Typography>

													<Typography variant="body2" color="textSecondary" component="p">
														Price : &#8377;{sdata.price}
													</Typography>
												</CardContent>
											</CardActionArea>
											<CardActions>
												<Button size="small" onClick={(e) => redirects(sdata._id)} style={{ backgroundColor: "red", color: "white",padding:"5px 15px" }} >
													More Details
        										</Button>
												<Button size="small" style={{ backgroundColor: "#f42b68", color: "white",padding:"5px 15px" }} onClick={(e) => addProductToCart(sdata._id)}>Add to cart</Button>
											</CardActions>
										</Card>
									</Grid>
								))
							:""}
						</Grid>
					</div>
			}
		</>
	)
}

const mapStateToProps = state => ({
	product: state.product,
	cart: state.cart,
	alert: state.alert,
})

export default connect(mapStateToProps, { getALlProduct, addToCart, removeAlert })(Product);
