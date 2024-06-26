import React, { useState } from 'react'
import './Signup.css';
import I3 from '../../images/6.svg'
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa'
import AuthUser from '../AuthUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupUI = () => {

  const navigate = useNavigate();
  const { http } = AuthUser();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [password, setPassword] = useState();

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputs((values) => ({ ...values, [name]: value }));

  };

  const submitForm = () => {

    if (inputs.position === "customer") {
      http.post('/customers/register', { email, password, name, contact })
        .then((response) => {
          // Display success message
          toast.success('Successfully Registered! You can login now.', {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((error) => {
          // Display error message
          toast.error('Error Occurred. Please try again.', {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
    else if (inputs.position === "builder") {
      http.post('/builders/register', { email: email, password: password, name: name, contact: contact }).then((res) => {
        toast.success('Successfully Registered! You can login now.', {
          position: toast.POSITION.TOP_CENTER,
        })
          .catch((error) => {
            toast.error('Error Occured. Please try again.', {
              position: toast.POSITION.TOP_CENTER,
            });
          });
      })
    }
    else if (inputs.position === "company") {
      http.post('/companies/register', { email: email, password: password, name: name, contact: contact }).then((res) => {
        toast.success('Successfully Registered! You can login now.', {
          position: toast.POSITION.TOP_CENTER,
        })
          .catch((error) => {
            toast.error('Error Occured. Please try again.', {
              position: toast.POSITION.TOP_CENTER,
            });
          });
      })
    }
    else if (inputs.position === "inspector") {
      http.post('/inspectors/register', { email: email, password: password, name: name, contact: contact }).then((res) => {
        toast.success('Successfully Registered! You can login now.', {
          position: toast.POSITION.TOP_CENTER,
        })
          .catch((error) => {
            toast.error('Error Occured. Please try again.', {
              position: toast.POSITION.TOP_CENTER,
            });
          });
      })
    }
    // else if(inputs.position === "admin"){
    //   http.post('/admins/register',{email:email,password:password,name:name,contact:contact}).then((res)=>{
    //     navigate('/signin')
    //   })
    // }
    else {
      navigate("/signup");
    }
  }

  return (
    <>
      <div className='Nav'>
        <div className='NavContainer'>
          <div className='NavLogo' to='/'><Link to='/'>Digital Construction</Link></div>
        </div>
      </div>
      <div className="containerX">
        <div className='forms-containerX'>
          <div className="signin-signupX">
            <form action="" className="sign-in-formX">
              <h2 className="title1X"><FaUserPlus /></h2>
              <h2 className="titleX">Registration</h2>
              <div className="input-fieldX">
                <i className="fas fa-userX"></i>
                <input type="email" name='name' placeholder="UserName" onChange={e => setName(e.target.value)} />
              </div>
              <div className="input-fieldX">
                <i className="fas fa-lockX"></i>
                <input type="email" name='contact' placeholder="Contact Number" onChange={e => setContact(e.target.value)} />
              </div>
              <div className="input-fieldX">
                <i className="fas fa-userX"></i>
                <input type="email" placeholder="Email" name='email' onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="input-fieldX">
                <i className="fas fa-lockX"></i>
                <input type="password" placeholder="Password" name='password' onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="form-group">
                <div className='display'>
                  <div className='radio-style'>
                    <input type="radio" id="customer" name="position" value="customer" checked={inputs.position === "customer"} onChange={handleChange} />
                    <label>Customer</label>
                    <input type="radio" id="builder" name="position" value="builder" checked={inputs.position === "builder"} onChange={handleChange} />
                    <label>Builder</label>
                    <input type="radio" id="company" name="position" value="company" checked={inputs.position === "company"} onChange={handleChange} />
                    <label>Company</label>
                    <input type="radio" id="inspector" name="position" value="inspector" checked={inputs.position === "inspector"} onChange={handleChange} />
                    <label>Inspector</label>
                    {/* <input type="radio" id="admin" name="position" value="admin" checked={inputs.position === "admin"} onChange={handleChange}  />
                    <label>Admin</label> */}
                  </div>
                </div>

              </div>

              {/* <Link to='/signin'><input type="submit" value="SUBMIT" className="btn solid" onClick={submitForm} /></Link> */}
              <button type="button" className="btn transparent1" onClick={submitForm}>
                {" "}
                Sign Up
              </button>

            </form>

          </div>
        </div>

        <div className='panels-containerX'>
          <div className="panel left-panelX">
            <div className="contentX">
              <h3>Already Have an Account?</h3>
              <p>Log in Now to access the system </p>
              <Link to='/signin'><button className="btn transparent" id="sign-up-btn">
                Login
              </button></Link>
            </div>
            <img src={I3} className="image" alt="technology" />
          </div>
        </div>
      </div>
      <ToastContainer />

    </>
  )
}

export default SignupUI