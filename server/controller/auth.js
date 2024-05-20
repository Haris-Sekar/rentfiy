import user from "../models/user.js";
import { fieldValidation } from "../utils/api.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
	loginTry: try {
		const { email, password } = req.body;

		const validation = fieldValidation(["email", "password"], req.body);

		const exisitingUser = await user.findOne({
			email,
		});

		if (exisitingUser) {
			const result = await bcrypt.compare(password, exisitingUser.password);
			if (result) {
				const token = jwt.sign(
					{
						id: exisitingUser._id,
						email: email,
					},
					process.env.PRIVATEKEY
				);

				res.status(200).json({
					token,
					message: "Login successfull",
					user: exisitingUser,
				});
			} else {
				res.status(401).json({
					message: "Invalid Credentials",
					code: 401,
				});
			}
		} else {
			res.status(401).json({
				message: "Invalid Credentials",
				code: 401,
			});
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: "Something went wrong",
			code: 500,
			error: e,
		});
	}
};

export const signup = async (req, res) => {
	signupTry: try {
		const { firstName, lastName, email, phoneNumber, password } = req.body;

		const validation = fieldValidation(
			["firstName", "lastName", "email", "phoneNumber", "password"],
			req.body
		);

		if (validation) {
			res.status(403).json(validation);
			break signupTry;
		}
		const salt = await bcrypt.genSalt(10);
		const encPassoword = await bcrypt.hash(password, salt);
		const user1 = new user({
			firstName,
			lastName,
			email,
			phoneNumber,
			password: encPassoword,
		});
		const newUser = await user1.save();
		newUser.token = newUser.generateToken();
		res.status(201).json({
			user: newUser,
			message: "User created successfully",
			token: newUser.token,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: "Something went wrong",
			code: 500,
			error: e,
		});
	}
};
