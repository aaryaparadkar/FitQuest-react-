import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { promisify } from 'util';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from'dotenv';

const readFileAsync = promisify(fs.readFile);

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Multer configuration for file upload
const upload = multer({ dest: 'uploads/' });

// Function to load Google Gemini Pro Vision API and get response
const getGeminiResponse = async (input, image, prompt) => {
    const model = GoogleGenerativeAI.GenerativeModel('gemini-pro-vision');
    const response = await model.generateContent([input, image[0], prompt]);
    return response.text;
};

// Function to setup image for processing
const inputImageSetup = async (filePath) => {
    const fileBuffer = await readFileAsync(filePath);
    return [
        {
            mime_type: 'image/jpeg', // Adjust mime type according to the image file type
            data: fileBuffer
        }
    ];
};

// Express route for handling file upload and processing
app.post('/process-image', upload.single('image'), async (req, res) => {
    try {
        const { input } = req.body;
        const { path: filePath } = req.file;

        const imageParts = await inputImageSetup(filePath);
        const inputPrompt = `
            You are an expert in nutritionist where you need to see the food items from the image
            and calculate the total calories, also provide the details of every food items with calories intake
            in below format:
            1. Item 1 - no of calories
            2. Item 2 - no of calories
            ----
            ----
        `;
        const response = await getGeminiResponse(input, imageParts, inputPrompt);

        // Delete the uploaded file after processing
        fs.unlinkSync(filePath);

        res.status(200).json({ success: true, message: 'Response generated successfully', data: response });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export {app as xyz};