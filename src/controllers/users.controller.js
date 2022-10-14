import db from "../database/database.js";

async function postSignUpUser(req, res) {
  const { name, email, password } = req.body;

  try {
    const find_email = await db.query("SELECT * FROM users WHERE email=$1;", [email]);
    if (find_email.rowCount > 0) {
      res.status(409).send({ message: "Email already in use." });
      return;
    }

    await db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3);", [name, email, password]);
    res.status(201).send({ message: "User registered." });
    return;
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

async function postSignInUser(req, res) {}

async function getUserDataByToken(req, res) {}

async function getUsersRanking(req, res) {}

export { postSignUpUser, postSignInUser, getUserDataByToken, getUsersRanking };
