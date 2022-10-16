import db from "../database/database.js";

const validateToken = async (req, res, next) => {
  const token = req.headers.Authorization.replace("Bearer ", "");

  const user = (await db.query("SELECT * FROM users WHERE token=$1;", [token]))
    .rows[0];
  if (!user) {
    res.status(401).send({ message: "Unauthorized token." });
    return;
  }

  res.locals.user = user;
  next();
};

export { validateToken };
