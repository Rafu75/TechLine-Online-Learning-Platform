import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const MyEnrolledCourses = () => {
  const { user } = useContext(AuthContext);

  const [enrolled, setEnrolled] = useState([]);
  const [removing, setRemoving] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/enrollments?email=${user.email}`)
        .then((res) => setEnrolled(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleRemove = async () => {
    if (!selectedCourse) return;

    try {
      setRemoving(selectedCourse._id);

      const res = await axios.delete(
        `http://localhost:5000/enrollments/${selectedCourse._id}`
      );

      if (res.data.success) {
        setEnrolled((prev) =>
          prev.filter((course) => course._id !== selectedCourse._id)
        );

        toast.success("Course removed successfully!");
        setSelectedCourse(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove course.");
    } finally {
      setRemoving(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-6">
        My Enrolled Courses
      </h2>

      {enrolled.length === 0 ? (
        <p>No enrolled courses yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {enrolled.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-md p-4"
            >
              <img
                src={course.imageURL || course.image}
                alt={course.title}
                className="rounded-lg h-40 w-full object-cover mb-3"
              />

              <h3 className="font-medium text-gray-800">
                {course.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {course.instructor}
              </p>

              <button
                onClick={() => setSelectedCourse(course)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Remove Course
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-xl font-semibold text-gray-800">
                Remove Course?
              </h3>

              <p className="text-gray-600 mt-3">
                Are you sure you want to remove{" "}
                <span className="font-semibold">
                  {selectedCourse.title}
                </span>{" "}
                from your enrolled courses?
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setSelectedCourse(null)}
                  disabled={removing === selectedCourse._id}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleRemove}
                  disabled={removing === selectedCourse._id}
                  className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition disabled:bg-red-300"
                >
                  {removing === selectedCourse._id
                    ? "Removing..."
                    : "Yes, Remove"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyEnrolledCourses;