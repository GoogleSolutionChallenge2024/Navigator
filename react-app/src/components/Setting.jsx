import React, {useState} from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Setting = () => {
  // Sample page
  const [refugees, setRefugees] = useState([]);

  const fetchRefugees = async () => {
    const response = await axios.get('http://localhost:8080/api/getRefugees');
    console.log(response.data.refugees);
    setRefugees(response.data.refugees);
  };

  const addRefugee = async () => {
    const response = await axios.post('http://localhost:8080/api/addUser', {
      country: "Korea",
      education: "University",
      gender: "Female",
      language: "Korean",
      name: "Jiyeon",
      religion: "Christian",
      result: "America",
      user_id: 3,
    });
    console.log(response.data);
  }

  useEffect(() => {
    fetchRefugees();
  }, []);
  return (
    <div>
      <h1>Setting</h1>
      {/* <p>{refugees.map((item, i) => {
        return <li key={i}>{item.data.country}</li>;
      })}</p> */}
      <button onClick={addRefugee}>Add Refugee</button>
    </div>
  );
};

export default Setting;