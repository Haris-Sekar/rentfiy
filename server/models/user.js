import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const user = new mongoose.Schema({
	firstName: {
		type: String,
		require: true,
	},
	lastName: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	phoneNumber: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	isVerifed: {
		type: Boolean,
		default: false,
	},
});

user.methods.generateToken = function () {
	return jwt.sign(
		{
			id: this._id,
			email: this.email,
			phoneNumber: this.phoneNumber,
			tokenCreatedTime: Date.now(),
		},
		process.env.PRIVATEKEY
	);
};

const model = mongoose.model("user", user);
export default model;
