import React, { useState, useEffect } from "react";
import './Shopping.css';
import AuthUser from "../AuthUser";
import https from "../../https";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader from "react-spinners/BeatLoader";

const Shopping = () => {
  const [products, setProducts] = useState([]);
  const [userdetail, setUserdetail] = useState("");
  const [cusid, setCusid] = useState('');
  const [quantities, setQuantities] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const { http } = AuthUser();

  const fetchUserDetail = () => {
    http.get("/customers/user-profile")
      .then((res) => {
        setUserdetail(res.data);
        setCusid(userdetail.id);
        setCusid(res.data.id);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = () => {
    setIsLoading(true); // Start loading
    http.get('/customers/productsdata')
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false); // Stop loading in case of error
      });
  };

  const handleChange = (event, productId) => {
    const value = parseInt(event.target.value);
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: value >= 1 ? value : 1
    }));
  };

  const AddtoCart = (event, product) => {
    event.preventDefault();
    const quantity = quantities[product.id] || 1;

    const data = {
      productid: product.id,
      productname: product.productname,
      price: product.price * quantity,
      customerId: cusid,
      companyid:  product.company_id,
      quantity: quantity
    };

    https
      .post('/customers/carts', data)
      .then((res) => {
        // Display success message
        toast.success('Product Added to Cart!', {
         position: toast.POSITION.TOP_CENTER,
       });
     })
     .catch((error) => {
       // Display error message
       toast.error('Product Purchasing Failed!', {
         position: toast.POSITION.TOP_CENTER,
       });
     });
  };

  return (
    <div className="order-tableLong">
      <div className="order-table1">
        <h1>Products List</h1>
        </div>
      {isLoading ? ( // Display spinner while loading
        <BeatLoader color="#F79B4F" size={20} className="loader" />
      ) : (
      <div className="card-container">
        {products.map((product, index) => (
          <div className="card" key={index}>
            <h3>{product.productname}</h3>
            <p><b>Description:</b> {product.description}</p>
            <p><b>Price:</b> {product.price} Rs</p>
            <p><b>Product by:</b> {product.companyname}</p>
            <input
              type="number"
              id={`productquantity-${product.id}`}
              name={`quantity-${product.id}`}
              placeholder="Enter Quantity"
              value={quantities[product.id] || ''}
              onChange={(event) => handleChange(event, product.id)}
              min={1}
            />
            <button type="button" className="btnaddtocart" onClick={(event) => AddtoCart(event, product)}>
              Add to Cart 
            </button>
            
          </div>
        ))}
      </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Shopping;
