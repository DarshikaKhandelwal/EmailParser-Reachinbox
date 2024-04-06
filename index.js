// index.js

const { authenticate } = require('./gmailservice');
const { categorizeEmail } = require('./gemini');
const { generateResponse } = require('./gemini');

// Initialize authentication and start processing emails
async function startApp() {
  try {
    await authenticate(); // Authenticate with Gmail API
    console.log('Authentication successful. Starting email processing...');
  } catch (error) {
    console.error('Authentication error:', error);
  }
}

// Start the application
startApp();


// Example usage in another module or entry point
async function processInput() {
  try {
    const response = await generateResponse("Hello Gemini"); // Use the imported function
    console.log('Generated Response:', response);
    // Implement further processing or send the response accordingly
  } catch (error) {
    console.error('Error generating response:', error);
  }
}

// Call the function with user input
processInput();
