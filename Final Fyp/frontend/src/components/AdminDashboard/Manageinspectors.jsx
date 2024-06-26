import React, { useState, useEffect } from "react";
import https from "../https";
import './manage.css'
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';

const Manageinspectors = () => {
  const [users, setUsers] = useState([]);
  const [selectedInspector, setSelectedInspector] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    setLoading(true); // Set loading to true
    https.get('/inspectors')
      .then(res => {
        setUsers(res.data);
        setLoading(false); // Set loading to false
      })
      .catch(error => {
        console.error('Error fetching inspectors:', error);
        setLoading(false); // Set loading to false
      });
  };

  const deleteInspector = (id) => {
    setLoading(true); // Set loading to true
    https.delete('/admins/deleteinspector/' + id)
      .then(() => {
        fetchAllUsers();
      })
      .catch((error) => {
        console.error('Error deleting inspector:', error);
        setLoading(false); // Set loading to false
      });
  };

  const updateInspector = (updatedInspector) => {
    setLoading(true); // Set loading to true
    https.put(`/admins/updateinspector/${updatedInspector.id}`, updatedInspector)
      .then(() => {
        fetchAllUsers();
        setSelectedInspector(null);
        setShowTable(true);
      })
      .catch((error) => {
        console.error('Error updating inspector:', error);
        setLoading(false); // Set loading to false
      });
  };

  const EditInspectorForm = ({ inspector, onSubmit }) => {
    const [name, setName] = useState(inspector.name);
    const [email, setEmail] = useState(inspector.email);
    const [contact, setContact] = useState(inspector.contact);
    const [experience, setExperience] = useState(inspector.experience);
    const [experties, setExperties] = useState(inspector.experties);
    const [fbrNTN, setFbrNTN] = useState(inspector.fbrNTN);
    const [Verification, setVerification] = useState(inspector.Verification);

    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedInspector = {
        id: inspector.id,
        name,
        email,
        contact,
        experience,
        experties,
        fbrNTN,
        Verification,
      };
      onSubmit(updatedInspector);
    };

    return (
      <div className="center">
        <form onSubmit={handleSubmit}>
          <h1 id="head">Update Inspector</h1>
          <div className="form-group22">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group22">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group22">
            <label>Contact</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="form-group22">
            <label>Experience in years</label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          <div className="form-group22">
            <label>Expertise</label>
            <textarea
              rows="4"
              cols="50"
              value={experties}
              onChange={(e) => setExperties(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group22">
            <label>PEC License Number</label>
            <input
              type="text"
              value={fbrNTN}
              onChange={(e) => setFbrNTN(e.target.value)}
            />
          </div>
          <div className="form-group22">
            <label>Verification</label>
            <input
              type="text"
              value={Verification}
              onChange={(e) => setVerification(e.target.value)}
            />
          </div>
          <button type="submit" className="submitbutton1">Update</button>
        </form>
      </div>
    );
  };

  return (
    <div className="order-table1">
      <h1>INSPECTORS</h1>
      {loading ? ( // Display loading spinner if loading state is true
        <div className="loader-container">
          <BeatLoader color="#F79B4F" size={20} />
        </div>
      ) : (
        showTable && (
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
                <th id="del">Delete</th>
                <th id="edit">Edit</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td>{user.experience}</td>
                  <td>{user.experties}</td>
                  <td>{user.fbrNTN}</td>
                  <td>{user.Verification}</td>
                  <td>
                    <button className="delbtn" onClick={() => deleteInspector(user.id)}>
                      <FaTrash className="delicon" />
                    </button>
                  </td>
                  <td>
                    <button className="editbtn" onClick={() => {
                      setSelectedInspector(selectedInspector === user ? null : user);
                      setShowTable(false);
                    }}>
                      <FaEdit className="editicon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
      {selectedInspector && (
        <EditInspectorForm
          inspector={selectedInspector}
          onSubmit={updateInspector}
        />
      )}
    </div>
  );
};

export default Manageinspectors;
