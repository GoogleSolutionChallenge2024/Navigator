// import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Survey from './components/Survey'
import Result from './components/Result'
import Setting from './components/Setting';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/survey" element={<Survey />}></Route>
        <Route path="/result" element={<Result />}></Route>
        <Route path="/setting" element={<Setting />}></Route>
      </Routes>
    </Router>
  )
}

export default App
