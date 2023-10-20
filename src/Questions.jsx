import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Results from "./Results";

const Questions = () => {
  const [questions, setQuestions] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [color, setColor] = useState('');
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [resultStatus, setResultStatus] = useState(false);
  const [warningMessage, setwarningMessage] = useState(false);

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
      .then(response => {
        console.log("response.data.results",response.data.results);
        setQuestions(response.data.results);
      })
      .catch(error => {
        console.warn(error);
      });
  }, []);

  const handleNextQtn = () => {
    if (count === 9) {
      setResultStatus(true)
    }
    setCount(count + 1)
    if(selectedAnswer == ""){
      setCount(count);
      setwarningMessage(true);
    }
    setColor('')
  }


  const handleCheck = (e) => {
    setSelectedAnswer(e.currentTarget.value);
    if (e.currentTarget.value === questions[count].correct_answer) {
      setColor("correct");
      setScore(score + 1);
      setwarningMessage(false);
    }
    else
      console.warn("error")
  }

  if (resultStatus) {
    return (
      <Results score={score}/>
    )
  }

  if (questions) {
    return (
      <div className="qtn_container">
        <h3>{count + 1} - {questions[count].question}</h3>
        <button onClick={handleCheck} className={`${selectedAnswer === questions[count].incorrect_answers[0] ? "wrong_answer" : ''} `} value={questions[count].incorrect_answers[0]}>{questions.length && questions[count].incorrect_answers[0]}</button>
        <button onClick={handleCheck} className={color} value={questions[count].correct_answer}>{questions.length && questions[count].correct_answer}</button>
        <button onClick={handleCheck} className={`${selectedAnswer === questions[count].incorrect_answers[1] ? "wrong_answer" : ''} `} value={questions[count].incorrect_answers[1]}>{questions.length && questions[count].incorrect_answers[1]}</button>
        <button onClick={handleCheck} className={`${selectedAnswer === questions[count].incorrect_answers[2] ? "wrong_answer" : ''} `} value={questions[count].incorrect_answers[2]}>{questions.length && questions[count].incorrect_answers[2]}</button>
        <div className="next_qtn_container">
          <button className="next_qtn" onClick={handleNextQtn}> Next Question</button>
        </div>
        {warningMessage && <>
        <p style={{textAlign : 'center', color: 'red'}}>Please Select one option</p>
        </>}
      </div>
    )
  }
}

export default Questions