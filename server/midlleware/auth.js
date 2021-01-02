const jwt = require('jsonwebtoken')
require('dotenv').config();
module.exports =async (req, res, next) => {
	// Get token from header
	const token = req.header('jwt');

	// Check if not token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	// Verify token
	try {
		await jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
			if (error) {
				res.status(401).json({ msg: 'Token is not valid' });
			}
			else {
				req.user = decoded.user;
				console.log("----hiiiiii---", req.user)
				next();
			}
		});
	} catch (err) {
		console.error('something wrong with auth middleware')
		res.status(500).json({ msg: 'Server Error' });
	}
}



