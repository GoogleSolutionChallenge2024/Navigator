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
  const [yesClicked, setYesClicked] = useState(false);
  const [noClicked, setNoClicked] = useState(false);

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

  const handleAnswer = (e) => {
    console.log(currentStep, e.target.value);
    switch (currentStep){
      case 1:
        setAnswers(prevAnswers => (({...prevAnswers, name: e.target.value})));
        break;
      case 2:
        setAnswers(prevAnswers => (({...prevAnswers, gender: e.target.value})));
        break;
      case 3:
        setAnswers(prevAnswers => (({...prevAnswers, country: e.target.value})));
        break;
      case 4:
        setAnswers(prevAnswers => (({...prevAnswers, language: e.target.value})));
        break;
      case 5:
        setAnswers(prevAnswers => (({...prevAnswers, religion: e.target.value})));
        break;
      case 6:
        setAnswers(prevAnswers => (({...prevAnswers, job: e.target.value})));
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();


  function fillNullValues(obj, defaultValue) {
    const newObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = obj[key] !== null ? obj[key] : defaultValue;
      }
    }
    return newObj;
  }
  
  

  const handleSendToDatabase = async () => {
    const answersWithDefaults = fillNullValues(answers, 'None');
    console.log("보내기 전 ", answersWithDefaults);
    try {
      const res = await axios.post('http://localhost:8080/api/addUser', answersWithDefaults);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
    navigate('/result');
};


  return (
    <div className="wrap">
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
          <input onChange={handleAnswer}></input>
          {available && <img src="src/assets/CheckBox.png" className="check"></img>}
        </div>
      )}
      {currentStep === 2 && (
        <div className="reply">
          <h2>What is your gender?</h2>
          <input onChange={handleAnswer}></input>
          {available&&<img src="src/assets/CheckBox.png" className="check"></img>}
        </div>
      )}
      {currentStep === 3 && (
        <div className="reply">
          <h2>Where are you from?</h2>
          <input onChange={handleAnswer}></input>
          {available&&<img src="src/assets/CheckBox.png" className="check"></img>}
        </div>
      )}

      {currentStep === 4 && (
        <div className="reply">
          <h2>What is your first language?</h2>
          <input onChange={handleAnswer}></input>
          {available&&<img src="src/assets/CheckBox.png" className="check"></img>}
        </div>
      )}

      {currentStep === 5 && (
        <div className="reply">
          <h2>Are you religious?</h2>
          <button onClick={() => {    
                      setNoClicked(true);
                      setYesClicked(false);
                      setVisible(false);
                    }} className={noClicked ? "religionBtn clicked" : "religionBtn"}>No. I am not</button> 
                <button onClick={() => {
                    setYesClicked(true);
                    setNoClicked(false);
                    setVisible(true);
                }} className={yesClicked ? "religionBtn clicked" : "religionBtn"}>Yes. I am.</button>
                {visible && <div>
                    <h2>Religion</h2>
                    <input onChange={handleAnswer}></input>
                    {available&&<img src="src/assets/CheckBox.png" className="check"></img>}
                </div>}
        </div>
      )}

      {currentStep === 6 && (
        <div className="reply">
          <h2>What is your job?</h2>
          <input onChange={handleAnswer}></input>
        </div>
      )}
      <div id="footer">
        {currentStep < 6 && <button onClick={handleNextStep} className="goNext"><img src="src/assets/arrow-long-circle-right.png"/></button>}
        {currentStep === 6 && <button onClick={handleSendToDatabase} className="goNext"><img src="src/assets/arrow-long-circle-right.png"/></button>}
      </div>
      
    </div></div>
  );
};

export default Survey;
