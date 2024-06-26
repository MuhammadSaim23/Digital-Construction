import React, { useState, useEffect } from 'react';
import AuthUser from '../AuthUser';
import https from '../../https';
import { BsCheck } from 'react-icons/bs';
import './Orders.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BeatLoader } from 'react-spinners';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [compid, setCompid] = useState('');
  const [userdetail, setUserdetail] = useState("");
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const { http } = AuthUser();

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.get("/companies/user-profile").then((res) => {
      setUserdetail(res.data);
      setCompid(res.data.id); // Update compid directly here
    });
  };

  useEffect(() => {
    fetchAllOrders();
  }, [compid]); // Add compid to the dependency array to trigger the effect when it changes

  const fetchAllOrders = () => {
    http.get(`/customers/ordersdata`)
      .then((res) => {
        const filteredOrders = res.data.filter((order) => order.company_id === compid);
        setOrders(filteredOrders);
        setLoading(false); // Set loading to false when the data is fetched and set
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false); // Set loading to false even if there's an error
      });
  };

  const markOrder = (id) => {
    const order = orders.find((order) => order.id === id); // Find the order with the given id
    if (order.status === 'Delivered') {
      // Order is already delivered, display error message
      toast.error('Order Already Delivered!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      https
        .post('/companies/ordersmarked/' + id)
        .then((res) => {
          // Display success message
          toast.success('Order Marked as Delivered!', {
            position: toast.POSITION.TOP_CENTER,
          });
          fetchAllOrders();
        })
        .catch((error) => {
          // Display error message
          toast.error('Error marking order as delivered!', {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  };

  return (
    <>
      <div className="order-table1">
        <h1>ORDERS</h1>
        {loading ? ( // Show loader when loading is true
          <BeatLoader color="#F79B4F" size={20} className="loader" />
        ) : (
          <table>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Product Names</th>
              <th>Quantities</th>
              <th>OrderDate</th>
              <th>Total Bill</th>
              <th>Status</th>
              <th id='action'>Mark Order</th>
            </tr>

            {orders.map((order) => (
              <tr key={order.customer_id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.address}</td>
                <td>{order.productnames}</td>
                <td>{order.quantities}</td>
                <td>{order.orderdate}</td>
                <td>{order.totalbill}</td>
                <td>{order.status}</td>
                <td>
                  <button className="acceptbtn" onClick={() => { markOrder(order.id) }}> <BsCheck className="accepticon" /> Deliver </button>
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

export default Orders;
