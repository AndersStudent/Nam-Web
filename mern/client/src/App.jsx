import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/home';
import Quiz from './pages/quiz';
import Leaderboard from './pages/leaderboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;