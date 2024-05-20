import user from "../models/user.js";
import jwt from "jsonwebtoken";
export const authendicate = async (req, res, next) => {
	authendicateUserTry: try {
		let token = req.headers.authorization;
		if (!token) {
			const response = {
				code: 401,
				message: `Unauthorized Access`,
			};
			res.status(401).json(response);
			break authendicateUserTry;
		}

		token = token.split(" ")[1];
		const authJson = jwt.decode(token, process.env.PRIVATEKEY);

		const user1 = await user.findOne({ _id: authJson.id });
		if (!user1) {
			res.status(401).json({
				code: 401,
				message: `Unauthorized Access`,
			});
			break authendicateUserTry;
		}

		if (user1.email === authJson.email) {
			req.id = user1._id;
			req.email = user1.email;
			next();
		} else {
			res.status(401).json({ code: 401, message: `Unauthorized Access` });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Something went wrong!",
			code: 500,
		});
	}
};
