// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quizapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a Quiz schema
const quizSchema = new mongoose.Schema({
  quizTitle: String,
  questions: Array
});

const Quiz = mongoose.model('Quiz', quizSchema);

// Define a Result schema
const resultSchema = new mongoose.Schema({
  quizTitle: String,
  userId: String,
  pointsGiven: Array,
  finalResult: String
});

const Result = mongoose.model('Result', resultSchema);




// API Calls

// API to get the quiz
app.get('/api/getQuiz/:id', async (req, res) => {
    try {
        const quizId = req.params.id;
        const quiz = await Quiz.findById(quizId);
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get quiz' });
    }
});

// API to save quiz result
app.post('/api/saveResult', async (req, res) => {
  try {
    const newResult = new Result(req.body);
    await newResult.save();
    res.json({ message: 'Result saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save result' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
