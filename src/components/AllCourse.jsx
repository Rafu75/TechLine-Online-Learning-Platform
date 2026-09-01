import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const AllCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // fetch course from db
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/courses')
      .then(res => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load courses');
        setLoading(false);
      });
  }, []);

  
  const categories = ['All', ...new Set(courses.map(c => c.category || 'Others'))];

  
  const filteredCourses =
    selectedCategory === 'All'
      ? courses
      : courses.filter(course => course.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold  text-base-content">All Courses</h1>
        <p className="text-gray-500 mt-2">Explore and filter through available courses</p>
      </div>

      
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              selectedCategory === category
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

     
      {filteredCourses.length === 0 ? (
        <p className="text-center text-gray-500">No courses found in this category.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={course.imageURL || course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{course.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-blue-600 font-medium">${course.price}</span>
                  <Link
                    to={`/courseDetails/${course._id}`}
                    className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourse;
