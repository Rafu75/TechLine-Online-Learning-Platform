import React, { useEffect, useState } from 'react';
import Course from './Course';

const PopulerCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    fetch('https://dev-stride-server.vercel.app/popularCourses')
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false); // stop loading
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] ">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
        <div className="max-w-6xl mx-auto px-4 py-12 ">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold ">Popular Course</h1>
        {/* <p className="text-gray-500 mt-2">Explore and filter through available courses</p> */}
      </div>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {courses.map(course => (
        <Course key={course._id} course={course} />
      ))}
    </div>
    </div>
  );
};

export default PopulerCourse;
