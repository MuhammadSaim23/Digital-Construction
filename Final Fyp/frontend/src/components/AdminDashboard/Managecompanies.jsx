import React, { useState, useEffect } from "react";
import https from "../https";
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';

const Managecompanies = () => {
  const [users, setUsers] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    setLoading(true); // Set loading to true
    https.get('/companies')
      .then(res => {
        setUsers(res.data);
        setLoading(false); // Set loading to false
      })
      .catch(error => {
        console.error('Error fetching companies:', error);
        setLoading(false); // Set loading to false
      });
  };

  const deleteCompany = (id) => {
    setLoading(true); // Set loading to true
    https.delete('/admins/deletecompany/' + id)
      .then(() => {
        fetchAllUsers();
      })
      .catch((error) => {
        console.error('Error deleting company:', error);
        setLoading(false); // Set loading to false
      });
  };

  const updateCompany = (updatedCompany) => {
    setLoading(true); // Set loading to true
    https.put(`/admins/updatecompany/${updatedCompany.id}`, updatedCompany)
      .then(() => {
        fetchAllUsers();
        setSelectedCompany(null);
        setShowTable(true);
      })
      .catch((error) => {
        console.error('Error updating company:', error);
        setLoading(false); // Set loading to false
      });
  };

  const EditCompanyForm = ({ company, onSubmit }) => {
    const [name, setName] = useState(company.name);
    const [email, setEmail] = useState(company.email);
    const [contact, setContact] = useState(company.contact);

    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedCompany = {
        id: company.id,
        name,
        email,
        contact
      };
      onSubmit(updatedCompany);
    };

    return (
      <div className="center">
        <form onSubmit={handleSubmit}>
          <h1 id="head">Update Company</h1>
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
          <button type="submit" className="submitbutton1">Update</button>
        </form>
      </div>
    );
  };

  return (
    <div className="order-table1">
      <h1>COMPANIES</h1>
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
                    <td>
                      <button className="delbtn" onClick={() => deleteCompany(user.id)}>
                        <FaTrash className="delicon" />
                      </button>
                    </td>
                    <td>
                      <button className="editbtn" onClick={() => {
                        setSelectedCompany(selectedCompany === user ? null : user);
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

          {selectedCompany && (
            <EditCompanyForm
              company={selectedCompany}
              onSubmit={updateCompany}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Managecompanies;
