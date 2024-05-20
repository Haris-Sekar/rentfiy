import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

const port = process.env.PORT;

import users from "./routes/auth.js";
import property from "./routes/property.js";

app.use("/users", users);
app.use("/property", property);

mongoose
	.connect(process.env.DB_URL)
	.then(() =>
		app.listen(port, () => {
			console.log(`Server Started in port :: ${port}`);
		})
	)
	.catch((e) => console.log(`Server statup error :: ${e}`));
