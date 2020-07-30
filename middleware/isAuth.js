const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    const error = new Error("Not authenticated");
    error.code = 401;
    throw error;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err || !data) {
      const error = new Error("Not authorized");
      error.code = 403;
      throw error;
    }
    req.email = data.email;
    next();
  })
}