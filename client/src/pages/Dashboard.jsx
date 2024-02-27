// FitnessDashboard.js
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';


const Dashboard = () => {
    const caloriesBurnt = 75;
  return (
    <div>
        <Header></Header>
        <div className='mb-8 mt-8 text-center text-5xl font-semibold'>
            Dashboard
        </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* User's Schedule Section */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Your Schedule</h2>
        {/* Add your schedule content here */}
        {/* You may use Tailwind classes to style the content */}
      </div>

      {/* Calories Burnt Section */}
<div className="bg-white p-4 rounded-md shadow-md">
  <h2 className="font-semibold mb-4 text-center text-2xl">Calories Burnt</h2>
  <div className="flex items-center justify-center mb-6">
    <div style={{ width: '200px', height: '200px' }}> {/* Adjust the width and height as needed */}
      <CircularProgressbar
        value={caloriesBurnt}
        text={`${caloriesBurnt}%`}
        styles={buildStyles({
          textColor: '#333',
          pathColor: `rgba(0, 0, 128, ${caloriesBurnt / 100})`,
          trailColor: '#d6d6d6',
        })}
      />
    </div>
  </div>
</div>

      {/* Video Suggestions Section */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Video Suggestions</h2>
        {/* Add video suggestions content here */}
        {/* You may use Tailwind classes to style the content */}
      </div>
    </div>
    <Footer></Footer>
    </div>
    
  );
};

export default Dashboard;
