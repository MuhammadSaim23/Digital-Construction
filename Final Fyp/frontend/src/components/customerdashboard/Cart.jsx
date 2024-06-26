import React, { useState, useEffect } from 'react';
import AuthUser from '../AuthUser';
import https from '../../https';
import { FaTrash } from 'react-icons/fa';
import './Cart.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BeatLoader } from 'react-spinners';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const { http } = AuthUser();

  const [cusid, setCusid] = useState('');
  const [compid, setCompid] = useState('');
  const [cusname, setCusname] = useState('');
  const [userdetail, setUserdetail] = useState('');
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state

  const fetchUserDetail = () => {
    http.get('/customers/user-profile')
      .then((res) => {
        setUserdetail(res.data);
        setCusid(userdetail.id);
        setCusid(res.data.id); // Set cusid directly
        setCusname(res.data.name);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  useEffect(() => {
    if (cusid) {
      fetchAllProducts();
    }
  }, [cusid]);

  const fetchAllProducts = () => {
    setLoading(true); // Set loading to true
    http
      .get('/customers/cartsdata')
      .then((res) => {
        // Filter products based on customer ID
        const filteredProducts = res.data.filter((product) => product.customer_id === cusid);
        setProducts(filteredProducts);
        setCompid(filteredProducts.company_id);
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false); // Set loading to false
      });
  };

  const deletefromcart = (id) => {
    setLoading(true); // Set loading to true
    https
      .delete('/customers/cartsdata/' + id)
      .then((res) => {
        fetchAllProducts();
      })
      .catch((error) => {
        console.error('Error Deleting', error);
        setLoading(false); // Set loading to false
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const placeOrder = (event) => {
    event.preventDefault();

    if (products.length === 0) {
      console.error('Cart is empty. Cannot place an order.');
      return;
    }

    if (!cusid) {
      console.error('Customer ID is missing.');
      return;
    }

    const totalAmount = products.reduce((sum, product) => {
      return sum + product.price;
    }, 0);

    const currentDate = new Date().toISOString().split('T')[0];

    const orderData = {
      ...inputs,
      customer_id: cusid,
      name: cusname,
      total_amount: totalAmount,
      order_date: currentDate,
      companyid: compid,
    };

    setLoading(true); // Set loading to true
    https
      .post('/customers/orders', orderData)
      .then((res) => {
        // Display success message
        toast.success("Order Successfully Placed!", {
        position: toast.POSITION.TOP_CENTER,
        });
        fetchAllProducts();
        setLoading(false); // Set loading to false
        })
        .catch((error) => {
        // Display error message
        toast.error("Order Placing Failed!", {
        position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false); // Set loading to false
        });
        };
        
        return (
        <>
        <div className="order-table1">
        <h1>Cart</h1>
        {loading ? ( // Show loader when loading is true
        <BeatLoader color="#F79B4F" size={20} className="loader" />
        ) : (
          <>
        <table className="table">
        <thead>
        <tr>
        <th>Product ID</th>
        <th>Product Name</th>
        <th>Quantity</th>
        <th>Amount</th>
        <th id="del">Delete</th>
        </tr>
        </thead>
        <tbody>
        {products.map((pro) => (
        <tr key={pro.id}>
        <td>{pro.productid}</td>
        <td>{pro.productname}</td>
        <td>{pro.quantity}</td>
        <td>{pro.price}</td>
        <td>
        <button className="delbtn" onClick={() => { deletefromcart(pro.id) }}> <FaTrash className="delicon" /> </button>
        </td>
        </tr>
        ))}
        </tbody>
        </table>
        
        <div className="form-containery">
      <form>
        <input
          type="text"
          id="address"
          name="address"
          className="form-input"
          placeholder="Enter Your Address"
          size="50"
          value={inputs.address || ''}
          onChange={handleChange}
        />

        <div className="form-label">
          <label>Note: Cash On Delivery</label>
        </div>

        <input type="submit" value="Order" className="btn transparent" onClick={placeOrder} />
      </form>
    </div>
    </>
    )}
  </div>
  <ToastContainer />
</>

);
};

export default Cart;
