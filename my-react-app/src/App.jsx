import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Quiz from './pages/quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;