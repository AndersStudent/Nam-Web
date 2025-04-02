import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6", // light gray
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem", fontWeight: "bold" }}>
        Welcome to the Quiz App
      </h1>
      <button
        onClick={() => navigate("/quiz")}
        style={{
          padding: "12px 24px",
          backgroundColor: "#2563eb", // blue
          color: "white",
          border: "none",
          borderRadius: "16px",
          cursor: "pointer",
          fontSize: "1rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        Start Quiz
      </button>
    </div>
  );
}
