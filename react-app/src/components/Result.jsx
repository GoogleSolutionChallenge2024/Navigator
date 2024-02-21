// Result
import "./Result.css"
import { Link } from 'react-router-dom'

const Result = ({ analysis, website }) => {
  return (
    <div id="resultPage">
      <div id="upperBar">
        <h4 className="poppins-regular">Recommendation Result</h4>
      </div>
      <div id="resultPrint">
        <h4 className="poppins-regular">The country that suits you is</h4>
        <h2 className="poppins-regular">Germany</h2>
      </div>
      <div id="resultButtons">                  
          <Link to={ website }>
              <button id="link">Go to the relevant website</button>
          </Link>
          <Link to="/">
            <button id="goHome">Go to search again</button>
          </Link>
      </div>
      
    </div>
  );
};

export default Result;
