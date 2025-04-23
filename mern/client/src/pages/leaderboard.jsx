import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import "./leaderboard.css";

export default function Result() {
  const location = useLocation();
  const currentUserResult = location.state?.finalResult || "Unknown";
  const quizTitle = location.state?.quizTitle || "If you were a Howl's Moving Castle Character, who would you be?";
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch(`http://localhost:3000/api/leaderboard?quizTitle=${encodeURIComponent(quizTitle)}`);
        const data = await res.json();
        setLeaderboard(data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    }

    fetchLeaderboard();
  }, [quizTitle]);

  return (
    <div className="result-container">
      <div className="result-main">
        <h2>Congrats!</h2>
        <p>You are... <span className="character-name">{currentUserResult}</span></p>
        <img
          src={`/images/characters/${currentUserResult.toLowerCase().replace(/\s+/g, '')}gif.gif`}
          alt={currentUserResult}
          className="result-gif"
          onError={e => { e.target.src = '/images/characters/placeholder.gif'; }}
        />
      </div>

      <div className="leaderboard">
        <h3>Other people got:</h3>
        <ul>
          {leaderboard.map((entry, i) => (
            <li key={i}>
              <strong>{entry.userId}</strong> got <em>{entry.character}</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
