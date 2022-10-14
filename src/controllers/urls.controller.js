import db from "../database/database.js";
import { nanoid } from "nanoid";

async function postShortenUrl(req, res) {
  const { user } = res.locals;
  const { url } = req.body;
  const shortUrl = nanoid();

  try {
    await db.query("INSERT INTO urls (url, shortUrl, user_id) VALUES ($1, $2, $3);", [url, shortUrl, user.id]);
    res.status(201).send({ message: "Url shortend.", shortUrl: shortUrl });
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

async function getUrlById(req, res) {
  const { id } = req.params;
  try {
    const find_url = await db.query("SELECT * FROM urls WHERE id=$1;", [id]);
    if (find_url.rowCount <= 0) {
      res.status(404).send({ message: "This url_id doesn't exist." });
      return;
    }

    const url = find_url.rows[0];
    res.status(200).send({ message: "Url data found.", id: url.id, shortUrl: url.shortUrl, url: url.url });
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

async function getOpenShortUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const find_url = await db.query("SELECT * FROM urls WHERE shortUrl=$1;", [shortUrl]);
    if (find_url.rowCount <= 0) {
      res.status(404).send({ message: "This shortUrl doesn't exist." });
      return;
    }

    const url = find_url.rows[0];
    await db.query("UPDATE urls SET visits=$1 WHERE shortUrl=$2;", [url.visits + 1, url.shortUrl]);
    res.redirect("/redirected");
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

async function deleteUrlById(req, res) {
  const { user } = res.locals;
  const { id } = req.params;

  try {
    const find_url = await db.query("SELECT * FROM urls WHERE id=$1;", [id, user.id]);
    if (find_url.rowCount <= 0) {
      res.status(404).send({ message: "This shortUrl doesn't exist." });
      return;
    }

    const find_user_url = await db.query("SELECT * FROM urls WHERE id=$1 AND user_id=$2;", [id, user.id]);
    if (find_user_url.rowCount <= 0) {
      res.status(401).send({ message: "This shortUrl doesn't exist for this user." });
      return;
    }

    const url = find_url.rows[0];
    await db.query("DELETE FROM urls WHERE id=$1;", [url.id]);
    res.status(204).send({ message: "Url deleted." });
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

export { postShortenUrl, getUrlById, getOpenShortUrl, deleteUrlById };
