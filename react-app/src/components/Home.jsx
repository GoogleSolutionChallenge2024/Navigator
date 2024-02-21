import React from 'react';
import './home.css';
import logoImg from '../assets/logo.png';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="view poppins-regular" >
      <div className="center">
      <img src={logoImg} alt="Navigator logo" />
      <h1>Navigator</h1>
      <p>Find migration countries<br/>easily and quickly
      </p>
      </div>
      <Link to='/survey' className='btn poppins-semibold'>Finding migrant country</Link>
    </div>
  );
};

export default Home;
