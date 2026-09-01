import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";

const CourseDetails = () => {
  const course = useLoaderData();
  const { user } = useAuth(); 
  const [enrolling, setEnrolling] = useState(false);

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please log in to enroll in this course.");
      return;
    }

    const enrollmentData = {
      courseId: course._id,
      title: course.title,
      imageURL: course.imageURL,
      instructor: course.instructor || "Unknown Instructor",
      userEmail: user.email,
      userName: user.displayName,
      enrolledAt: new Date().toISOString(),
    };

    try {
      setEnrolling(true);
      const res = await axios.post("https://dev-stride-server.vercel.app/enrollments", enrollmentData);
      if (res.data.insertedId) {
        toast("Successfully enrolled! 🎉");
      } else {
        toast("You're already enrolled in this course!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Enrollment failed. Try again later.");
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-md rounded-2xl overflow-hidden"
      >
        <img
          src={course.imageURL || course.image}
          alt={course.title}
          className="w-full h-80 object-cover"
        />

        <div className="p-6 space-y-3">
          <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
          <p className="text-gray-600 leading-relaxed">{course.description}</p>

          <div className="flex flex-wrap justify-between mt-6 text-gray-700">
            <p>
              <strong>Price:</strong> ${course.price}
            </p>
            <p>
              <strong>Duration:</strong> {course.duration} hours
            </p>
            <p>
              <strong>Category:</strong> {course.category}
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-blue-400"
            >
              {enrolling ? "Enrolling..." : "Enroll Now"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetails;
