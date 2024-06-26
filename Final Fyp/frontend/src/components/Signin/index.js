import './LoginUi.css';
import Img from '../../images/8.svg';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import AuthUser from '../AuthUser';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LoginUi() {
  const { http, setToken } = AuthUser();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitForm = () => {
    if (inputs.position === 'customer') {
      http
        .post('/customers/login', { email: email, password: password })
        .then((res) => {
          setToken(res.data.user, res.data.access_token);
          navigate('/customerdashboard');
        })
        .catch((error) => {
          toast.error('Invalid Email or Password. Please try again.', {
          position: toast.POSITION.TOP_CENTER,});
        });
    } else if (inputs.position === 'builder') {
      http
        .post('/builders/login', { email: email, password: password })
        .then((res) => {
          setToken(res.data.user, res.data.access_token);
          navigate('/builderdashboard');
        })
        .catch((error) => {
          toast.error('Invalid Email or Password. Please try again.', {
          position: toast.POSITION.TOP_CENTER,});
        });
    } else if (inputs.position === 'company') {
      http
        .post('/companies/login', { email: email, password: password })
        .then((res) => {
          setToken(res.data.user, res.data.access_token);
          navigate('/Companydashboard');
        })
        .catch((error) => {
          toast.error(error, {
          position: toast.POSITION.TOP_CENTER,});
        });
    } else if (inputs.position === 'inspector') {
      http
        .post('/inspectors/login', { email: email, password: password })
        .then((res) => {
          setToken(res.data.user, res.data.access_token);
          navigate('/inspectordashboard');
        })
        .catch((error) => {
          toast.error('Invalid Email or Password. Please try again.', {
          position: toast.POSITION.TOP_CENTER,});
        });
    } else if (inputs.position === 'admin') {
      http
        .post('/admins/login', { email: email, password: password })
        .then((res) => {
          setToken(res.data.user, res.data.access_token);
          navigate('/admindashboard');
        })
        .catch((error) => {
          toast.error('Invalid Email or Password. Please try again.', {
          position: toast.POSITION.TOP_CENTER,});
        });
    } else {
      navigate('/signin');
    }
  };

  return (
    <>
      <div className='Nav'>
        <div className='NavContainer'>
          <div className='NavLogo' to='/'>
            <Link to='/'>Digital Construction</Link>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='forms-container'>
          <div className='signin-signup'>
            <form action='' className='sign-in-form'>
              <h2 className='title1'>
                <FaUser />
              </h2>
              <h2 className='title'>Sign in</h2>
              <div className='input-field'>
                <i className='fas fa-user'></i>
                <input
                  type='email'
                  placeholder='Email'
                  id='email'
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='input-field'>
                <i className='fas fa-lock'></i>
                <input
                  type='password'
                  placeholder='Password'
                  id='pass'
                  name='password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <div className='display'>
                  <div className='radio-style1'>
                    <input
                      type='radio'
                      id='customer'
                      name='position'
                      value='customer'
                      checked={inputs.position === 'customer'}
                      onChange={handleChange}
                    />
                    <label>Customer</label>
                    <input
                      type='radio'
                      id='builder'
                      name='position'
                      value='builder'
                      checked={inputs.position === 'builder'}
                      onChange={handleChange}
                    />
                    <label>Builder</label>
                    <input
                      type='radio'
                      id='company'
                      name='position'
                      value='company'
                      checked={inputs.position === 'company'}
                      onChange={handleChange}
                    />
                    <label>Company</label>
                    <input
                      type='radio'
                      id='inspector'
                      name='position'
                      value='inspector'
                      checked={inputs.position === 'inspector'}
                      onChange={handleChange}
                    />
                    <label>Inspector</label>
                    <input
                      type='radio'
                      id='admin'
                      name='position'
                      value='admin'
                      checked={inputs.position === 'admin'}
                      onChange={handleChange}
                    />
                    <label>Admin</label>
                  </div>
                </div>
              </div>
              <button
                type='button'
                className='btn solid'
                onClick={submitForm}
              >
                Login
              </button>
            </form>
          </div>
        </div>
            <div className='panels-container'>
      <div className='panel left-panel'>
        <div className='content1'>
          <h3>New to our Platform?</h3>
          <p>Register Now and Get Started with our Platform</p>
          <Link to='/signup'>
            <button className='btn transparent1' id='sign-up-btn'>
              Sign Up
            </button>
          </Link>
        </div>
        <img src={Img} className='image' alt='technology' />
      </div>
    </div>
  </div>

  <ToastContainer />
</>
);
}

export default LoginUi;
