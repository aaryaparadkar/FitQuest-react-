import React from 'react';

const Profile = ({ profileData }) => {
  // Sample profile data, replace with actual data source
  profileData = {
    name: 'John Doe',
    gender: 'Male',
    age: 30,
    schedule: 'Monday-Wednesday-Friday',
    goal: 'Lose weight',
    weight: 80,
    height: 175,
    equipment: 'Dumbbells, Resistance bands',
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <img
        src="https://via.placeholder.com/150" // Replace with actual image URL
        alt="Profile picture"
        className="w-32 h-32 rounded-full mb-4 shadow-md"
      />
      <div className="text-center">
        <h1 className="text-2xl font-bold">{profileData.name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Gender</h2>
          <p>{profileData.gender}</p>
        </div>
        <div className="p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Age</h2>
          <p>{profileData.age}</p>
        </div>
        <div className="p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Schedule</h2>
          <p>{profileData.schedule}</p>
        </div>
        <div className="p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Main Goal</h2>
          <p>{profileData.goal}</p>
        </div>
        <div className="p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Weight</h2>
          <p>{profileData.weight} kg</p>
        </div>
        <div className="p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Height</h2>
          <p>{profileData.height} cm</p>
        </div>
        <div className="p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Equipment</h2>
          <p>{profileData.equipment}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
