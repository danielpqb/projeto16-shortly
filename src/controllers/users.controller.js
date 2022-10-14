import db from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

async function postSignUpUser(req, res) {
  const { name, email, password } = req.body;

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const find_email = await db.query("SELECT * FROM users WHERE email=$1;", [email]);
    if (find_email.rowCount > 0) {
      res.status(409).send({ message: "Email already in use." });
      return;
    }

    await db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3);", [name, email, passwordHash]);
    res.status(201).send({ message: "User registered." });
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

async function postSignInUser(req, res) {
  const { email, password } = req.body;
  const token = uuid();

  try {
    //User exists?
    const find_user = await db.query("SELECT * FROM users WHERE email=$1;", [email]);
    if (find_user.rowCount <= 0) {
      res.status(401).send({ message: "Incorrect user/password." });
      return;
    }

    //Incorrect password?
    const user = find_user.rows[0];
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).send({ message: "Incorrect user/password." });
      return;
    }

    res.status(200).send({ message: "You have loged in.", token: token });
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

async function getUserDataByToken(req, res) {
  const { user } = res.locals;

  try {
    const sum_visits = await db.query("SELECT SUM(visits) AS visits FROM urls WHERE user_id=$1;", [user.id]);
    const visitCount = sum_visits.rows[0].visits;

    const find_user_urls = await db.query(`SELECT (id, shortUrl, url, visits AS "visitCount") FROM urls WHERE user_id=$1;`, [user.id]);
    const user_urls = find_user_urls.rows;

    res.status(200).send({ message: "UserData found.", id: user.id, name: user.name, visitCount: visitCount, shortenedUrls: user_urls });
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

async function getUsersRanking(req, res) {}

export { postSignUpUser, postSignInUser, getUserDataByToken, getUsersRanking };
