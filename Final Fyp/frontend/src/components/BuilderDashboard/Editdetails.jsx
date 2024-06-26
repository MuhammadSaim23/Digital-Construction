import { useState, useEffect } from 'react';
import './Editdetails.css';
import https from '../../https';
import AuthUser from '../AuthUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Editdetails = () => {
  const { http } = AuthUser();
  const [builderid, setBuilderid] = useState('');
  const [inputs, setInputs] = useState({});
  const [userdetail, setUserdetail] = useState('');

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.get('/builders/user-profile').then((res) => {
      setUserdetail(res.data);
      setBuilderid(userdetail.id);
      setBuilderid(res.data.id); // Set compid after receiving userdetail
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const submitForm = (event) => {
    event.preventDefault();
  
    // Check if any of the required fields are empty
    if (!inputs.experience || !inputs.expertise || !inputs.FBR) {
      toast.error('Please fill in all the required fields.', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
  
    const updatedInputs = {
      ...inputs,
      builder_id: builderid,
    };
  
    if (!builderid) {
      console.error("Builder ID is missing.");
      return;
    }
  
    https
      .post('/builders/builderdetails', updatedInputs)
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
         <div className="order-table1">
        <h1>Add Professional Details</h1>
        </div>
         <form action="" method="" > 
          <label>Experience In years</label> <br/>
          <input type='number' id="experience" name="experience" className='line' value={inputs.experience || ''} onChange={handleChange}/> <br/><br/>

          <label>Experties</label> <br/>
          <textarea id="expertise" name="expertise" rows="4" cols="50" className='details' value={inputs.expertise || ''} onChange={handleChange}/> <br/> <br/>
          
          <label>FBR License Number</label> <br/>
          <input type='number' id="FBR" name="FBR" className='line' value={inputs.FBR || ''} onChange={handleChange}/> <br/> <br/>

          <div class="flex-parent1">
          <input type="submit" value="Submit" class="submitbutton1" onClick={submitForm} />
        </div>
        
          </form>

          <ToastContainer />
        </div>
    )
       
}
export default Editdetails