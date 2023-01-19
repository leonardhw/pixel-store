const { User } = require("../models");
const { comparePassword } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jwt");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      let role = "admin";
      const newUser = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      //* deconstruct dr post
      const { email, password } = req.body;
      //* if email/pass falsy
      console.log(email, password);
      if (!email || !password) {
        throw { name: "BAD_REQUEST_LOGIN" };
      }
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });
      //* if user not found
      if (!foundUser) {
        throw { name: "INVALID_CREDENTIALS" };
      }
      //* if user found, but wrong password
      const passwordMatch = comparePassword(password, foundUser.password);
      if (!passwordMatch) {
        throw { name: "INVALID_CREDENTIALS" };
      }
      //* if email & password match
      //panggil si helper untuk membuat token
      const payload = {
        id: foundUser.id,
      };
      const access_token = createToken(payload);

      res.status(200).json({
        access_token,
        username: foundUser.username,
        role: foundUser.role,
        email: foundUser.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
