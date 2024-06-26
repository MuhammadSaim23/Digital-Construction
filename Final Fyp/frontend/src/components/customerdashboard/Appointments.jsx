import React, { useState, useEffect } from 'react';
import AuthUser from '../AuthUser';
import https from '../../https';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BeatLoader } from 'react-spinners';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [customerid, setCustomerid] = useState('');
  const [userdetail, setUserdetail] = useState('');
  const [loading, setLoading] = useState(false);
  const { http } = AuthUser();

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.get('/customers/user-profile').then((res) => {
      setUserdetail(res.data);
      setCustomerid(res.data.id); // Update the customerid state directly from res.data.id
    });
  };

  useEffect(() => {
    if (customerid) {
      fetchAllAppointments();
    }
  }, [customerid]);

  const fetchAllAppointments = () => {
    setLoading(true);
    http
      .get(`/customers/appointments`)
      .then((res) => {
        const filteredAppointments = res.data.filter((appointment) => appointment.customer_id === customerid);
        setAppointments(filteredAppointments);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Appointments:', error);
        setLoading(false);
      });
  };
  
  const currentDate = new Date().toISOString().split('T')[0];
  
  const OrderProject = (id, status, description, builderid, appointmentData) => {
    if (status === 'Accepted') {
      const { duration } = appointmentData;
      
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + duration);
      
      const orderData = {
        appointmentId: id,
        appointmentData: appointmentData,
        description: description,
        customer_id: customerid,
        builder_id: builderid,
        startdate: currentDate,
        enddate: endDate.toISOString().split('T')[0], // Format enddate as ISO string
      };

      https
        .post('/customers/orderproject', orderData)
        .then((res) => {
          // Order placed successfully, handle the response if needed
          fetchAllAppointments();
          toast.success('Order placed successfully', {
            position: toast.POSITION.TOP_CENTER,
            });
          
        })
        .catch((error) => {
          // Handle the error if the order placement fails
          toast.error('Failed to place the order');
          console.error('Error placing the order:', error);
        });
    } 
    else if (status === 'Active') {
        toast.warning('Order has already been placed for this appointment', {
          position: toast.POSITION.TOP_CENTER,
          });
      }
      else if (status === 'pending') {
        toast.warning('Wait for the builder to approve!', {
          position: toast.POSITION.TOP_CENTER,
          });
      }
    else {
      toast.warning('Order can not be placed for Rejected Appointments', {
        position: toast.POSITION.TOP_CENTER,
        });
    }
  };

  return (
    <>
      <div className="order-table1">
        <h1>Requested Appointments</h1>
        {loading ? (
          <div className="loader-container">
            <BeatLoader color="#F79B4F" size={20} className="loader" />
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>CustomerID</th>
                <th>Project Description</th>
                <th>Duration</th>
                <th>Project Type</th>
                <th>Total Budget</th>
                <th>Status</th>
                <th>BuilderID</th>
                <th id="action">Order Now</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.customer_id}>
                  <td>{appointment.customer_id}</td>
                  <td>{appointment.description}</td>
                  <td>{appointment.duration} Days</td>
                  <td>{appointment.type}</td>
                  <td>{appointment.budget} Pkr</td>
                  <td>{appointment.status}</td>
                  <td>{appointment.builder_id}</td>
                  <td>
                    <button className="btn transparent1" onClick={() => OrderProject(appointment.id, appointment.status, appointment.description, appointment.builder_id, appointment)}>
                      Place
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default Appointments;
