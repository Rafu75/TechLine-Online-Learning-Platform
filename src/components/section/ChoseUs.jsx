import React from 'react';
import { motion } from 'framer-motion';


const ExpertInstructorsIcon = () => (
    <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h-5m-5 0h10m-14 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2zm10-10H9m4-2h-4" />
    </svg>
);
const FlexibleLearningIcon = () => (
    <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const GlobalCommunityIcon = () => (
    <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9h-3M9 12H3m6 0a9 9 0 019-9m-9 9a9 9 0 009 9m-9-9v-3m0 3v3m0-3h3m0-3h-3m0 0V9m0-3V6m0 0v-3" />
    </svg>
);
const CareerGrowthIcon = () => (
    <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);


const ChooseUs = () => {
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
        hidden: { opacity: 0, y: 30 },
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

    const features = [
        {
            icon: <ExpertInstructorsIcon />,
            title: "Expert Instructors",
            description: "Learn from industry-leading professionals.",
        },
        {
            icon: <FlexibleLearningIcon />,
            title: "Flexible Learning",
            description: "Study at your own pace, anytime, anywhere.",
        },
        {
            icon: <GlobalCommunityIcon />,
            title: "Global Community",
            description: "Connect with learners worldwide.",
        },
        {
            icon: <CareerGrowthIcon />,
            title: "Career Growth",
            description: "Enhance your skills for a brighter future.",
        },
    ];

    return (
        <motion.section
            className="py-16"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible" 
            viewport={{ once: true, amount: 0.4 }} 
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                
                <motion.h2
                    className="text-3xl font-bold mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Why Choose TechLine?
                </motion.h2>

               
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-card flex flex-col items-center p-6 rounded-lg shadow-xl hover:shadow-xl transition-all duration-300"
                            variants={cardVariants}
                            whileHover={{ scale: 1.03 }} 
                            whileTap={{ scale: 0.98 }} 
                        >
                            <div className="mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default ChooseUs;