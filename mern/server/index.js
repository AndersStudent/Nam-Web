import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// establish a connection to mongodb
mongoose.connect(
  'mongodb+srv://niklasniha:V0X5xMMMTfecpMLv@cluster0.6hxu8fz.mongodb.net/quizDB?retryWrites=true&w=majority'
);

// logging the connection
mongoose.connection
  .on('connected', () => console.log('MongoDB connected'))
  .on('error', err => console.error('MongoDB connection error:', err));

//schema and model
const quizSchema = new mongoose.Schema({
  quizTitle: String,
  questionText: String,
  answers: Array
}, {
  collection: 'questions'
});

const Quiz = mongoose.model('questions', quizSchema);

//schema and model
const resultSchema = new mongoose.Schema({
  quizTitle: String,
  userId: String,
  pointsGiven: Array,
  finalResult: String
}, {
  collection: 'results'
});

const Result = mongoose.model('results', resultSchema);

// get question id
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

// leaderboard results
app.get('/api/leaderboard', async (req, res) => {
  try {
    const { quizTitle } = req.query;
    if (!quizTitle) return res.status(400).json({ error: 'Missing quizTitle' });

    const results = await Result.find({ quizTitle })
      .sort({ _id: -1 }) 
      .limit(100); // right now is set limit to 100

    const leaderboardData = results.map(result => ({
      character: result.finalResult,
      userId: result.userId || "Anonymous"
    }));

    res.json(leaderboardData);
  } catch (err) {
    console.error('❌ Failed to get leaderboard:', err);
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
});

// here we start the server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
