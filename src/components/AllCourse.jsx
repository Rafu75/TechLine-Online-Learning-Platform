import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const allCourses = [
  // 6 Popular Courses
  {
    _id: 'course-1',
    title: 'Full Stack Web Development',
    description:
      'Learn modern web development with React, Node.js, Express and MongoDB.',
    category: 'Web Development',
    price: 5000,
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  },
  {
    _id: 'course-2',
    title: 'React JS Development',
    description:
      'Build modern and interactive web applications using React JS.',
    category: 'Web Development',
    price: 4000,
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
  },
  {
    _id: 'course-3',
    title: 'JavaScript Mastery',
    description:
      'Master JavaScript fundamentals, ES6+, DOM, async programming and more.',
    category: 'Programming',
    price: 3500,
    image:
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
  },
  {
    _id: 'course-4',
    title: 'UI/UX Design',
    description:
      'Learn user interface and user experience design from beginner to advanced.',
    category: 'Design',
    price: 3000,
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5',
  },
  {
    _id: 'course-5',
    title: 'Python Programming',
    description:
      'Learn Python programming from the basics and build real-world projects.',
    category: 'Programming',
    price: 3500,
    image:
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
  },
  {
    _id: 'course-6',
    title: 'Digital Marketing',
    description:
      'Learn SEO, social media marketing, content marketing and online growth strategies.',
    category: 'Marketing',
    price: 2500,
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
  },

  // 4 Additional Courses
  {
    _id: 'course-7',
    title: 'Next.js Development',
    description:
      'Build fast, scalable and SEO-friendly applications using Next.js.',
    category: 'Web Development',
    price: 4500,
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
  },
  {
    _id: 'course-8',
    title: 'Node.js & Express',
    description:
      'Learn backend development and create powerful REST APIs with Node.js and Express.',
    category: 'Backend Development',
    price: 4000,
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
  },
  {
    _id: 'course-9',
    title: 'MongoDB Database',
    description:
      'Learn MongoDB, database design, CRUD operations and data management.',
    category: 'Database',
    price: 3000,
    image:
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d',
  },
  {
    _id: 'course-10',
    title: 'Git & GitHub',
    description:
      'Learn Git and GitHub for version control, collaboration and professional development.',
    category: 'Tools',
    price: 2000,
    image:
      'https://images.unsplash.com/photo-1556075798-4825dfaaf498',
  },
];

// Section animation
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      when: 'beforeChildren',
    },
  },
};

// Container animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.2,
    },
  },
};

// Card animation
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

const AllCourse = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCategoryChanged, setIsCategoryChanged] = useState(false);

  const categories = [
    'All',
    ...new Set(allCourses.map((course) => course.category)),
  ];

  const filteredCourses =
    selectedCategory === 'All'
      ? allCourses
      : allCourses.filter(
          (course) => course.category === selectedCategory
        );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsCategoryChanged(true);
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-12"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Title */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1}}
      >
        <h1 className="text-3xl font-bold text-base-content">
          All Courses
        </h1>

        <p className="text-gray-400 mt-2">
          Explore and filter through available courses
        </p>
      </motion.div>

      {/* Categories */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              selectedCategory === category
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Course Cards */}
      <motion.div
        key={selectedCategory}
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={isCategoryChanged ? undefined : containerVariants}
        initial={isCategoryChanged ? false : 'hidden'}
        animate={!isCategoryChanged ? "visible" : undefined}
      >
        {filteredCourses.map((course, index) => (
          <motion.div
            key={`${selectedCategory}-${course._id}`}
            variants={isCategoryChanged ? undefined : cardVariants}
            initial={
              isCategoryChanged
                ? {
                    opacity: 0,
                    y: 10,
                  }
                : undefined
            }
            animate={isCategoryChanged ? { opacity: 1, y: 0 } : undefined}
            transition={
              isCategoryChanged
                ? {
                    duration: 0.2,
                    delay: index * 0.03,
                    ease: 'easeOut',
                  }
                : undefined
            }
            whileHover={{
              scale: 1.03,
              transition: {
                duration: 0.25,
              },
            }}
          >
            <div className="course-card rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {course.title}
                </h2>

                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-blue-600 font-medium">
                    ৳{course.price}
                  </span>

                  <Link
                    to={`/courseDetails/${course._id}`}
                    state={{ course }}
                    className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AllCourse;