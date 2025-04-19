import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas (replace 'quizDb' with your actual DB name if different)
mongoose.connect(
  'mongodb+srv://niklasniha:V0X5xMMMTfecpMLv@cluster0.6hxu8fz.mongodb.net/quizDB?retryWrites=true&w=majority'
);

// Log MongoDB connection status
mongoose.connection
  .on('connected', () => console.log('✅ MongoDB connected'))
  .on('error', err => console.error('❌ MongoDB connection error:', err));

// Define the Quiz schema and model
const quizSchema = new mongoose.Schema({
  quizTitle: String,
  questionText: String,
  answers: Array
}, {
  collection: 'questions' // Match your MongoDB collection name exactly
});

const Quiz = mongoose.model('questions', quizSchema);

// Define the Result schema and model
const resultSchema = new mongoose.Schema({
  quizTitle: String,
  userId: String,
  pointsGiven: Array,
  finalResult: String
}, {
  collection: 'results' // Optional: add this if you use a specific collection name
});

const Result = mongoose.model('results', resultSchema);

// Get a qustion from id
app.get('/api/getQuiz/:id', async (req, res) => {
  try {
    const quizId = req.params.id;
    console.log('🔍 Looking for quiz with ID:', quizId);
    const quiz = await Quiz.findById(quizId);
    console.log('📦 Found quiz:', quiz);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    console.error('❌ Error fetching quiz:', error);
    res.status(500).json({ error: 'Failed to get quiz' });
  }
});


// GET all questions for a given quizTitle
app.get('/api/getQuiz', async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) return res.status(400).json({ error: 'Missing quiz title' });
    const questions = await Quiz.find({ quizTitle: title });
    if (!questions.length)
      return res.status(404).json({ error: 'No questions found for that quiz' });
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load quiz' });
  }
});


app.post('/api/saveResult', async (req, res) => {
  try {
    const newResult = new Result(req.body);
    await newResult.save();
    res.json({ message: '✅ Result saved successfully!' });
  } catch (error) {
    console.error('❌ Error saving result:', error);
    res.status(500).json({ error: 'Failed to save result' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
