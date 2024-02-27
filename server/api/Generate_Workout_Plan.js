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

     Based on the information you provided (age: ${age}, weight: ${weight}kg, height: ${height}cm, goal: ${goal}, schedule: ${schedule}), I'm here to guide you through potential workout options. While I can offer suggestions and approximate calorie burn estimates require on each day based on it workout sechudule, specific recommendations and assurances of safety or effectiveness are best obtained from a fitness professional.
     
     **NOTE:** Give response in the given below example format only,Do not hard Code the estimate calorieBurnEstimate which is give in example calculate by yourself rougly based on your assign the exercise on that day this rule should need to be stritly followed.
     
     This is the sample response format, give a response in this format only, based on user-provided data:
     
     {
       "workoutSuggestions": [
         {
           "Day": 1,
           "Focus": "Upper Body Strength and Endurance",
           "exercises": [
             "1. Push-ups: Start with knee push-ups if needed. (Approx. 200-300 calories burned)",
             "2. Dumbbell Rows: Start light. (Approx. 150-250 calories burned)",
             "3. Triceps Dips: Use a sturdy chair or bench. (Approx. 100-200 calories burned)"
           ],
           "searchTermForYouTube": [
             "How to Beginner push-ups",
             "Dumbbell Rows technique",
             "Triceps dip exercise"
           ],
           "calorieBurnEstimate": "450-750",
         },
         {
           "Day": 2,
           "Focus": "Lower Body Strength and Mobility",
           "exercises": [
             "1. Squats: Master the technique with 'Squats at home'. (Approx. 200-300 calories burned)",
             "2. Lunges: Work on balance and strength. (Approx. 100-200 calories burned per leg)",
             "3. Standing Calf Raises: Tone your calves. (Approx. 50-100 calories burned)"
           ],
           "searchTermForYouTube": [
             "How to Squats at home",
             "Lunges for beginners",
             "Calf raises"
           ],
           "calorieBurnEstimate": "350-600",
         },
         {
           "Day": 3,
           "Focus": "Core Stability and Flexibility",
           "exercises": [
             "1. Plank: Hold for as long as you can. (Approx. 50-100 calories burned per minute)",
             "2. Side Plank: Target your obliques. (Approx. 30-50 calories burned per side per minute)",
             "3. Russian Twists: Rotate your core. (Approx. 20-40 calories burned per minute)",
             "4. Bird-Dog: Improve balance and stability. (Approx. 20-40 calories burned per minute)"
           ],
           "searchTermForYouTube": [
             "How to Plank exercise",
             "Side Plank technique",
             "Russian Twists",
             "Bird-Dog exercise"
           ],
           "calorieBurnEstimate": "100-130",
         },
         {
           "Day": 4,
           "Focus": "Cardio and Active Recovery",
           "exercises": [
             "1. Walking: Start with brisk walks. (Approx. 100 calories burned per mile)",
             "2. Bodyweight Squats: Keep it simple. (Approx. 20-30 calories burned per minute)",
             "3. High Knees: Get your heart rate up. (Approx. 30-40 calories burned per minute)",
             "4. Jumping Jacks: Stay active. (Approx. 10-12 calories burned per minute)"
           ],
           "searchTermForYouTube": [
             "Walking for beginners",
             "Bodyweight Squats technique",
             "High Knees exercise",
             "Jumping Jacks"
           ],
           "calorieBurnEstimate": ""150-200",
         }
       ],
    }   
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result && result.response ? result.response : { suggestedUserResponses: [] };
    const generatedText = response.text();
    const generatedObject = JSON.parse(generatedText);
    // console.log("Generated workout plan:", generatedObject['workoutSuggestions'][0]['searchTermForYouTube']);
    console.log("Generated workout plan:", generatedText);

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
