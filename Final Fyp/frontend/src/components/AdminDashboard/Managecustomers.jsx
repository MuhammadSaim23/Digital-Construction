import React, { useState, useEffect } from "react";
import https from "../https";
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';

const Managecustomers = () => {
  const [users, setUsers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    setLoading(true); // Set loading to true
    https.get('/customers')
      .then(res => {
        setUsers(res.data);
        setLoading(false); // Set loading to false
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
        setLoading(false); // Set loading to false
      });
  };

  const deleteCustomer = (id) => {
    setLoading(true); // Set loading to true
    https.delete('/admins/deletecustomer/' + id)
      .then(() => {
        fetchAllUsers();
      })
      .catch((error) => {
        console.error('Error deleting customer:', error);
        setLoading(false); // Set loading to false
      });
  };

  const updateCustomer = (updatedCustomer) => {
    setLoading(true); // Set loading to true
    https.put(`/admins/updatecustomer/${updatedCustomer.id}`, updatedCustomer)
      .then(() => {
        fetchAllUsers();
        setSelectedCustomer(null);
        setShowTable(true);
      })
      .catch((error) => {
        console.error('Error updating customer:', error);
        setLoading(false); // Set loading to false
      });
  };

  const EditCustomerForm = ({ customer, onSubmit }) => {
    const [name, setName] = useState(customer.name);
    const [email, setEmail] = useState(customer.email);
    const [contact, setContact] = useState(customer.contact);

    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedCustomer = {
        id: customer.id,
        name,
        email,
        contact
      };
      onSubmit(updatedCustomer);
    };

    return (
      <div className="center">
        <form onSubmit={handleSubmit}>
          <h1 id="head">Update Customer</h1>
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
      <h1>CUSTOMERS</h1>
      {loading ? ( // Show loader when loading is true
        <BeatLoader color="#F79B4F" size={20} className="loader" />
      ) : (
        <>
          {showTable && (
            <table className="table">
            <thead>
              <tr>
                <th>CustomerID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
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
                  <td>
                    <button className="delbtn" onClick={() => deleteCustomer(user.id)}>
                      <FaTrash className="delicon" />
                    </button>
                  </td>
                  <td>
                    <button
                      className="editbtn"
                      onClick={() => {
                        setSelectedCustomer(selectedCustomer === user ? null : user);
                        setShowTable(false);
                      }}
                    >
                      <FaEdit className="editicon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
          {selectedCustomer && (
            <EditCustomerForm
              customer={selectedCustomer}
              onSubmit={updateCustomer}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Managecustomers;
