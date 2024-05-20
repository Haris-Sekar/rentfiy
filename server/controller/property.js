import { fieldValidation } from "../utils/api.js";
import property from "../models/property.js";
import user from "../models/user.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/mail.js";
export const addProperty = async (req, res) => {
	addPropertyTry: try {
		const validation = fieldValidation(
			[
				"title",
				"description",
				"location",
				"rentType",
				"amount",
				"deposit",
				"buildUp",
				"furnishing",
				"propertyType",
				"preferredTenants",
				"floor",
				"bhk",
			],
			req.body
		);
		if (validation) {
			res.status(403).json(validation);
			break addPropertyTry;
		}

		const {
			title,
			description,
			location,
			bhk,
			rentType,
			amount,
			deposit,
			buildUp,
			furnishing,
			propertyType,
			preferredTenants,
			floor,
		} = req.body;

		const newProperty = new property({
			title,
			description,
			location,
			bhk,
			rentType,
			amount,
			deposit,
			buildUp,
			furnishing,
			propertyType,
			preferredTenants,
			floor,
			addedUserId: req.id,
		});

		const result = await newProperty.save();

		if (result) {
			res
				.status(201)
				.json({ message: "Property added successfully!", property: result });
		} else {
			res.status(500).json({
				message: "Something went wrong!",
				code: 500,
			});
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: "Something went wrong!",
			code: 500,
		});
	}
};

export const fetchProperty = async (req, res) => {
	fetchPropertyTry: try {
		const { perPage, page, isSell } = req.query;

		if (isSell) {
			let token = req.headers.authorization;
			token = token.split(" ")[1];
			const authJson = jwt.decode(token, process.env.PRIVATEKEY);
			const properties = await property
				.find({ addedUserId: authJson.id })
				.populate("addedUserId")
				.skip(perPage * page)
				.limit(perPage);
			const count = await property.countDocuments({ addedUserId: authJson.id });
			res.status(200).json({ properties, count });
		} else {
			const count = await property.countDocuments();
			const properties = await property
				.find()
				.populate("addedUserId")
				.skip(perPage * page)
				.limit(perPage);
			res.status(200).json({ properties, count });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Something went wrong!",
			code: 500,
		});
	}
};

export const mailProperty = async (req, res) => {
	mailPropertyTry: try {
		const validation = fieldValidation(["propertyId"], req.body);
		if (validation) {
			res.status(403).json(validation);
			break mailPropertyTry;
		}
		const property1 = await property
			.findById(req.body.propertyId)
			.populate("addedUserId");
		const userDetails = await user.findById(req.id);
		const resp = sendMail(
			userDetails.email,
			userDetails.firstName + " " + userDetails.lastName,
			{
				email: property1.addedUserId.email,
				phoneNumber: property1.addedUserId.phoneNumber,
			},
			property1
		);
		sendMail(
			property1.addedUserId.email,
			property1.addedUserId.firstName + " " + property1.addedUserId.lastName,
			{
				email: userDetails.email,
				phoneNumber: userDetails.phoneNumber,
			},
			property1
		);
		res.status(200).json(resp);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Something went wrong!",
			code: 500,
		});
	}
};
