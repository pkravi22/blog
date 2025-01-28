const Usermodel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("authcontroller signup started");
    const user = await Usermodel.findOne({ email });
    console.log(user);
    if (user) {
      return res.status(400).send({ message: "user already exists" });
    } else {
      console.log("new user sigup");
      const newUser = new Usermodel({ name, email, password });
     
      newUser.password = await bcrypt.hash(password, 10);
      console.log("user model created",password);
      await newUser.save();
      console.log("user model saved");
      console.log("new user sigup saVED");
      return res.status(200).send({ message: "user created successfully" });
    }
  } catch (error) {
    return res.status(500).send({ message: "interna server error" });
  }
};
//LOGIN FUNCTIONALITY
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    console.log("User found:", user); // Log the user object
    console.log("Password provided:", password); // Log the provided password
    console.log("Stored password:", user.password); // Log the stored password

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    console.log("User logged in");
    console.log("JWT_SECRET:", process.env.JWT_SECRET); // Log the JWT_SECRET

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const jwtToken = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    console.log("JWT Token created:", jwtToken); // Log the JWT token

    return res.status(200).send({ token: jwtToken });
  } catch (error) {
    console.error("Error during user login:", error); // Log the error
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { signup, login };
