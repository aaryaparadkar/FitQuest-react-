import React, { useState } from 'react';

const FormPage = () => {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [isNewToLifting, setIsNewToLifting] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleFrequencyChange = (e) => {
    setSelectedFrequency(e.target.value);
  };

  const handleLiftingChange = (e) => {
    setIsNewToLifting(e.target.value);
  };

  const handleGoalChange = (e) => {
    setSelectedGoal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Selected Gender:', selectedGender);
    console.log('Selected Frequency:', selectedFrequency);
    console.log('Is New to Lifting:', isNewToLifting);
    console.log('Selected Goal:', selectedGoal);
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
                checked={selectedGender === 'male'}
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
                checked={selectedGender === 'female'}
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
                checked={selectedGender === 'other'}
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
                checked={selectedFrequency === '2x per week'}
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
                checked={selectedFrequency === '3x per week'}
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
                checked={selectedFrequency === '4x per week'}
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
                checked={isNewToLifting === 'beginner'}
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
                checked={isNewToLifting === 'intermediate'}
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
                checked={isNewToLifting === 'advanced'}
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
                checked={selectedGoal === 'muscular_toned'}
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
                checked={selectedGoal === 'stronger_faster'}
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
                checked={selectedGoal === 'lose_fat'}
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