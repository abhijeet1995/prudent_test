import React from 'react'
import {Link} from 'react-router-dom'
import './style.css'
import { connect } from 'react-redux' 
import {logout} from '../../Redux/actions/auth'
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
	badge: {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
	},
}))(Badge);
const Navbar = (props) => {
	const isAuthenticated = props.auth?.isAuthenticated
	const cartItems = props.cart?.cartItems
	const name = props.auth?.user?.name
	const {logout} = props
	return (
		<div>
			<nav className="nav">
			<ul>
				{
					isAuthenticated ? 
					<div>
							
							<li><Link className="active" to="/">Home</Link></li>
							<Link to="/cart/1">
								<IconButton aria-label="cart">
									<StyledBadge
									
										badgeContent={
											cartItems && cartItems.length
										}
									
									color="secondary">
										<ShoppingCartIcon />
									</StyledBadge>
								</IconButton>
							</Link>
							
							<li><Link to="/product">Product</Link></li>
							<li><Link onClick={logout} to="/">Logout</Link></li>
							<li><Link  to="/product">{name}</Link></li>
					</div>
				: 
				<div>
							<li><Link className="active" to="/">Home</Link></li>
							<li><Link to="/login">Login</Link></li>
							<li><Link to="/signup">Signup</Link></li>
							
				</div>
				}
				
				
			</ul>
			</nav>
		</div>
	)
}

const mapStateToProps = state => ({
	auth: state.auth ,
	cart :state.cart

})

export default connect(mapStateToProps,{logout})(Navbar);
