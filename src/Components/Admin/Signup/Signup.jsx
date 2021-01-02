import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Card from '../../controls/card/Card'
import InputField from '../../controls/InputField/InputField'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snack from '../../../Common/Snack/SnackBar'
import './Style.css'

//redux
import { connect } from 'react-redux';
import { setAlert, removeAlert } from '../../../Redux/actions/alert';
import { register } from '../../../Redux/actions/auth';
import { loader } from '../../../Redux/actions/loader'


const Signup = (props) => {
	const {  register, alert, removeAlert, load } = props
	const history = useHistory()
	//state
	const [formData, setFormData] = useState({
		name:"",
		email: "",
		password: "",
	})
	const { name,email, password} = formData


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
			register({ name, email, password })
		
			setFormData({...formData,
				name:"",
				email:"",
				password:""
			})
		
	};

	const handleCloses = () => {
		removeAlert()
	};

		

	return (
		<div>
			<Snack type={alert.type} key="" message={alert.message} open={alert.open} close={handleCloses} />
			<Card title="Signup">
				<form>
					<div>
						<InputField
							placeholder="Full Name"
							type="text"
							name="name"
							value={name}
							onChange={(e) => handleChange(e)}
							IconPerson={AccountCircleIcon}
						/>
					</div>
					<div>
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
					<div className="login_text">
						<p>Already Login? <span className="redirect_login"onClick={()=>history.push('/login')} >Please Login</span></p>
					</div>
					<div >
						<button 
							className="btn_signup"
							onClick={clickSubmit}
						>
							{
								load ? (<CircularProgress size={14} style={{ color: "red" }} />) : "Register"
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

export default connect(mapStateToProps, { setAlert, removeAlert, register, loader })(Signup);

