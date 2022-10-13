import express from "express";

import {
  postSignUpUser,
  postSignInUser,
  getUserDataByToken,
  getUsersRanking,
} from "../controllers/users.controller.js";

const router = express.Router();

router.post("/signup", postSignUpUser);
router.post("/signin", postSignInUser);
router.get("/users/me", getUserDataByToken);
router.get("/ranking", getUsersRanking);

export default router;
