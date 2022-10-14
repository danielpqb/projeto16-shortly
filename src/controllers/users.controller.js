async function postSignUpUser(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  res.status(201).send({ message: "User registered." });
  return;
  try {
  } catch (error) {}
}

async function postSignInUser(req, res) {
  try {
  } catch (error) {}
}

async function getUserDataByToken(req, res) {
  try {
  } catch (error) {}
}

async function getUsersRanking(req, res) {
  try {
  } catch (error) {}
}

export { postSignUpUser, postSignInUser, getUserDataByToken, getUsersRanking };
