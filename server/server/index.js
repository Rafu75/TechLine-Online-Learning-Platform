const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "https://tech-line-online-learning-platform.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;

const client = new MongoClient(process.env.MONGODB_URI);

async function run() {
  try {
    await client.connect();

    const database = client.db("TechLine");
    const coursesCollection = database.collection("courses");
    const enrollmentsCollection = database.collection("enrollments");

app.post("/enrollments", async (req, res) => {
  try {
    const enrollment = req.body;

    const existingEnrollment = await enrollmentsCollection.findOne({
      courseId: enrollment.courseId,
      userEmail: enrollment.userEmail
    });

    if (existingEnrollment) {
      return res.send({
        success: false,
        message: "Already enrolled"
      });
    }

    const result = await enrollmentsCollection.insertOne(enrollment);

    res.send({
      success: true,
      insertedId: result.insertedId
    });
  } catch (error) {
    console.error("Enrollment error:", error);

    res.status(500).send({
      success: false,
      message: "Failed to enroll"
    });
  }
});

app.get("/enrollments", async (req, res) => {
  try {
    const email = req.query.email;

    const enrollments = await enrollmentsCollection
      .find({ userEmail: email })
      .toArray();

    res.send(enrollments);
  } catch (error) {
    console.error("Error loading enrollments:", error);

    res.status(500).send({
      message: "Failed to load enrollments"
    });
  }
});

app.delete("/enrollments/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await enrollmentsCollection.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).send({
        message: "Enrollment not found"
      });
    }

    res.send({
      success: true,
      message: "Course removed successfully"
    });
  } catch (error) {
    console.error("Error removing enrollment:", error);

    res.status(500).send({
      success: false,
      message: "Failed to remove course"
    });
  }
});

    console.log("MongoDB connected successfully!");

    // Home route
    app.get("/", (req, res) => {
      res.send("TechLine Server is Running!");
    });

    // Get all courses
    app.get("/courses", async (req, res) => {
      const courses = await coursesCollection.find().toArray();
      res.send(courses);
    });

    // Get single course by ID
    app.get("/courses/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const course = await coursesCollection.findOne({
          _id: new ObjectId(id)
        });

        if (!course) {
          return res.status(404).send({
            message: "Course not found"
          });
        }

        res.send(course);
      } catch (error) {
        console.error("Error loading course:", error);

        res.status(500).send({
          message: "Failed to load course"
        });
      }
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run();

app.listen(PORT, () => {
  console.log(`TechLine server running on port ${PORT}`);
});