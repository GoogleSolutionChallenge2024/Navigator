import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Survey.css';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Survey = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [title,setTitle] = useState("Profile Setting");
  const [visible, setVisible] = useState(false);
  const [available, setAvailable] = useState(false);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
    if (currentStep<3) {
      setTitle("Profile Setting")
    } else {
      setTitle("Create Account")
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 1) return;
    setCurrentStep(currentStep - 1);
    if (currentStep<=4) {
      setTitle("Profile Setting")
    } else {
      setTitle("Create Account")
    }
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

  const navigate = useNavigate();
  const handleSendToDatabase = () => {
    // api call to send answers to database
    navigate('/result');
};


  return (
    <div className="display">
      <div className="upperBar">
        <button onClick={handlePreviousStep} id="goBack"><IoIosArrowBack size = {'1.5rem'}/></button>
        <h4>{title}</h4>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(currentStep / 6) * 100}%` }}></div>
        </div>
      </div>
      
      {/* Render survey questions based on currentStep */}
      {currentStep === 1 && (
        <div className="reply">
          <h2>What is your name?</h2>
          {/* Render question 1 */}
          <input></input>
          {available && <img src="src/assets/CheckBox.png" className="check"></img>}
          <button onClick={() => handleAnswer('question1', 'answer1')}>Answer 1</button>
          <button onClick={() => handleAnswer('question1', 'answer2')}>Answer 2</button>
        </div>
      )}
      {currentStep === 2 && (
        <div className="reply">
          <h2>What is your gender?</h2>
          {/* Render question 2 */}
          <input></input>
          {available&&<img src="src/assets/CheckBox.png" className="check"></img>}
          <button onClick={() => handleAnswer('question2', 'answer1')}>Answer 1</button>
          <button onClick={() => handleAnswer('question2', 'answer2')}>Answer 2</button>
        </div>
      )}
      {currentStep === 3 && (
        <div className="reply">
          <h2>What are you from?</h2>
          {/* Render question 3 */}
          <input></input>
          {available&&<img src="src/assets/CheckBox.png" className="check"></img>}        
          <button onClick={() => handleAnswer('question3', 'answer1')}>Answer 1</button>
          <button onClick={() => handleAnswer('question3', 'answer2')}>Answer 2</button>
        </div>
      )}

      {currentStep === 4 && (
        <div className="reply">
          <h2>What is your first language?</h2>
          {/* Render question 3 */}
          <input></input>
          {available&&<img src="src/assets/CheckBox.png" className="check"></img>}
          <button onClick={() => handleAnswer('question3', 'answer1')}>Answer 1</button>
          <button onClick={() => handleAnswer('question3', 'answer2')}>Answer 2</button>
        </div>
      )}

      {currentStep === 5 && (
        <div className="reply">
          <h2>Are you religious?</h2>
          {/* Render question 3 */}
          <button onClick={() => {    
                      setVisible(false)
                    }} className="religionBtn">No. I am not</button> 
                <button onClick={() => {
                    setVisible(true)
                }} className="religionBtn">Yes. I am.</button>
                {visible && <div>
                    <h2>Religion</h2>
                    <input ></input>
                    {available&&<img src="src/assets/CheckBox.png" className="check"></img>}
                </div>}
          <button onClick={() => handleAnswer('question3', 'answer1')}>Answer 1</button>
          <button onClick={() => handleAnswer('question3', 'answer2')}>Answer 2</button>
        </div>
      )}

      {currentStep === 6 && (
        <div className="reply">
          <h2>What is your job?</h2>
          {/* Render question 3 */}
          <input></input>
          <button onClick={() => handleAnswer('question3', 'answer1')}>Answer 1</button>
          <button onClick={() => handleAnswer('question3', 'answer2')}>Answer 2</button>
        </div>
      )}
      <div id="footer">
        {currentStep < 6 && <button onClick={handleNextStep} className="goNext"><img src="src/assets/arrow-long-circle-right.png"/></button>}
        {currentStep === 6 && <button onClick={handleSendToDatabase} className="goNext"><img src="src/assets/arrow-long-circle-right.png"/></button>}
        <button onClick={apiCall} id="apicall">Query Test</button>
      </div>
      
    </div>
  );
};

export default Survey;
