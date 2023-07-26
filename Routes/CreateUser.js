const express = require("express");
const Router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");


const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");
const jwtSecret="Hello amine";

Router.post(
  "/addUser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {


      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const secPassword = await bcrypt.hash(req.body.password, salt);


    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

Router.post(
  "/loginuser",
  [
    body("email","incorrect email").isEmail(),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let email = req.body.email;
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let userData = await User.find({email:email});


      if (userData.length===0) {
        return res
          .status(400)
          .json({ errors: "there is no user with this email address" });
      }

      const pwdCompare=bcrypt.compare(req.body.password,userData[0].password)

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "try logging with correct password" });
      }

      const data={
        user:{
          id:userData[0]._id
        }
      }

      const authToken=jwt.sign(data,jwtSecret);

      res.json({ success: true ,authToken:authToken});
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = Router;
