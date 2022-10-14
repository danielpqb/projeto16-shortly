import express from "express";

import { postSignUpUser, postSignInUser, getUserDataByToken, getUsersRanking } from "../controllers/users.controller.js";

import { validateSchema } from "../middlewares/validateSchema.middleware.js";

import * as schemas from "../schemas/users.schemas.js";

const router = express.Router();

router.post("/signup", validateSchema(schemas.postSignUpUser), postSignUpUser);
router.post("/signin", validateSchema(schemas.postSignInUser), postSignInUser);
router.get("/users/me", getUserDataByToken);
router.get("/ranking", getUsersRanking);

export default router;
