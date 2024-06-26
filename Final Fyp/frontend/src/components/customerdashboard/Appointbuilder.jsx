import React, { useState, useEffect } from "react";
import './Appointbuilder.css';
import https from "../https";
import AuthUser from "../AuthUser";
import { MdAlarm } from 'react-icons/md';
import BeatLoader from "react-spinners/BeatLoader";

const Appointbuilder = () => {
  const [builders, setBuilders] = useState([]);
  const [selectedBuilder, setSelectedBuilder] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [userdetail, setUserdetail] = useState('');
  const [cusid, setCusid] = useState('');
  const { http } = AuthUser();
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    fetchAllUsers();
    fetchUserDetail();
  }, []);

  const fetchAllUsers = () => {
    setIsLoading(true); // Start loading
    https.get('/builders').then(res => {
      setBuilders(res.data);
      setIsLoading(false); // Stop loading
    });
  };

  const fetchUserDetail = () => {
    http.get('/customers/user-profile')
      .then((res) => {
        setUserdetail(res.data);
        setCusid(userdetail.id);
        setCusid(res.data.id);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  };

  const appointbuilder = (AppointmentData) => {
    https
      .post(`/customers/appointments/${AppointmentData.id}`, AppointmentData)
      .then(() => {
        fetchAllUsers();
        setSelectedBuilder(null);
        setShowTable(true);
      })
      .catch((error) => {
        console.error('Error Updating', error);
      });
  };

  const DetailsForm = ({ builder, onSubmit }) => {
    const [description, setDescription] = useState(builder.description);
    const [duration, setDuration] = useState(builder.duration);
    const [projecttype, setProjecttype] = useState(builder.projecttype);
    const [budget, setBudget] = useState(builder.budget);

    const handleSubmit = (e) => {
      e.preventDefault();
      const AppointmentData = {
        id: builder.id,
        description,
        projecttype,
        duration,
        budget,
        customer_id: cusid,
      };
      onSubmit(AppointmentData);
    };

    return (
      <>
        <div className="center">
          <form onSubmit={handleSubmit}>
            <h1 id="head">Project Details </h1>
            <div className="form-group22">
              <label>Project Description</label>
              <textarea
                rows="4"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group22">
              <label>Project Duration (In Days)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="form-group22">
              <label>Project Type</label>
              <input
                type="text"
                value={projecttype}
                onChange={(e) => setProjecttype(e.target.value)}
              />
            </div>
            <div className="form-group22">
              <label>Total Budget</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <button type="submit" className="submitbutton1">Send</button>
          </form>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="order-table1">
        <h1>BUILDERS</h1>
        {isLoading ? (
          <BeatLoader color="#F79B4F" size={20} className="loader" />
        ) : showTable ? (
          <table className="table">
            <thead>
              <tr>
                <th>UserID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Experience</th>
                <th>Experties</th>
                <th>Verification</th>
                <th>Request Appointment</th>
              </tr>
            </thead>
            <tbody>
              {builders.map((builder, index) => (
                <tr key={index}>
                  <td>{builder.id}</td>
                  <td>{builder.name}</td>
                  <td>{builder.email}</td>
                  <td>{builder.contact}</td>
                  <td>{builder.experience}</td>
                  <td>{builder.experties}</td>
                  <td>{builder.Verification}</td>
                  <td>
                    <button
                      className="appointmenticon"
                      onClick={() => {
                        setSelectedBuilder(selectedBuilder === builder ? null : builder);
                        setShowTable(false);
                      }}
                    >
                      <MdAlarm className="appointmenticon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <DetailsForm builder={selectedBuilder} onSubmit={appointbuilder} />
        )}
      </div>
    </>
  );
};

export default Appointbuilder;
