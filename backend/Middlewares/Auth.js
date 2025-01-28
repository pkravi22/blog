const jwt = require("jsonwebtoken");

const ensureAuthentication = (req, res, next) => {
  console.log("Request Headers:", req.headers);

  // Get Authorization header
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  console.log(authHeader+"hllo");

  if (!authHeader) {
    console.log("Authorization header missing");
    return res.status(403).send({ message: "Unauthorized access - No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token from the header

  if (!token) {
    console.log("Token missing in Authorization header");
    return res.status(403).send({ message: "Unauthorized access - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log("Ensured authentication");
    next();
  } catch (err) {
    console.log("Invalid token");
    return res.status(403).send({ message: "Unauthorized access - Invalid token" });
  }
};

module.exports = ensureAuthentication;
