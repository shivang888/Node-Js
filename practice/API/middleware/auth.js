const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const auth = async (req, res, next) => {
  try {
    console.log(req.body);
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ message: "Please login" });
    }
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(400).json({ message: "Invalid token" });
    }

    console.log(decoded);

    if (req.body.email !== decoded.user.email) {
      return res.status(400).json({ message: "Email mismatch" });
    }
    const passwordMatches = await bcrypt.compare(
      req.body.password,
      decoded.user.password
    );

    if (!passwordMatches) {
      return res.status(400).json({ message: "Invalid password" });
    }
    req.body.userId = decoded.user._id;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Authentication failed", error: error.message });
  }
};

module.exports = auth; 