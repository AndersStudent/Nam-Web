import React from "react";
import "./leaderboard.css";

export default function Result() {
  const currentUserResult = "Calcifer"; // just a placeholder
  const leaderboard = [
    { username: "sofiemagic ✨", character: "Sophie" },
    { username: "turniphead42 🥕", character: "Turnip Head" },
    { username: "calciferfan 🔥", character: "Calcifer" },
    { username: "sophiefan99 💇‍♀️", character: "Sophie" },
    { username: "howlhighness 🧥", character: "Howl" },
    { username: "witchofwaste 💄", character: "Witch of the Waste" },
    { username: "catfan 🐾", character: "Calcifer" },
    { username: "hatshophero 🎩", character: "Sophie" },
    { username: "flyingcastle 🚀", character: "Howl" },
    { username: "heencutie 🐶", character: "Heen" },
    { username: "markl 💬", character: "Markl" },
    { username: "sulimanser 👑", character: "Madam Suliman"},
    { username: "sophielover123 🥰", character: "Howl"},
    { username: "elphaba 🧙🏿‍♀️", character: "Witch of the Waste"}, // exceeds 13, triggers scroll
  ];

  return (
    <div className="result-container">
      <div className="result-main">
        <h2>Congrats!</h2>
        <p>You are... <span className="character-name">{currentUserResult}</span></p>
        <img src="/images/characters/calcifergif.gif" alt="Calcifer" className="result-gif" />
      </div>

      <div className="leaderboard">
        <h3>Other people got:</h3>
        <ul>
          {leaderboard.map((entry, index) => (
            <li key={index}><strong>{entry.username}</strong> got <em>{entry.character}</em></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
