import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Model from "./user.model.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Model.findOne({ email: email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword)
      return res.status(404).json({ message: "password incorrect" });

    const token = jwt.sign(
      { email: email, id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "30m" }
    );

    res.status(200).json({ result: user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error" });
  }
};

export const register = async (req, res) => {
  const { email, password, confirmPassword, username } = req.body;

  try {
    const user = await Model.findOne({ email: email, username: username });

    if (Object.keys(user).length !== 0)
      return res.status(400).json({ message: "user already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "password don't match" });

    const bcryptPassword = await bcrypt.hash(password, 12);

    const newUser = await Model.create({
      email: email,
      password: bcryptPassword,
      username: username,
    });

    const token = jwt.sign(
      { email: email, id: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "30m" }
    );

    res.status(200).json({ result: newUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error" });
  }
};
