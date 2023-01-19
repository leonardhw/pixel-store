const User = require("../models/User");

class Controller {
  static async fetchUser(req, res) {
    try {
      const data = await User.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      // res.send(error);
      res.status(500).json({ msg: error });
    }
  }
  static async fetchUserById(req, res) {
    try {
      const { id } = req.params;
      const data = await User.findOne(id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error });
    }
  }
  static async register(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const role = "public";
      const payload = {
        username,
        email,
        password,
        phoneNumber,
        address,
        role,
      };
      const data = await User.create(payload);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error });
    }
  }
  static async deleteUserById(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const data = await User.destroy(id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error });
    }
  }
}

module.exports = Controller;
