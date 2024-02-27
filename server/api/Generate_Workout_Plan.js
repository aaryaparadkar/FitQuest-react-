import { GoogleGenerativeAI } from "@google/generative-ai";
import { google } from 'googleapis';
import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// Access your YouTube Data API key as an environment variable
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; // Replace with your actual API key
  
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to search for videos on YouTube
async function searchYouTube(searchTerm) {
  const youtube = google.youtube({
    version: 'v3',
    auth: YOUTUBE_API_KEY,
  });

  try {
    const response = await youtube.search.list({
      part: 'snippet',
      q: searchTerm,
      type: 'video',
      maxResults: 1,
    });

    const videoId = response.data.items[0].id.videoId;
    const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
    console.log(`Video link for "${searchTerm}": ${videoLink}`);

    return videoLink;
  } catch (error) {
    console.error('Error searching YouTube:', error.message);
    throw new Error('Error searching YouTube');
  }
}

// Handling POST request
app.use(express.json());

// Express route for handling the workout plan generation
app.post('/', async (req, res) => {
  const userInput = req.body;

  try {
    const { name, age, weight, height, goal, schedule } = userInput;

     const prompt = `Hi ${name}, welcome to your personalized AI workout program! Your safety and well-being are paramount, so please consult with a doctor or certified fitness trainer before embarking on any new workout routine, especially if you have health concerns.

    Based on the information you provided (age: ${age}, weight: ${weight}kg, height: ${height}cm, goal: ${goal}, schedule: ${schedule}), I'm here to guide you through potential workout options. While I can offer suggestions, specific recommendations and assurances of safety or effectiveness are best obtained from a fitness professional.
    NOTE: Give response in the given below example format only. Also keep in mind that i want you to give how many calories will be burnt on that day after doing the excercises.
    This is the sample response format, give a response in this format only, based on user-provided data and response need to include all the fields like in example given below:
    {
        "workoutSuggestions": [
          {
            "Day": 1,
            "Focus": "Upper Body Strength and Endurance",
            "exercises": [
              "1. Push-ups: Start with knee push-ups if needed. ",
              "2. Dumbbell Rows: Start light.",
              "3. Triceps Dips: Use a sturdy chair or bench.",
            ],
            "Calories need to be burnt": "500cal",
            "searchTermForYouTube": [
              "How to Beginner push-ups",
              "Dumbbell Rows technique",
              "Triceps dip exercise"
            ]
          },
          {
            "Day": 2,
            "Focus": "Lower Body Strength and Mobility",
            "exercises": [
              "1. Squats: Master the technique with 'Squats at home'.",
              "2. Lunges: Work on balance and strength.",
              "3. Standing Calf Raises: Tone your calves.",
            ],
            "Calories need to be burnt": "350cal",
            "searchTermForYouTube": [
              "How to Squats at home",
              "Lunges for beginners",
              "Calf raises"
            ]
          },
          {
            "Day": 3,
            "Focus": "Core Stability and Flexibility",
            "exercises": [
              "1. Plank: Hold for as long as you can.",
              "2. Side Plank: Target your obliques.",
              "3. Russian Twists: Rotate your core",
              "4. Bird-Dog: Improve balance and stability.",
            ],  
            "Calories need to be burnt": "400cal",
            "searchTermForYouTube": [
              "How to Plank exercise",
              "Side Plank technique",
              "Russian Twists",
              "Bird-Dog exercise"
            ]
          },
          {
            "Day": 4,
            "Focus": "Cardio and Active Recovery",
            "exercises": [
              "1. Walking: Start with brisk walks.",
              "2. Bodyweight Squats: Keep it simple.",
              "3. High Knees: Get your heart rate up.",
              "4. Jumping Jacks: Stay active.",
            ],
            "Calories need to be burnt": "500cal",
            "searchTermForYouTube": [
              "Walking for beginners",
              "Bodyweight Squats technique",
              "High Knees exercise",
              "Jumping Jacks"
            ]
          }
        ]
      }
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result && result.response ? result.response : { suggestedUserResponses: [] };
    const generatedText = response.text();
    const generatedObject = JSON.parse(generatedText);
    // console.log("Generated workout plan:", generatedObject['workoutSuggestions'][0]['searchTermForYouTube']);
    // console.log("Generated workout plan:", generatedObject);

    const getExercisesByDay = (workoutData) => {
      const exercisesByDay = {};
      workoutData.workoutSuggestions.forEach((day) => {
        exercisesByDay[`Day ${day.Day}`] = day.exercises;
      });
      return exercisesByDay;
    };
    
    // Call the function and store the result
    const exercisesByDay = getExercisesByDay(generatedObject);
    
    // Log exercises for each day
    for (const day in exercisesByDay) {
      console.log(`${day}:`);
      console.log(exercisesByDay[day]);
      console.log();
    }

    // Iterate through workout suggestions and search YouTube for each term
    generatedObject.workoutSuggestions.forEach(day => {
      day.searchTermForYouTube.forEach(searchTerm => {
        searchYouTube(searchTerm);
      });
    });

    res.status(200).json({ workoutPlan: generatedText });
  } catch (error) {
    console.error("Error generating modified workout plan:", error);
    res.status(500).json({ error: 'Error generating modified workout plan' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export {app as Generate_Workout_Plan};
