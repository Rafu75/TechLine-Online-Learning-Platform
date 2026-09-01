import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    // 1. Animation Variants for the container
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Stagger the animation of child elements
                delayChildren: 0.3,
            },
        },
    };

    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    return (
        
        <motion.section
            className="bg-blue-500 text-white py-7 lg:pt-24 lg:pb-32" 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    {/* Main Title - Animated */}
                    <motion.h1 
                        className="text-3xl lg:text-4xl font-extrabold leading-tight lg:mb-4"
                        variants={itemVariants}
                    >
                        Learn, Share, and <br className="hidden sm:inline" />Grow Together.
                    </motion.h1>

                    {/* Subtext - Animated */}
                    <motion.p 
                        className="text-xl mb-8 opacity-90"
                        variants={itemVariants}
                    >
                        Join SkillVerse and start your journey today!
                    </motion.p>

                    {/* Buttons Container - Animated */}
                    <motion.div 
                        className="flex space-x-4"
                        variants={itemVariants}
                    >
                        {/* Explore Courses Button */}
                        <a 
                            href="#" 
                            className="bg-white text-blue-500 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
                        >
                            Explore Courses
                        </a>

                        {/* Become an Instructor Button */}
                        <a 
                            href="#" 
                            className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-500 transition duration-300"
                        >
                            Become an Instructor
                        </a>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default Hero;