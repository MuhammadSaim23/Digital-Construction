import React, { useState, useEffect } from "react";
import https from "../../https";
import './Appointinspector.css';
import BeatLoader from "react-spinners/BeatLoader";

const Appointinspector = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    setIsLoading(true); // Start loading
    https.get('/inspectors').then(res => {
      setUsers(res.data);
      setIsLoading(false); // Stop loading
    });
  };

  return (
    <div className="order-table1"> 
      <h1>INSPECTORS</h1>
      {isLoading ? (
        <BeatLoader color="#F79B4F" size={20} className="loader" />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Inspector ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Experience</th>
              <th>Expertise</th>
              <th>Pec License</th>
              <th>Verification</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.experience}</td>
                <td>{user.experties}</td>
                <td>{user.fbrNTN}</td>
                <td>{user.Verification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Appointinspector;