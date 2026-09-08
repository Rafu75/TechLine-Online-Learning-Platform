import React from 'react';
import PopulerCourse from './pages/PopulerCourse';
import Hero from './section/Hero';
import ChooseUs from './section/ChoseUs';
import Instructor from './section/Instructor';

const Home = ({ popularCoursePromise }) => {
  return (
    <div>

      <Hero />

      <PopulerCourse ePromise={popularCoursePromise} />

      <div className="max-w-6xl mx-auto">
        <ChooseUs />
      </div>

      <div>
        <Instructor />
      </div>
    </div>
  );
};

export default Home;