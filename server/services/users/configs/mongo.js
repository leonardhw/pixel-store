const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://admin:admin123@gugel-db.wc0ldar.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// const { MongoClient } = require("mongodb");

// const uri = "mongodb://localhost:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0";
// const uri = "mongodb+srv://admin:admin123@gugel-db.wc0ldar.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri);

let db = null;

async function mongoConnect() {
  try {
    const database = client.db("gugel-mongodb");
    db = database;
    // console.log("----gugel-mongodb----");
    return database;
  } catch (error) {
    console.log(error);
  }
}

function getDatabase() {
  return db;
}

module.exports = { mongoConnect, getDatabase };
