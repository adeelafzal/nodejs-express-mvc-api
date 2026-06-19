const jwt = require("jsonwebtoken");
const secret = "Absad65dsad54sa";

function getJWT(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret,
    {
      expiresIn: "15m",
    }
  );
}

function verifyToken(token) {
  if (!token) return null;
  return jwt.verify(token, secret);
}

module.exports = {
  getJWT,
  verifyToken,
};
