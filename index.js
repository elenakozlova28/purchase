// Import the required modules
const express = require('express');
const app = express();

// Set the port
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to my Node.js server!');
});

// About route
app.get('/about', (req, res) => {
  res.send('This is a simple Node.js server with Express.');
});

// Random number generator route
app.get('/random', (req, res) => {
  const randomNum = Math.floor(Math.random() * 100) + 1;
  res.json({ number: randomNum });
});

// Reverse string API
app.post('/reverse', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  const reversedText = text.split('').reverse().join('');
  res.json({ original: text, reversed: reversedText });
});

// Simple calculator API
app.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;

  if (num1 === undefined || num2 === undefined || !operation) {
    return res.status(400).json({ error: 'num1, num2, and operation are required' });
  }

  let result;
  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      if (num2 === 0) {
        return res.status(400).json({ error: 'Division by zero is not allowed' });
      }
      result = num1 / num2;
      break;
    default:
      return res.status(400).json({ error: 'Invalid operation' });
  }

  res.json({ num1, num2, operation, result });
});

// Route to simulate a delay
app.get('/delay', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  res.send('Sorry for the delay!');
});

// Not found route
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

