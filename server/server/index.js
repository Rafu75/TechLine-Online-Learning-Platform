const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const client = new MongoClient(process.env.MONGODB_URI);

async function run() {
  try {
    await client.connect();

    const database = client.db("TechLine");
    const coursesCollection = database.collection("courses");

    console.log("MongoDB connected successfully!");

    app.get("/", (req, res) => {
      res.send("TechLine Server is Running!");
    });

    app.get("/courses", async (req, res) => {
      const courses = await coursesCollection.find().toArray();
      res.send(courses);
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run();

app.listen(PORT, () => {
  console.log(`TechLine server running on port ${PORT}`);
});