import express from "express";

import { postShortenUrl, getUrlById, getOpenShortUrl, deleteUrlById } from "../controllers/urls.controller.js";

import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";

import * as schemas from "../schemas/urls.schemas.js";

const router = express.Router();

router.post("/urls/shorten", validateSchema(schemas.postShortenUrl), validateToken, postShortenUrl);
router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", getOpenShortUrl);
router.delete("/urls/:id", validateToken, deleteUrlById);

export default router;
