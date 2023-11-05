import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    res.json("Register Success");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });

    const { id, username, email } = user[0];

    const accessToken = jwt.sign({ id, username, email }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email tidak ditemukan" });
  }
};
