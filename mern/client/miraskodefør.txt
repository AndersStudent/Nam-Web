import React from "react";
import './quiz.css';

export default function Quiz() {
  return (
    <div className="quiz-container">
      {/* Quiz title*/}
      <h1>If you were a Howl's Moving Castle Character, who would you be?</h1>

      {/* Placeholder for question text */}
      <div className="question-section">
        <h2>Question goes here</h2>

        {/* Grid for answer options */}
        <div className="options-grid">
          {/* Each option has an image and text*/}
          <div className="option-card">
            <img src="/images/colors/blue.png" alt="Option 1" />
            <p>Option 1</p>
          </div>

          <div className="option-card">
            <img src="/images/animals/dog.png" alt="Option 2" />
            <p>Option 2</p>
          </div>

          <div className="option-card">
            <img src="/images/placeholder3.png" alt="Option 3" />
            <p>Option 3</p>
          </div>

          <div className="option-card">
            <img src="/images/placeholder4.png" alt="Option 4" />
            <p>Option 4</p>
          </div>

          <div className="option-card">
            <img src="/images/placeholder5.png" alt="Option 5" />
            <p>Option 5</p>
          </div>

          <div className="option-card">
            <img src="/images/placeholder6.png" alt="Option 6" />
            <p>Option 6</p>
          </div>
        </div>
      </div>
    </div>
  );
}
