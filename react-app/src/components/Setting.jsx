import React, {useState} from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Setting = () => {
  const [refugees, setRefugees] = useState([]);

  const fetchRefugees = async () => {
    const response = await axios.get('http://localhost:8080/api/getRefugees');
    console.log(response.data.refugees);
    setRefugees(response.data.refugees);
  };

  useEffect(() => {
    fetchRefugees();
  }, []);
  return (
    <div>
      <h1>Setting</h1>
      <p>{refugees.map((item, i) => {
        return <li key={i}>{item.data.country}</li>;
      })}</p>
    </div>
  );
};

export default Setting;