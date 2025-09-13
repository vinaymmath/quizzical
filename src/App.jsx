import { useState } from "react";
import SplashScreen from "./views/SplashScreen";
import Questionaire from "./views/Questionaire";
import { decode } from "html-entities";

function App() {
  const [step, setStep] = useState(1);
  const [questionare, setQuestionare] = useState([])
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  function reset() {
    setStep(1);
    setQuestionare([]);
    setShowAnswers(false);
    setScore(0);
    setAnswers({});
  }
  async function fetchQuestions() {
    const response = await fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple");
    const data = await response.json();
    let questions = data.results.map(question => {
      let options = [...question.incorrect_answers, question.correct_answer];
      question.correct_answer = decode(question.correct_answer);
      for(let i = options.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        options[i] = decode(options[i]);
        [options[i], options[j]] = [decode(options[j]), decode(options[i])];
        question['options'] = options;
      }
      question.question = decode(question.question);
      return question;
    })
    setQuestionare(questions);
  }
  async function changeStep(step) {
    if(step === 2){
      setIsLoading(true);
      await fetchQuestions();
      setIsLoading(false);
      setStep(step);
    }

    if(step === 3){
      if(Object.keys(answers).length === questionare.length){
        questionare.map((question) => {
          if(answers[question.question] === question.correct_answer){
            incrementScore();
          }
        })
        setShowAnswers(true);
        setStep(step)
      } else {
        alert("Please answer the questions, make an attempt!")
      }
    }
  }
  function incrementScore() {
    setScore((prevValue) => prevValue + 1)
  }

  return (
    <main>
      <div className="view-container">
        {
          step === 1 ? (
            <SplashScreen changeStep={() => changeStep(2)} isLoading={isLoading}/>
          ) : step === 2 || step === 3 ? (
            <Questionaire 
              questionare={questionare}
              showAnswers={showAnswers} 
              setShowAnswers={() => changeStep(3)}
              step={step}
              score={score}
              setAnswers={setAnswers}
              reset={() => reset()}
              />
          ) : null
        }
      </div>
    </main>
  )
}

export default App
