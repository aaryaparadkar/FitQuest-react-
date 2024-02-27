import React, { useState } from 'react';

const FormPage = () => {
  // State variables and setter functions for form fields
  const [gender, setGender] = useState('');
  const [frequency, setFrequency] = useState('');
  const [status, setStatus] = useState('');
  const [goal, setGoal] = useState('');

  // Event handler for gender selection change
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // Event handler for workout frequency selection change
  const handleFrequencyChange = (e) => {
    setFrequency(e.target.value);
  };

  // Event handler for lifting experience selection change
  const handleLiftingChange = (e) => {
    setStatus(e.target.value);
  };

  // Event handler for fitness goal selection change
  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {username,gender,frequency,status,goal};

    axios.post('http://localhost:5000/user/profile', data)
    .then(response => {
      console.log(response);
      setGender('');
      setFrequency('');
      setGoal('');
      setStatus('');
      localStorage.setItem('username', response.data.username); 
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <form className="max-w-xl p-6 shadow-md rounded-lg" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-center">User Information</h2>

        {/* Gender Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium  mb-2">Select your gender:</label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex  items-center">
              <input
                type="radio"
                className="form-radio text-white"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={handleGenderChange}
              />
              <span className="ml-2">Male</span>
            </label>

            <label className="inline-flex  items-center">
              <input
                type="radio"
                className="form-radio text-white"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={handleGenderChange}
              />
              <span className="ml-2 ">Female</span>
            </label>

            <label className="inline-flex  items-center">
              <input
                type="radio"
                className="form-radio text-white"
                name="gender"
                value="other"
                checked={gender === 'other'}
                onChange={handleGenderChange}
              />
              <span className="ml-2 ">Other</span>
            </label>
          </div>
        </div>

        {/* Workout Frequency */}
        <div className="mb-6">
          <label className="block text-sm font-medium  mb-2">How often would you like to workout?</label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex  items-center">
              <input
                type="radio"
                className="form-radio text-white"
                name="frequency"
                value="2x per week"
                checked={frequency === '2x per week'}
                onChange={handleFrequencyChange}
              />
              <span className="ml-2 ">2x per week</span>
            </label>

            <label className="inline-flex  items-center">
              <input
                type="radio"
                className="form-radio text-white"
                name="frequency"
                value="3x per week"
                checked={frequency === '3x per week'}
                onChange={handleFrequencyChange}
              />
              <span className="ml-2">3x per week</span>
            </label>

            <label className="inline-flex  items-center">
              <input
                type="radio"
                className="form-radio text-white"
                name="frequency"
                value="4x per week"
                checked={frequency === '4x per week'}
                onChange={handleFrequencyChange}
              />
              <span className="ml-2">4x per week</span>
            </label>

          </div>
        </div>

        {/* Lifting Experience */}
        <div className="mb-6">
          <label className="block text-sm font-medium  mb-2">Are you new to lifting?</label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex  items-center">
              <input
                type="radio"
                className="form-radio text-white"
                name="lifting"
                value="beginner"
                checked={status === 'beginner'}
                onChange={handleLiftingChange}
              />
              <span className="ml-2 ">Yes (I'm a beginner)</span>
            </label>

            <label className="inline-flex  items-center">
              <input
                type="radio"
                className="form-radio text-white"
                name="lifting"
                value="intermediate"
                checked={status === 'intermediate'}
                onChange={handleLiftingChange}
              />
              <span className="ml-2 ">Not Really (I'm intermediate)</span>
            </label>

            <label className="inline-flex  items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600"
                name="lifting"
                value="advanced"
                checked={status === 'advanced'}
                onChange={handleLiftingChange}
              />
              <span className="ml-2 ">No (I'm advanced bro)</span>
            </label>
          </div>
        </div>

        {/* Fitness Goal */}
        <div className="mb-6">
          <label className="block text-sm font-medium  mb-2">What is your main goal?</label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex  items-center">
              <input
                type="radio"
                className="form-radio text-white"
                name="goal"
                value="muscular_toned"
                checked={goal === 'muscular_toned'}
                onChange={handleGoalChange}
              />
              <span className="ml-2 ">Look muscular & toned (Muscle size and visibility)</span>
            </label>
          </div>

          <div className="flex items-center space-x-4">
            <label className="inline-flex  items-center">
              <input
                type="radio"
                className="form-radio text-white"
                name="goal"
                value="stronger_faster"
                checked={goal === 'stronger_faster'}
                onChange={handleGoalChange}
              />
              <span className="ml-2">Get stronger, faster(Lift more weight)</span>
            </label>
            
          </div>

          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-white"
                name="goal"
                value="lose_fat"
                checked={goal === 'lose_fat'}
                onChange={handleGoalChange}
              />
              <span className="ml-2">Lose Fat (Burn a lot of calories)</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
