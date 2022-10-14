import db from "../database/database.js";

const validateToken = async (req, res, next) => {
  const token = req.headers.Authorization.replace("Bearer ", "");

  const user = await db.query("SELECT * FROM users WHERE token=$1;", [token]);
  if (user.rowCount <= 0) {
    res.status(401).send({ message: "Unauthorized token." });
    return;
  }

  res.locals.user = user.rows[0];
  next();
};

export { validateToken };
