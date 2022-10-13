import express from "express";

import { getUsers } from "../controllers/users.controller.js";

const router = express.Router();

router.get("/users/me", getUsers);

export default router;
