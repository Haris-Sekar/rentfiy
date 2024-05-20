import mongoose, { Schema } from "mongoose";

const property = new mongoose.Schema({
	title: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		require: true,
	},
	location: {
		type: String,
		require: true,
	},
	rentType: {
		type: Number,
		require: true,
	},
	amount: {
		type: Number,
	},
	deposit: {
		type: Number,
	},
	buildUp: {
		type: Number,
	},
	furnishing: {
		type: Number,
	},
	propertyType: {
		type: Number,
	},
	preferredTenants: {
		type: Number,
	},
	floor: {
		type: Number,
	},
	bhk: {
		type: String,
	},
	addedUserId: {
		type: Schema.ObjectId,
		ref: "user",
	},
});

const model = mongoose.model("property", property);
export default model;
