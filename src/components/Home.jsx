import React from 'react';
import PopulerCourse from './pages/PopulerCourse';
import Hero from './section/Hero';
import ChooseUs from './section/ChoseUs';
import Instructor from './section/Instructor';

const popularCoursePromise = fetch('https://dev-stride-server.vercel.app/popularCourses').
then(res => res.json())

const Home = () => {
    return (
        <div>
            <div className='max-w-[1200px] mx-auto'>
                <Hero></Hero>
            </div>
            <PopulerCourse popularCoursePromise={popularCoursePromise} ></PopulerCourse>
            <div className='max-w-6xl mx-auto'>
                <ChooseUs></ChooseUs>
            </div>
            <div>
                <Instructor></Instructor>
            </div>
        </div>
    );
};

export default Home;