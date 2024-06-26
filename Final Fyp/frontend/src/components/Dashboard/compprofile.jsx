import React, {useState, useEffect} from 'react'
import AuthUser from '../AuthUser'
import './compprofile.css';

const Compprofile = () => {
    const [userdetail, setUserdetail] = useState("");
  const { http } = AuthUser();
  useEffect(() => {
    fetchUserDetail();
  }, []);
  const fetchUserDetail = () => {
    http.get("/companies/user-profile").then((res) => {
      setUserdetail(res.data);
    });
  };
  return (
    <div class="profile-container">
    <h1>Profile Information</h1>
    <div class="profile-item">
        <label>ID:</label>
        <span>{userdetail.id}</span>
    </div>
    <div class="profile-item">
        <label>Name:</label>
        <span>{userdetail.name}</span>
    </div>
    <div class="profile-item">
        <label>Email:</label>
        <span>{userdetail.email}</span>
    </div>
    <div class="profile-item">
        <label>Contact:</label>
        <span>{userdetail.contact}</span>
    </div>
</div>
  )
}

export default Compprofile