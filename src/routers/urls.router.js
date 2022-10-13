import express from "express";

import {
  postShortenUrl,
  getUrlById,
  getOpenShortUrl,
  deleteUrlById,
} from "../controllers/urls.controller.js";

const router = express.Router();

router.post("/urls/shorten", postShortenUrl);
router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", getOpenShortUrl);
router.delete("/urls/:id", deleteUrlById);

export default router;
