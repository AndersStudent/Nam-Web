// Quiz.jsx
import React, { useState, useEffect } from 'react';
import './quiz.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Quiz({ quizTitle = "If you were a Howl's Moving Castle Character, who would you be?" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId || "1";

  const [questions, setQuestions]   = useState([]);
  const [currentQ, setCurrentQ]     = useState(0);
  const [answersLog, setAnswersLog] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    fetch(`/api/getQuiz?title=${encodeURIComponent(quizTitle)}`)
      .then(res => res.json())
      .then(qs => {
        setQuestions(qs);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed loading quiz:', err);
        setLoading(false);
      });
  }, [quizTitle]);

  const handleAnswer = answerObj => {
    const entry = {
      questionText: questions[currentQ].questionText,
      chosenAnswer: answerObj.text,
      pointsGiven: answerObj.pointsGiven
    };

    const newLog = [...answersLog];
    const existingIdx = newLog.findIndex(e => e.chosenAnswer === entry.chosenAnswer);
    if (existingIdx > -1) {
      newLog[existingIdx].pointsGiven.push(...entry.pointsGiven);
    } else {
      newLog.push(entry);
    }

    const isLast = currentQ + 1 === questions.length;
    if (!isLast) {
      setAnswersLog(newLog);
      setCurrentQ(currentQ + 1);
      return;
    }

    
    const allPoints = newLog.flatMap(a => a.pointsGiven);
    const scoreMap = allPoints.reduce((acc, { character, points }) => {
      acc[character] = (acc[character] || 0) + points;
      return acc;
    }, {});

    const topCharacter = Object.keys(scoreMap).reduce((a, b) =>
      scoreMap[a] > scoreMap[b] ? a : b
    );

    
    fetch('/api/saveResult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quizTitle,
        userId,
        pointsGiven: allPoints,
        finalResult: topCharacter
      })
    })
      .then(r => r.json())
      .then(js => console.log('Result saved:', js.message))
      .catch(e => console.error('Save failed:', e));

    
    navigate('/leaderboard', {
      state: {
        finalResult: topCharacter
      }
    });
  };

  if (loading)           return <div>Loading…</div>;
  if (!questions.length) return <div>No questions found.</div>;

  const q = questions[currentQ];
  return (
    <div className="quiz-container">
      <h1>{quizTitle}</h1>
      <div className="question-section">
        <h2>{q.questionText}</h2>
        <div className="options-grid">
          {q.answers.map((ans, i) => (
            <div
              key={i}
              className="option-card"
              onClick={() => handleAnswer(ans)}
            >
              <img
                src={`/images/${                
                  /color/i.test(q.questionText)      ? 'colors' :
                  /food/i.test(q.questionText)       ? 'foods' :
                  /hat/i.test(q.questionText)        ? 'hats' :
                  /home/i.test(q.questionText)       ? 'homes' :
                  /movie/i.test(q.questionText)      ? 'movies' :
                  /trans/i.test(q.questionText)      ? 'transportation' :
                  /vac/i.test(q.questionText)        ? 'vacation' :
                                                      'animals'
                }/${ans.text.toLowerCase().replace(/\s+/g, '').replace(':', '')}.png`}
                alt={ans.text}
                onError={e => { e.target.src = '/images/placeholder.png'; }}
              />
              <p>{ans.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
