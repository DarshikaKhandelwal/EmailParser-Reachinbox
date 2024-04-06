// gmailService.js

const port = 3000;
const REDIRECT_URI = `http://localhost:${port}/auth/google/callback`;


const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
  '405949244168-4sspkhf37jg479iqb6g587qnehnv60kh.apps.googleusercontent.com',
  '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',
  REDIRECT_URI
);

// Authenticate with OAuth2
async function authenticate() {
  // Implement OAuth2 authentication flow
  // See: https://developers.google.com/gmail/api/quickstart/nodejs
}

// Fetch email by messageId
async function getEmail(messageId) {
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  const response = await gmail.users.messages.get({ userId: 'me', id: messageId });
  return response.data;
}

// Send automatic response
async function sendAutomaticResponse(category, email) {
  // Generate response based on category
  let responseText = '';
  switch (category) {
    case 'interested':
      responseText = 'Thank you for your interest. We will provide more information shortly.';
      break;
    case 'not interested':
      responseText = 'Thank you for letting us know.';
      break;
    case 'more information':
      responseText = 'Here is the additional information you requested.';
      break;
    default:
      responseText = 'Thank you for your email.';
  }

  // Compose email message
  const to = email.payload.headers.find(header => header.name === 'To').value;
  const subject = email.payload.headers.find(header => header.name === 'Subject').value;
  const message = `To: ${to}\nSubject: ${subject}\n\n${responseText}`;

  // Send email using Gmail API
  await gmail.users.messages.send({ userId: 'me', requestBody: { raw: Buffer.from(message).toString('base64') } });
}

module.exports = {
  authenticate,
  getEmail,
  sendAutomaticResponse
};