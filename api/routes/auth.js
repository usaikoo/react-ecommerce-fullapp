const User = require("../models/User");

const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//register

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PWD_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    // console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body.username)
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("Wrong credentials");
    }

    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PWD_SEC
    );
    const pwd = hashPassword.toString(CryptoJS.enc.Utf8);
    if (pwd !== req.body.password) {
      return res.status(401).json("Wrong Password");
    }

    const token =  jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({...others,token});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
