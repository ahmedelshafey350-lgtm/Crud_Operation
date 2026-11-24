// const { MongoClient } = require("mongodb");
// const dns = require("node:dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);
// const client = new MongoClient(
//   "mongodb+srv://Data_Base_Courses:Node.js.courses@cluster0.brangzc.mongodb.net/",
// );

// const dbName = "Courses";
// async function disconnectFromMongoDB() {
//   await client.close();
// }
// async function connectToMongoDB() {
//   try {
//     await client.connect();
//     console.log("You successfully connected to MongoDB!");
//     const db = client.db(dbName);
//     const collection = db.collection("course");
//     await collection.insertOne({
//       title: "java",
//       price: "6000",
//     });
//     const data = await collection.find().toArray();
//     console.log(data);
//   } catch (err) {
//     console.dir(err);
//   } finally {
//     await disconnectFromMongoDB();
//   }
// }
// connectToMongoDB();

// module.exports = { connectToMongoDB, disconnectFromMongoDB };
