import React, { useState, useEffect } from "react";
import https from "../https";
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';

const Managebuilders = () => {
  const [users, setUsers] = useState([]);
  const [selectedBuilder, setSelectedBuilder] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    setLoading(true); // Set loading to true
    https.get('/builders')
      .then(res => {
        setUsers(res.data);
        setLoading(false); // Set loading to false
      })
      .catch(error => {
        console.error('Error fetching builders:', error);
        setLoading(false); // Set loading to false
      });
  };

  const deleteBuilder = (id) => {
    setLoading(true); // Set loading to true
    https.delete('/admins/deletebuilder/' + id)
      .then(() => {
        fetchAllUsers();
      })
      .catch((error) => {
        console.error('Error deleting builder:', error);
        setLoading(false); // Set loading to false
      });
  };

  const updateBuilder = (updatedBuilder) => {
    setLoading(true); // Set loading to true
    https.put(`/admins/updatebuilder/${updatedBuilder.id}`, updatedBuilder)
      .then(() => {
        fetchAllUsers();
        setSelectedBuilder(null);
        setShowTable(true);
      })
      .catch((error) => {
        console.error('Error updating builder:', error);
        setLoading(false); // Set loading to false
      });
  };

  const EditBuilderForm = ({ builder, onSubmit }) => {
    const [name, setName] = useState(builder.name);
    const [email, setEmail] = useState(builder.email);
    const [contact, setContact] = useState(builder.contact);
    const [experience, setExperience] = useState(builder.experience);
    const [experties, setExperties] = useState(builder.experties);
    const [fbrNTN, setFbrNTN] = useState(builder.fbrNTN);
    const [Verification, setVerification] = useState(builder.Verification);

    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedBuilder = {
        id: builder.id,
        name,
        email,
        contact,
        experience,
        experties,
        fbrNTN,
        Verification,
      };
      onSubmit(updatedBuilder);
    };

    return (
      <div className="center">
        <form onSubmit={handleSubmit}>
          <h1 id="head">Update Builder</h1>
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
            <label>Experties</label>
            <textarea
              rows="4"
              cols="50"
              value={experties}
              onChange={(e) => setExperties(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group22">
            <label>FBR License Number</label>
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
      <h1>BUILDERS</h1>
      {loading ? ( // Show loader when loading is true
        <BeatLoader color="#F79B4F" size={20} className="loader" />
      ) : (
        <>
          {showTable && (
            <table className="table">
              <thead>
                <tr>
                  <th>UserID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Experience</th>
                  <th>Experties</th>
                  <th>NTN No</th>
                  <th>Verification</th>
                  <th id="del">Delete</th>
                  <th id="edit">Edit</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
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
                      <button className="delbtn" onClick={() => { deleteBuilder(user.id) }}>
                        <FaTrash className="delicon" />
                      </button>
                    </td>
                    <td>
                      <button className="editbtn" onClick={() => {
                        setSelectedBuilder(selectedBuilder === user ? null : user);
                        setShowTable(false);
                      }}>
                        <FaEdit className="editicon" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedBuilder && (
            <EditBuilderForm
              builder={selectedBuilder}
              onSubmit={updateBuilder}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Managebuilders;
