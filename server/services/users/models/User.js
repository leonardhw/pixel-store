const { getDatabase } = require("../configs/mongo");
const { ObjectId } = require("mongodb");

class User {
  static async getCollection() {
    try {
      const db = await getDatabase();
      const collection = db.collection("Users");
      return collection;
    } catch (error) {
      console.log(error);
    }
  }
  static async findAll() {
    try {
      const User = await this.getCollection();
      const users = await User.find().toArray();
      return users;
    } catch (error) {
      console.log(error);
    }
  }
  static async findOne(id) {
    try {
      const User = await this.getCollection();
      const user = await User.findOne({ _id: ObjectId(id) });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  static async create(payload) {
    try {
      const User = await this.getCollection();
      const newUser = await User.insertOne(payload);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
  static async destroy(id) {
    try {
      const User = await this.getCollection();
      const deleted = await User.deleteOne({ _id: ObjectId(id) });
      return deleted;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
