import { useState, useEffect } from 'react';
import './Productlist.css';
import https from '../../https';
import AuthUser from '../AuthUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Productlist = () => {
  const { http } = AuthUser();
  const [compid, setCompid] = useState('');
  const [inputs, setInputs] = useState({});

  const [userdetail, setUserdetail] = useState('');

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.get('/companies/user-profile').then((res) => {
      setUserdetail(res.data);
      setCompid(userdetail.id);
      setCompid(res.data.id); // Set compid after receiving userdetail
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    
    const updatedInputs = {
      ...inputs,
      company_id: compid,
    };
    
    if (!compid) {
      console.error("Company ID is missing.");
      return;
    }

    https
      .post('/companies/products', updatedInputs)
      .then((res) => {
         // Display success message
         toast.success('Product Added Successfully!', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        // Display error message
        toast.error('Product Listing Failed!', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };


  return (
    <>
    <div className="order-table1">
        <h1>Add Details to List New Product</h1>
        </div>
    <div className="center">
      <form>
        <div className="form-group22">
          <label>Product Name</label>
          <input
            type="text"
            id="productname"
            name="productname"
            value={inputs.productname || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group22">
          <label>Product Details</label>
          <textarea
            id="productdetails"
            name="description"
            rows="4"
            cols="50"
            value={inputs.description || ''}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group22">
          <label>Product Price</label>
          <input
            type="number"
            id="productprice"
            name="price"
            value={inputs.price || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group22">
          <label>CompanyName</label>
          <input
            type="text"
            id="companyname"
            name="companyname"
            value={inputs.companyname || ''}
            onChange={handleChange}
          />
        </div>

        <div className="flex-parent1">
          <input type="reset" value="Reset" className="resetbutton1" />
          <input
            type="submit"
            value="Submit"
            onClick={submitForm}
            className="submitbutton1"
          />
        </div>
        <ToastContainer />
      </form>
      
    </div>
    </>
  );
};

export default Productlist;
