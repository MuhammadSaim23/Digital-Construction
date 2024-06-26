import React, { useState, useEffect } from 'react';
import AuthUser from '../AuthUser';
import https from '../../https';
import { BsCheck } from 'react-icons/bs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BeatLoader } from 'react-spinners';

const Viewproject = () => {
  const [projects, setProjects] = useState([]);
  const [builderid, setBuilderid] = useState('');
  const [userdetail, setUserdetail] = useState("");
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const { http } = AuthUser();

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.get("/builders/user-profile").then((res) => {
      setUserdetail(res.data);
      setBuilderid(userdetail.id);
      setBuilderid(res.data.id); // Update compid directly here
    });
  };

  useEffect(() => {
    fetchAllProjects();
  }, [builderid]); // Add compid to the dependency array to trigger the effect when it changes

  const fetchAllProjects = () => {
    http.get(`/builders/projectsdata`)
      .then((res) => {
        const filteredProjects = res.data.filter((project) => project.builder_id === builderid);
        setProjects(filteredProjects);
        setLoading(false); // Set loading to false when the data is fetched and set
      })
      .catch((error) => {
        console.error("Error fetching Projects:", error);
        setLoading(false); // Set loading to false even if there's an error
      });
  };

  const markProject = (id) => {
    const project = projects.find((project) => project.id === id); // Find the order with the given id
    if (project.status === 'Completed') {
      // Order is already delivered, display error message
      toast.warning('Project Already Completed!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      https
        .post('/builders/projectsmarked/' + id)
        .then((res) => {
          // Display success message
          toast.success('Project Marked as Completed!', {
            position: toast.POSITION.TOP_CENTER,
          });
          fetchAllProjects();
        })
        .catch((error) => {
          // Display error message
          toast.error('Error marking Project as Completed!', {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  };

  return (
    <>
      <div className="order-table1">
        <h1>My Projects</h1>
        {loading ? ( // Show loader when loading is true
          <BeatLoader color="#F79B4F" size={20} className="loader" />
        ) : (
          <table>
            <tr>
              <th>ID</th>
              <th>Start Date</th>
              <th>Deadline</th>
              <th>Description</th>
              <th>CustomerID</th>
              <th>BuilderID</th>
              <th>Status</th>
              <th id='action'>Mark Project</th>
            </tr>

            {projects.map((project) => (
              <tr key={project.customer_id}>
                <td>{project.id}</td>
                <td>{project.startdate}</td>
                <td>{project.enddate}</td>
                <td>{project.description}</td>
                <td>{project.customer_id}</td>
                <td>{project.builder_id}</td>
                <td>{project.status}</td>
                <td>
                  <button className="acceptbtn" onClick={() => { markProject(project.id) }}> <BsCheck className="accepticon" /> Finish </button>
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

export default Viewproject;
