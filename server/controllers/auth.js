const Auth = require('../models/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {

		try {
			let { name, email, password } = req.body;
			if(!name){
				return res.status(400).json({ errors: [{ msg: 'Please Enter name' }] });
			}
			if (!email) {
				return res.status(400).json({ errors: [{ msg: 'Please Enter Email' }] });
			}
			if (!password) {
				return res.status(400).json({ errors: [{ msg: 'Please Enter Password' }] });
			}
			// check the user exists
			let user = await Auth.findOne({ email });
			if (user) {
				return res.status(400).json({ errors: [{ msg: 'Email already exists' }] });
			}
			// store the user
			user = new Auth({ name, email, password});
			 await user.save();
			res.status(200).json({
				message:"user Register"
			})
			

		}
		catch (err) {
			console.error(err);
			res.status(500).json({ errors: [{ msg: err.message }] });
		}
}

exports.login = async(req,res)=>{
	try {
		let { email, password } = req.body;
		if(!email){
			return res.status(400).json({ errors: [{ msg: 'Please Enter Email' }] });
		}
		if (!password) {
			return res.status(400).json({ errors: [{ msg: 'Please Enter Password' }] });
		}
		// check if user exists
		let user = await Auth.findOne({ email });
		if (!user) {
			return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
		}

		let isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
		}

		// json web token
		let payload = {
			user: {
				id: user.id
			}
		};
		jwt.sign(payload, process.env.JWT_SECRET_KEY, (err, token) => {
			if (err) throw err;
			res.status(200).json({
				result: 'success',
				token: token
			});
		});

	}
	catch (err) {
		console.error(err);
		res.status(500).json({ errors: [{ msg: err.message }] });
	}
}


exports.userDetails = async (req, res) => {
	try {
		const user = await Auth.findById(req.user.id).select({ password: 0});
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
}

