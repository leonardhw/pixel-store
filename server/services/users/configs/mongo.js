const { MongoClient, ServerApiVersion } = require("mongodb");
const MONGODB_URL = process.env.MONGODB_URL
const uri = MONGODB_URL
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let db = null;

async function mongoConnect() {
  try {
    const database = client.db("gugel-mongodb");
    db = database;
    return database;
  } catch (error) {
    console.log(error);
  }
}

function getDatabase() {
  return db;
}

module.exports = { mongoConnect, getDatabase };
