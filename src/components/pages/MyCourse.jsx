import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const MyCourse = () => {
  const { user } = useAuth(); 
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        `https://dev-stride-server.vercel.app/courses?email=${user.email}`
      );
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.email) fetchCourses();
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await axios.delete(`https://dev-stride-server.vercel.app/courses/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Course deleted!");
        fetchCourses();
      }
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  if (!user) return <p className="text-center py-10">Loading user...</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-semibold mb-6">My Added Courses</h2>

      {courses.length === 0 ? (
        <p>No courses added yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border rounded-lg  shadow-md bg-white"
            >
              <img
                src={course.image || course.imageURL}
                alt={course.title}
                className="h-40 w-full object-cover rounded-md mb-3"
              />
              <div className="px-4">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-gray-500 mb-3">${course.price}</p>
              </div>
              <div className="flex justify-between items-center p-4">
                <Link
                  to={`/courseDetails/${course._id}`}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  View
                </Link>
                <Link
                  to={`/updateCourse/${course._id}`}
                  className="text-green-600 hover:underline text-sm font-medium"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="text-red-600 text-sm font-medium hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourse;
