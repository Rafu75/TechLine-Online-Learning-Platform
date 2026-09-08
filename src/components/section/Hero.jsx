import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Hero = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.section
            className="hero-section text-white py-7 lg:pt-24 lg:pb-32"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">

                    <motion.h1
                        className="text-3xl lg:text-4xl font-extrabold leading-tight lg:mb-4"
                        variants={itemVariants}
                    >
                        Learn, Share, and <br className="hidden sm:inline" />
                        Grow Together.
                    </motion.h1>

                    <motion.p
                        className="text-xl mb-8 opacity-90"
                        variants={itemVariants}
                    >
                        Join SkillVerse and start your journey today!
                    </motion.p>

                    <motion.div
                        className="flex space-x-4"
                        variants={itemVariants}
                    >

                        {/* Explore Courses */}
                        <Link
                            to="/allcourses"
                            className="explore-btn font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
                        >
                            Explore Courses
                        </Link>

                        {/* Become an Instructor */}
                        <Link
                            to="/addcourse"
                            className="instructor-btn bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                        >
                            Become an Instructor
                        </Link>

                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default Hero;