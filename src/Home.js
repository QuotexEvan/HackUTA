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
      if (score === question.length || question.length - 1) {
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
          minHeight: 1000,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xd20038,
          color2: 0xff0000,
          backgroundColor: 0xd4d4d4,
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
      <div className="quizCard">
        <h3>Quiz</h3>
        <p>
          Question {currentQuestion} out of {question.length}
        </p>
        <div>{question[currentQuestion].questionText}</div>
        <p>
          {question[currentQuestion].answerOption.map((answer, index) => (
            <p onClick={() => handleClick(answer)}>{answer.answerText}</p>
          ))}
        </p>
      </div>
    </div>
  );
}

export default Home;
