import React from 'react';
import { motion } from 'framer-motion';

const Instructor = () => {
    
    const instructors = [
        {
            name: "John Smith",
            title: "Web Development Lead",
            image: "https://i.ibb.co.com/ccz3Rrz9/person.webp", 
            bio: "John is a seasoned developer with 10+ years of experience in full-stack web development. He's passionate about teaching React and Node.js."
        },
        {
            name: "Jane Doe",
            title: "Data Science Expert",
            image: "https://i.ibb.co.com/ccz3Rrz9/person.webp", 
            bio: "Jane specializes in machine learning and data analysis. Her courses focus on practical applications of Python and R."
        },
        {
            name: "Michael Brown",
            title: "UI/UX Designer",
            image: "https://i.ibb.co.com/ccz3Rrz9/person.webp", 
            bio: "Michael brings creativity and user-centric design principles to life. He teaches Figma, Adobe XD, and design thinking."
        },
        {
            name: "Sarah Lee",
            title: "Digital Marketing Strategist",
            image: "https://i.ibb.co.com/ccz3Rrz9/person.webp", 
            bio: "Sarah helps businesses grow their online presence with effective digital marketing strategies across various platforms."
        }
    ];

   
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2,
                duration: 0.6,
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
    };

    return (
        <motion.section
            className="py-16 "
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} 
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                {/* section Title */}
                <motion.h2
                    className="text-3xl font-extrabold  mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Meet Our Top Instructors
                </motion.h2>

                {/* instructors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {instructors.map((instructor, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                            variants={cardVariants}
                            whileHover={{ scale: 1.03 }} 
                            whileTap={{ scale: 0.98 }}   
                        >
                            <img
                                src={instructor.image}
                                alt={instructor.name}
                                className="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-blue-200"
                            />
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{instructor.name}</h3>
                            <p className="text-blue-600 font-medium mb-3">{instructor.title}</p>
                            <p className="text-gray-600 text-sm">{instructor.bio}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default Instructor;