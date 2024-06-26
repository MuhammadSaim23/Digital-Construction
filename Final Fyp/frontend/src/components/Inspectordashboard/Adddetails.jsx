import React, { useState, useEffect } from 'react';
import https from '../../https';
import AuthUser from '../AuthUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Adddetails = () => {
  const { http } = AuthUser();
  const [inspectorid, setInspectorid] = useState('');
  const [inputs, setInputs] = useState({});
  const [userdetail, setUserdetail] = useState('');

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.get('/inspectors/user-profile').then((res) => {
      setUserdetail(res.data);
      setInspectorid(userdetail.id);
      setInspectorid(res.data.id); // Set compid after receiving userdetail
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const submitForm = (event) => {
    event.preventDefault();

    // Check if any of the required fields are empty
    if (!inputs.experience || !inputs.experties || !inputs.pecliscence) {
      toast.error('Please fill in all the required fields.', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    
    const updatedInputs = {
      ...inputs,
      inspector_id: inspectorid,
    };
    
    if (!inspectorid) {
      console.error("Inspector ID is missing.");
      return;
    }

    https
      .post('/inspectors/inspectordetails', updatedInputs)
      .then((res) => {
        // Display success message
        toast.success('Profile Updated Successfully!', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        // Display error message
        toast.error('Error Occurred! Please try Again.', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
    return (
        
        <div className="center"> 
         <h1 id='head1'>Details</h1> <br />
         <form action="" method="" > 
          <label>Experience In years</label> <br/>
          <input type='number' id="experience" name="experience" className='line' value={inputs.experience || ''} onChange={handleChange}/> <br/><br/>

          <label>Experties</label> <br/>
          <textarea id="experties" name="experties" rows="4" cols="50" className='details' value={inputs.experties || ''} onChange={handleChange}/> <br/> <br/>

          <label>Enter Pec Lisence Number </label> <br/>
          <input type='text' id="lecno" name="pecliscence" className='line' value={inputs.pecliscence || ''} onChange={handleChange}/> <br/><br/>
          
          <div className="flex-parent1">
          <input type="submit" value="Add" className='submitbutton' onClick={submitForm}/> <br/> 
          </div>

          </form>
          <ToastContainer />

        </div>
    )
       
}
export default Adddetails