import React from 'react';
import { Link, useNavigate } from 'react-router';

const Course = ({ course }) => {
  const { _id, title, image, instructor, price } = course;

  return (

    <div className="course-card rounded-2xl shadow-md overflow-hidden 
      hover:shadow-xl transition-shadow duration-300">
      
      <img
        src={image || 'https://via.placeholder.com/400x250?text=No+Image'}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{instructor}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 font-medium">${price}</span>
          <Link
            to={`/courseDetails/${_id}`}
            state={{ course }}
            className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
    
  );
};

export default Course;
