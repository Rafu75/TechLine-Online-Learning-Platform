import React, { useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

const CourseDetails = () => {
  const location = useLocation();
  const course = location.state?.course;

  const { user } = useAuth();
  const [enrolling, setEnrolling] = useState(false);

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-700">
          Course details not found.
        </h2>
      </div>
    );
  }

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please log in to enroll in this course.");
      return;
    }

    const enrollmentData = {
      courseId: course._id,
      title: course.title,
      imageURL: course.image,
      instructor: course.instructor || "Unknown Instructor",
      userEmail: user.email,
      userName: user.displayName,
      enrolledAt: new Date().toISOString(),
    };

    try {
      setEnrolling(true);

      const res = await axios.post(
        "http://localhost:5000/enrollments",
        enrollmentData
      );

      if (res.data.insertedId) {
        toast.success("Successfully enrolled! 🎉");
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
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition-shadow duration-300"
      >
        {/* Course Image */}
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-80 object-cover"
        />

        {/* Course Information */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {course.title}
          </h1>

          <p className="text-gray-600 leading-relaxed mt-4">
            {course.description}
          </p>

          <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
            <p className="text-blue-600 text-lg font-semibold">
              ৳{course.price}
            </p>

            <p className="text-gray-600 font-medium">
              Category: {course.category}
            </p>
          </div>

          {/* Enroll Button */}
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