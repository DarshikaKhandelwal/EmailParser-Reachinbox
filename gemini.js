const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyBw5RTaq6ulD-eqRc14hy9d63D_i7IkAtA";

async function generateResponse(userInput) {
  try {
    // Initialize the generative AI instance
    const genAI = new GoogleGenerativeAI({ apiKey: API_KEY });

    // Retrieve the specific generative model
    const model = await genAI.getGenerativeModel({model: MODEL_NAME});

    // Configuration for generating the response
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    // Safety settings to filter harmful content
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    // Start a chat session with the configured settings
    const chat = await model.generateContent({
      generationConfig,
      safetySettings,
      history: [],
    });

    // Send user input to the chat and retrieve the response
    const result = await chat.sendMessage(userInput);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    throw error; // Propagate the error for debugging
  }
}

module.exports = { generateResponse };