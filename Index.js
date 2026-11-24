require("dotenv").config();

const express = require("express");

const cors = require("cors");

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
  (await mongoose.connect(process.env.Data_Base_Key),
    {
      dbName: "Courses",
    });
  console.log("You successfully connected to MongoDB1!");
}



const app = express();
const port = process.env.port;
app.use(express.json());
app.use(cors());


const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const courseRouter = require("./Routes/courses.routes");
const usersRouter = require("./Routes/users.route");
app.use("/api/courses", courseRouter);
app.use("/api/users", usersRouter);


// Global Error 
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.StatusCode || 500 ).json({Status:error.httpError || error , msg : error.errorText })
});


app.listen(port, () => {
  console.log("This Is Port Is Running : localhost:" + port);
});


