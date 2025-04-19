import React, { useState, useEffect } from 'react';
import './quiz.css';

export default function Quiz({
  quizTitle = "If you were a Howl's Moving Castle Character, who would you be?",
  userId = "1"
}) {
  const [questions, setQuestions]   = useState([]);
  const [currentQ, setCurrentQ]     = useState(0);
  const [answersLog, setAnswersLog] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [finished, setFinished]     = useState(false);
  const [result, setResult]         = useState(null);
  const [tally, setTally]           = useState({});

  // Load quiz questions on mount
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
    // Build new log entry
    const entry = {
      questionText: questions[currentQ].questionText,
      chosenAnswer: answerObj.text,
      pointsGiven: answerObj.pointsGiven  // assumed array of { character, points }
    };

    // Update answers log
    const newLog = [...answersLog];
    const existingIdx = newLog.findIndex(e => e.chosenAnswer === entry.chosenAnswer);
    if (existingIdx > -1) {
      newLog[existingIdx] = {
        ...newLog[existingIdx],
        pointsGiven: [
          ...newLog[existingIdx].pointsGiven,
          ...entry.pointsGiven
        ]
      };
    } else {
      newLog.push(entry);
    }

    const isLast = currentQ + 1 === questions.length;

    if (!isLast) {
      // Still have more questions
      setAnswersLog(newLog);
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate final tally
      const allPoints = newLog.flatMap(a => a.pointsGiven);
      const scoreMap = allPoints.reduce((acc, { character, points }) => {
        acc[character] = (acc[character] || 0) + points;
        return acc;
      }, {});

      // Determine highest scorer
      const topCharacter = Object.keys(scoreMap).reduce((a, b) =>
        scoreMap[a] > scoreMap[b] ? a : b
      );

      // Update state
      setTally(scoreMap);
      setResult(topCharacter);
      setFinished(true);
      setAnswersLog(newLog);

      // Persist result
      const payload = {
        quizTitle,
        userId,
        pointsGiven: allPoints,
        finalResult: topCharacter
      };

      fetch('/api/saveResult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(r => r.json())
        .then(js => console.log('Result saved:', js.message))
        .catch(e => console.error('Save failed:', e));
    }
  };

  if (loading)           return <div>Loading…</div>;
  if (!questions.length) return <div>No questions found.</div>;

  // Final screen showing result and score breakdown
  if (finished) {
    return (
      <div className="result-screen">
        <h2>You are {result}!</h2>
        <h3>Your scores:</h3>
        <ul>
          {Object.entries(tally).map(([charName, pts]) => (
            <li key={charName}>
              {charName}: {pts} point{pts !== 1 ? 's' : ''}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Quiz question display
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
                      /color/i.test(q.questionText)
                      ? 'colors'
                      : /food/i.test(q.questionText)
                      ? 'foods'
                      : /hat/i.test(q.questionText)
                      ? 'hats'
                      : /home/i.test(q.questionText)
                      ? 'homes'
                      : /movie/i.test(q.questionText)
                      ? 'movies'
                      : /trans/i.test(q.questionText)
                      ? 'transportation'
                      : /vac/i.test(q.questionText)
                      ? 'vacation'
                      : 'animals'
                  }/${ans.text.toLowerCase().replace(/\s+/g, '').replace(':', '')}.png`}
                  alt={ans.text}
                  onError={e => {
                    console.log('Failed to load image:', e.target.src);
                    e.target.src = '/images/placeholder.png';
                  }}
                  onLoad={e => {
                    console.log('Successfully loaded image:', e.target.src);
                  }}
                />

              <p>{ans.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
