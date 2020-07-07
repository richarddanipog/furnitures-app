const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  let token;
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    token = authHeader && authHeader.split(" ")[1];
  }

  if (token == null) return res.status(401).send("Unauthorized Error");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};
