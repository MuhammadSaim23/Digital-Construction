import React, { useState, useEffect } from 'react';
import AuthUser from '../AuthUser';
import https from '../../https';
import './Viewproducts.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BeatLoader } from 'react-spinners';

const Viewproducts = () => {
  const [products, setProducts] = useState([]);
  const [compid, setCompid] = useState('');
  const [userdetail, setUserdetail] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const { http } = AuthUser();

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.get("/companies/user-profile").then((res) => {
      setUserdetail(res.data);
      setCompid(userdetail.id);
      setCompid(res.data.id); // Update compid directly here
    });
  };

  useEffect(() => {
    fetchAllProducts();
  }, [compid]); // Add compid to the dependency array to trigger the effect when it changes

  const fetchAllProducts = () => {
    setLoading(true); // Set loading to true
    http.get(`/customers/productsdata`)
      .then((res) => {
        const filteredProducts = res.data.filter((product) => product.company_id === compid);
        setProducts(filteredProducts);
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false); // Set loading to false
      });
  };

  const deletefromlist = (id) => {
    https
      .delete('/companies/productsdata/'+id)
      .then((res) => {
          // Display success message
          toast.success('Product Deleted Successfully!', {
            position: toast.POSITION.TOP_CENTER,
          });
          fetchAllProducts();
        })
        .catch((error) => {
          // Display error message
          toast.error('Product Deletion Failed!', {
            position: toast.POSITION.TOP_CENTER,
          });
        });
  };

  return (
    <div className="order-tableLong">
      <div className="order-table1">
        <h1>My Listed Products</h1>
        </div>
      {loading ? ( // Show loader when loading is true
        <BeatLoader color="#F79B4F" size={20} className="loader" />
      ) : (
        <div className="card-container">
          {products.map((product, index) => (
            <div className="card" key={index}>
              <h3>{product.productname}</h3>
              <p>
                <b>Description:</b> {product.description}
              </p>
              <p>
                <b>Price:</b> {product.price} Rs
              </p>
              <p>
                <b>Product by:</b> {product.companyname}
              </p>
              <button className="del-btn" onClick={() => { deletefromlist(product.id) }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Viewproducts;
