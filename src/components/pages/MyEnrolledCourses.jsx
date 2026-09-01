import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MyEnrolledCourses = () => {
  const { user } = useContext(AuthContext);
  const [enrolled, setEnrolled] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://dev-stride-server.vercel.app/enrollments?email=${user.email}`)
        .then((res) => setEnrolled(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-6">My Enrolled Courses</h2>
      {enrolled.length === 0 ? (
        <p>No enrolled courses yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {enrolled.map((course) => (
            <div key={course._id} className="bg-white rounded-xl shadow-md p-4">
              <img src={course.imageURL || course.image } alt={course.title} className="rounded-lg h-40 w-full object-cover mb-3" />
              <h3 className="font-medium text-gray-800">{course.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrolledCourses;
