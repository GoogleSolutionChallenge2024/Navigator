import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  const apiCall = async () => {
    const id = 1;
    try {
      const response = await axios.get(`http://localhost:8080/api/refugees/${id}`);
      const data = response.data;
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendToDatabase = () => {
    // api call to send answers to database
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
      <button onClick={apiCall}>Query Test</button>
    </div>
  );
};

export default Survey;
