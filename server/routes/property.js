import express from "express";

import { authendicate } from "../middleware/authendication.js";

import {
	addProperty,
	fetchProperty,
	mailProperty,
} from "../controller/property.js";

const router = express.Router();

router.post("/", authendicate, addProperty);

router.get("/", fetchProperty);

router.post("/sendOwnerDetails", authendicate, mailProperty);

export default router;
