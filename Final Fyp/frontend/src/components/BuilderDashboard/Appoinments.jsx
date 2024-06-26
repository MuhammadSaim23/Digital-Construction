import React, { useState, useEffect } from 'react';
import AuthUser from '../AuthUser';
import https from '../../https';
import { BsCheck } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BeatLoader } from 'react-spinners';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [builderid, setBuilderid] = useState('');
  const [userdetail, setUserdetail] = useState('');
  const [loading, setLoading] = useState(true); // Added loading state
  const { http } = AuthUser();

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.get('/builders/user-profile').then((res) => {
      setUserdetail(res.data);
      setBuilderid(userdetail.id);
      setBuilderid(res.data.id);
    });
  };

  useEffect(() => {
    fetchAllAppointments();
  }, [builderid]);

  const fetchAllAppointments = () => {
    setLoading(true); // Set loading state to true before fetching appointments
    http
      .get('/builders/appointments')
      .then((res) => {
        const filteredAppointments = res.data.filter(
          (appointment) => appointment.builder_id === builderid
        );
        setAppointments(filteredAppointments);
        setLoading(false); // Set loading state to false after fetching appointments
      })
      .catch((error) => {
        console.error('Error fetching Appointments:', error);
        setLoading(false); // Set loading state to false in case of an error
      });
  };

  const AppointmentAction = (id, status) => {
    const appointment = appointments.find((appointment) => appointment.id === id);
    if (appointment.status === 'Accepted' || appointment.status === 'Rejected' || appointment.status === 'Active') {
      toast.error('Appointment Already Marked!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      https
        .post('/builders/appointmentresponse/' + id, { status })
        .then((res) => {
          toast.success(`Appointment ${status}!`, {
            position: toast.POSITION.TOP_CENTER,
          });
          fetchAllAppointments();
        })
        .catch((error) => {
          toast.error('Error occurred while updating appointment!', {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  };

  return (
    <>
      <div className="order-table1">
        <h1>Requested Appointments</h1>
        {loading ? ( // Display loader while loading is true
          <BeatLoader color="#F79B4F" size={20} className="loader" />
        ) : (
          <table>
            <tr>
              <th>CustomerID</th>
              <th>Project Description</th>
              <th>Duration</th>
              <th>Project Type</th>
              <th>Total Budget</th>
              <th>Status</th>
              <th id="action">Accept</th>
              <th id="action">Reject</th>
            </tr>

            {appointments.map((appointment) => (
              <tr key={appointment.customer_id}>
                <td>{appointment.customer_id}</td>
                <td>{appointment.description}</td>
                <td>{appointment.duration} Days</td>
                <td>{appointment.type}</td>
                <td>{appointment.budget} Pkr</td>
                <td>{appointment.status}</td>
                <td>
                  <button
                    className="acceptbtn"
                    onClick={() => {
                      AppointmentAction(appointment.id, 'Accepted');
                    }}
                  >
                    <BsCheck className="accepticon" /> Accept
                  </button>
                </td>
                <td>
                  <button
                    className="rejectbtn"
                    onClick={() => {
                      AppointmentAction(appointment.id, 'Rejected');
                    }}
                  >
                    <FaTimes className="rejecticon" /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </table>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default Appointments;
