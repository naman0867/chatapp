const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const profileController = async (req, res) => {
  const token = req.cookies?.authToken;

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  jwt.verify(
    token,
    process.env.JWTPRIVATEKEY,
    {},
    async (err, userData) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }

      try {
        const user = await User.findById(userData._id);

        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }

        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  );
};

const profileUpdate = async (req, res) => {
  const token = req.cookies?.authToken;

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  jwt.verify(
    token,
    process.env.JWTPRIVATEKEY,
    {},
    async (err, userData) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }

      try {
        const { firstName, lastName, email, avatarLink } = req.body;

        const user = await User.findById(userData._id);

        if (!user) {
          return res.status(404).json({
            message: "User doesn't exist",
          });
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.avatarLink = avatarLink;

        await user.save();

        res.status(200).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  );
};

module.exports = {
  profileController,
  profileUpdate,
};