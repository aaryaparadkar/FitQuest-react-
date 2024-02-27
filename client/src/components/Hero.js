import { useState, useEffect } from 'react';
import John from '../imgs/john-arano-h4i9G-de7Po-unsplash.jpg'
import Johnathon from '../imgs/jonathan-borba-VtCaDJ-WfOA-unsplash.jpg'
import sam from '../imgs/sam-sabourin-PiFA6HIAfBA-unsplash.jpg'

const images = [John,Johnathon,sam]; // Replace with your image URLs

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(goToNextImage, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="relative">
        <div className="w-full h-auto overflow-hidden">
          <div
            className="w-full h-auto transition-transform duration-500"
            style={{
              transform: `translateX(-${currentImageIndex * 100}%)`,
              display: 'flex',
              transitionTimingFunction: 'ease-in-out',
            }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Banner"
                className="w-full h-auto cursor-pointer"
                style={{
                  flex: '0 0 100%',
                  width: '100%',
                }}
              />
            ))}
          </div>
        </div>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full flex justify-between px-4">
        <button onClick={goToPreviousImage} className="p-2 rounded bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button onClick={goToNextImage} className="p-2 rounded bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      {/* Transparent div with slogan */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[-150px] text-center">
        <div className="bg-black bg-opacity-50 p-4 rounded-md">
          <h2 className="text-white text-5xl font-bold">Where Fitness Meets Gamification</h2>
          <p className="text-gray-300 text-4xl">Your fitness journey just got more exciting!</p>
        </div>
      </div>

      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full flex justify-between px-4">
        <button onClick={goToPreviousImage} className="p-2 rounded bg-white">
          {/* ... (previous button SVG) */}
        </button>
        <button onClick={goToNextImage} className="p-2 rounded bg-white">
          {/* ... (next button SVG) */}
        </button>
      </div>
    </div>
    </div>
  );
};

export default Banner;