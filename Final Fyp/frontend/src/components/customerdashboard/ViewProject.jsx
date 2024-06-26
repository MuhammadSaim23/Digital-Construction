import React, { useState, useEffect } from 'react';
import AuthUser from '../AuthUser';
// import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BeatLoader } from 'react-spinners';

const Viewproject = () => {
  const [projects, setProjects] = useState([]);
  const [customerid, setCustomerid] = useState('');
  const [userdetail, setUserdetail] = useState("");
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const { http } = AuthUser();

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.get("/customers/user-profile").then((res) => {
      setUserdetail(res.data);
      setCustomerid(userdetail.id);
      setCustomerid(res.data.id); // Update compid directly here
    });
  };

  useEffect(() => {
    fetchAllProjects();
  }, [customerid]); // Add compid to the dependency array to trigger the effect when it changes

  const fetchAllProjects = () => {
    http.get(`/builders/projectsdata`)
      .then((res) => {
        const filteredProjects = res.data.filter((project) => project.customer_id === customerid);
        setProjects(filteredProjects);
        setLoading(false); // Set loading to false when the data is fetched and set
      })
      .catch((error) => {
        console.error("Error fetching Projects:", error);
        setLoading(false); // Set loading to false even if there's an error
      });
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
              </tr>
            ))}
          </table>
        )}
        {/* <ToastContainer /> */}
      </div>
    </>
  );
};

export default Viewproject;
