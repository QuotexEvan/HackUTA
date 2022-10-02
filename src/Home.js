import React, { useState, useEffect, useRef } from "react";
import { question } from "./data";
import "./Home.css";
import GLOBE from "vanta/dist/vanta.globe.min";

function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [discount, changeDiscount] = useState(0);

  const handleClick = (e) => {
    if (e.isCorrect) {
      setScore(score + 1);
    }
    let nextQuestion = currentQuestion + 1;
    if (nextQuestion < question.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      if (score >= question.length - 1) {
        changeDiscount(20);
      } else {
        changeDiscount(8);
      }
    }
  };

  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          el: myRef.current,
          minHeight: 700,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xd20038,
          color2: 0xff0000,
          backgroundColor: 0xffffff,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div ref={myRef}>
      {!showScore ? (
        <div className="quizCard">
          <h3 style={{ paddingTop: "16px" }}>Quiz</h3>
          <p style={{ fontSize: "1.2rem" }}>
            Question {currentQuestion} out of {question.length}
          </p>
          <div style={{ fontSize: "1.3rem" }}>
            {question[currentQuestion].questionText}
          </div>
          <p
            style={{
              fontSize: "1.2rem",
              textAlign: "start",
              paddingTop: "5px",
              cursor: "pointer",
            }}
          >
            {question[currentQuestion].answerOption.map((answer, index) => (
              <p onClick={() => handleClick(answer)}>{answer.answerText}</p>
            ))}
          </p>
        </div>
      ) : (
        <div className="quizCard">
          <p style={{ fontSize: "1.5rem" }}>
            You scored {score} out of {question.length}
          </p>
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
            And for your score you get {discount} % of selected insurance plans{" "}
          </p>
          <button style={{ borderRadius: "20px", padding: "10px" }}>
            {" "}
            Sign Up to claim your discount
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
