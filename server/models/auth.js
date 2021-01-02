const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const authSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		max: 32
	},
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	
	


}, { timestamps: true })



authSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});


// Match user entered password to hashed password in database
authSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};





module.exports = mongoose.model("Auth", authSchema);
