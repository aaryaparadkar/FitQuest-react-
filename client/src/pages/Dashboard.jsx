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
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const Dashboard = () => {

  const [ jsondata, setJsondata ] = useState();

  const username = localStorage.getItem('username');

  const [caloriesBurnt, setCaloriesBurnt] = useState(0);
  const [workoutPlan, setWorkoutPlan] = useState({});
  const [workoutdata, setWorkoutData] = useState('');
  const [excercise, setExcercise] = useState('');

  const mail_sender = () => {
    const email = username + '@gmail.com';
    axios.post('http://localhost:5000/sendmail', {email, excercise})
  .then(response => {
    console.log(email,excercise);

      console.log('Mail sent:', response.data);
  })
  .catch(error => {
      console.error('Error sending mail:', error);
  });
  }

  useEffect(() => {

    const response = axios.get(`http://localhost:5000/user/getprofile?username=${username}`)
    .then(response => {
      console.log('Response:', response.data);
      let data = {
        gender: response.data.gender,
        age: response.data.age,
        weight: response.data.weight,
        goal: response.data.goal,
        schedule: response.data.schedule
      }
      setJsondata(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/generateWorkoutPlan', jsondata)
        .then(response => {
          console.log('Response:', response.data.workoutPlan);
          const exc = response.data.workoutPlan;
          setWorkoutData(response.data.workoutPlan);
          Object.keys(exc).forEach(day => {
            console.log(day); // Print the day
            exc[day].forEach(exercise => {
              console.log(exercise); // Print each exercise for the day
              // Now you can perform any further operations with the exercises
              setExcercise(excercise);
            });
          });
          mail_sender();
        })
        .catch(error => {
          console.error('Error:', error);
        });

        const res_data = await response.json();
        setCaloriesBurnt(res_data.caloriesBurnt);
        setWorkoutPlan(res_data.workoutPlan);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors appropriately, e.g., display an error message
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
        <div className='mb-8 mt-8 text-center text-5xl font-semibold'>
            Dashboard
        </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* User's Schedule Section */}
      <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Your Schedule</h2>
      {/* Map over the workoutPlan and render checkboxes for each exercise */}
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
      <Footer />
    </div>
  );
};

export default Dashboard;
