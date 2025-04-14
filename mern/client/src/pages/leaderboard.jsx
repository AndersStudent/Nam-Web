import React from "react";
import "./leaderboard.css";

export default function Result() {
  const currentUserResult = "Howl 🦋"; // just a placeholder
  const leaderboard = [
    "sofiemagic ✨",
    "turniphead42 🥕",
    "calciferfan 🔥",
    "sophiefan99 💇‍♀️",
  ];

  return (
    <div className="result-container">
      <div className="result-main">
        <h2>Congrats!</h2>
        <p>You are... <span className="character-name">{currentUserResult}</span></p>
      </div>

      <div className="leaderboard">
        <h3>Other people got:</h3>
        <ul>
          {leaderboard.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
