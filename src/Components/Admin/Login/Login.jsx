import React, { useState } from 'react'
import './Style.css'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Card from '../../controls/card/Card'
import InputField from '../../controls/InputField/InputField'
import { useHistory } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import Snack from '../../../Common/Snack/SnackBar'
//redux
import { connect } from 'react-redux';
import { removeAlert } from '../../../Redux/actions/alert';
import { login } from '../../../Redux/actions/auth';
import { loader } from '../../../Redux/actions/loader'

const Login = (props) => {
	const { login, alert, removeAlert, load, isAuthenticated } = props
	const history = useHistory()
	//state
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})
	const { email, password } = formData

	//HandleChange Function
	const handleChange = (e) => {
		console.log(e.target.value);
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const clickSubmit = event => {
		event.preventDefault();
		login({ email, password })
	};

	if (isAuthenticated) {
		history.push("/product")
	}

	const handleCloses = () => {
		removeAlert()
	};

	return (
		<div>
			<Snack type={alert.type} key="" message={alert.message} open={alert.open} close={handleCloses} />
			<Card title="Sign In">
				<form>
					<div className="login_icon_stats">
						<InputField
							placeholder="Email"
							type="email"
							name="email"
							value={email}
							onChange={(e) => handleChange(e)}
							IconEmail={AlternateEmailIcon}
						/>
					</div>
					<div>
						<InputField
							placeholder="Password"
							type="password"
							name="password"
							value={password}
							onChange={(e) => handleChange(e)}
							IconPassword={VisibilityIcon}
						/>
					</div>
					<div className="forgot_text">

						<p>Don't have an account ? <span className="redirect_login" onClick={() => history.push('/signup')} >Please Register</span></p>

					</div>
					<div>
						<button
							className="btn_login"
							onClick={clickSubmit}
						>
							{
								load ? (<CircularProgress size={14} style={{ color: "red", cursor: "pointer" }} />) : "Login"
							}
						</button>
					</div>
				</form>
			</Card>
		</div>
	)
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	alert: state.alert,
	load: state.loader.loading,
});

export default connect(mapStateToProps, { removeAlert, login, loader })(Login);