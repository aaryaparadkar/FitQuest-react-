// // FitnessDashboard.js
// import React from 'react';
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';


// const Dashboard = () => {
//     const caloriesBurnt = 75;
//   return (
//     <div>
//         <div className='mb-8 mt-8 text-center text-5xl font-semibold'>
//             Dashboard
//         </div>
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {/* User's Schedule Section */}
//       <div className="bg-white p-4 rounded-md shadow-md">
//         <h2 className="text-2xl font-semibold mb-4 text-center">Your Schedule</h2>
//         {/* Add your schedule content here */}
//         {/* You may use Tailwind classes to style the content */}
//       </div>

//       {/* Calories Burnt Section */}
//       <div className="bg-white p-4 rounded-md shadow-md">
//         <h2 className="font-semibold mb-4 text-center text-2xl">Calories Burnt</h2>
//         <div className="flex items-center justify-center mb-6">
//           <CircularProgressbar
//             value={caloriesBurnt}
//             text={`${caloriesBurnt}%`}
//             styles={buildStyles({
//               textColor: '#333',
//               pathColor: `rgba(0, 0, 128, ${caloriesBurnt / 100})`,
//               trailColor: '#d6d6d6',
              
//             })}
//           />
//         </div>
//         </div>

//       {/* Video Suggestions Section */}
//       <div className="bg-white p-4 rounded-md shadow-md">
//         <h2 className="text-2xl font-semibold mb-4 text-center">Video Suggestions</h2>
//         {/* Add video suggestions content here */}
//         {/* You may use Tailwind classes to style the content */}
//       </div>
//     </div>
//     </div>
    
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Dashboard = () => {
  const [caloriesBurnt, setCaloriesBurnt] = useState(0);
  const [workoutPlan, setWorkoutPlan] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:5000/generateWorkoutPlan');
        const data = await response.json();
        setCaloriesBurnt(data.caloriesBurnt);
        setWorkoutPlan(data.workoutPlan);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors appropriately, e.g., display an error message
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className='mb-8 mt-8 text-center text-5xl font-semibold'>
        Dashboard
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {/* User's Schedule Section */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Your Schedule</h2>
          {/* Add your schedule content here */}
        </div>

        {/* Calories Burnt Section */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="font-semibold mb-4 text-center text-2xl">Calories Burnt</h2>
          <div className="flex items-center justify-center mb-6">
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

        {/* Video Suggestions Section */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Video Suggestions</h2>
          {/* Add video suggestions content here */}
        </div>

        {/* Workout Plan Section */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Workout Plan</h2>
          {Object.keys(workoutPlan).length > 0 ? (
            <div>
              {/* Display workout plan details here */}
              <p>Exercises: {workoutPlan.exercises.join(', ')}</p>
              <p>Sets: {workoutPlan.sets}</p>
              <p>Reps: {workoutPlan.reps}</p>
              {/* Add any other relevant workout plan details */}
            </div>
          ) : (
            <p>Loading workout plan...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
