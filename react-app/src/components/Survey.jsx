import React, { useState } from 'react';

const Survey = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep === 1) return;
    setCurrentStep(currentStep - 1);
  };

  const handleAnswer = (question, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };

  const handleSendToDatabase = () => {
    // fetch('/api/survey', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(answers),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));
    // const id = 1;
    // fetch(`/api/refugees/${id}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(answers),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));
    // }, [],);

  };

  return (
    <div>
      <div className="upperBar">
        <button onClick={handlePreviousStep}>Previous</button>
        <h1>Onboarding Survey</h1>
        <p>Step {currentStep}</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
        </div>
      </div>
      
      {/* Render survey questions based on currentStep */}
      {currentStep === 1 && (
        <>
          <h2>Question 1</h2>
          {/* Render question 1 */}
          <button onClick={() => handleAnswer('question1', 'answer1')}>Answer 1</button>
          <button onClick={() => handleAnswer('question1', 'answer2')}>Answer 2</button>
        </>
      )}
      {currentStep === 2 && (
        <>
          <h2>Question 2</h2>
          {/* Render question 2 */}
          <button onClick={() => handleAnswer('question2', 'answer1')}>Answer 1</button>
          <button onClick={() => handleAnswer('question2', 'answer2')}>Answer 2</button>
        </>
      )}
      {currentStep === 3 && (
        <>
          <h2>Question 3</h2>
          {/* Render question 3 */}
          <button onClick={() => handleAnswer('question3', 'answer1')}>Answer 1</button>
          <button onClick={() => handleAnswer('question3', 'answer2')}>Answer 2</button>
        </>
      )}

      {currentStep < 3 && <button onClick={handleNextStep}>Next</button>}
      {currentStep === 3 && <button onClick={handleSendToDatabase}>Submit</button>}
      <button onClick={handleSendToDatabase}>Query Test</button>
    </div>
  );
};

export default Survey;
