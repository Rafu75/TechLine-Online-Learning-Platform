import React from 'react';
import Course from './Course';
import { motion } from 'framer-motion';

const popularCourses = [
  {
    _id: 'course-1',
    title: 'Full Stack Web Development',
    description:
      'Learn modern web development with React, Node.js, Express and MongoDB.',
    category: 'Web Development',
    price: 5000,
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
  },
  {
    _id: 'course-2',
    title: 'React JS Development',
    description:
      'Build modern and interactive web applications using React JS.',
    category: 'Web Development',
    price: 4000,
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee'
  },
  {
    _id: 'course-3',
    title: 'JavaScript Mastery',
    description:
      'Master JavaScript fundamentals, ES6+, DOM, async programming and more.',
    category: 'Programming',
    price: 3500,
    image:
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479'
  },
  {
    _id: 'course-4',
    title: 'UI/UX Design',
    description:
      'Learn user interface and user experience design from beginner to advanced.',
    category: 'Design',
    price: 3000,
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5'
  },
  {
    _id: 'course-5',
    title: 'Python Programming',
    description:
      'Learn Python programming from the basics and build real-world projects.',
    category: 'Programming',
    price: 3500,
    image:
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935'
  },
  {
    _id: 'course-6',
    title: 'Digital Marketing',
    description:
      'Learn SEO, social media marketing, content marketing and online growth strategies.',
    category: 'Marketing',
    price: 2500,
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
  }
];

const sectionVariants = { 
  hidden: { opacity: 0, y: 50 }, 
  visible: { opacity: 1, y: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut', 
      when: 'beforeChildren' 
    } 
  } 
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100, 
      damping: 10,
    },
  },
};

const PopulerCourse = () => {
   return ( 
    <motion.div className="max-w-6xl mx-auto px-4 py-12" 
      variants={sectionVariants} 
      initial="hidden" 
      animate="visible" 
    > 

   <div className="text-center mb-8"> 
      <motion.h1 
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }} 
      > 
        Popular Course 
      </motion.h1> 
    </div> 
    
    <motion.div 
      className="grid sm:grid-cols-2 md:grid-cols-3 gap-6" 
      variants={containerVariants} 
    > 
      {popularCourses.map(course => ( 
        <motion.div 
          key={course._id} 
          variants={cardVariants}
          whileHover={{ scale: 1.03, transition: { duration: 0.25 }
        }}
        > 
          <Course course={course} /> 
        </motion.div> 
      ))} 
    </motion.div> 
  </motion.div> 
  ); 
}; 

export default PopulerCourse;