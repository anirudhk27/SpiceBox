import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});

    // Fetch order data
    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        await fetch("http://localhost:5000/api/MyOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail'),
            }),
        })
            .then(async (res) => {
                const response = await res.json();
                console.log('Fetched response:', response); // Log to check the structure
                setOrderData(response);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />

            <div className='container'>
                <div className='row'>
                    {/* Check if orderData and orderData.order_data exist */}
                    {orderData?.orderData?.order_data?.length > 0 ? (
                        // Loop through each item in order_data
                        orderData.orderData.order_data.map((item, index) => {
                            // Handle case where the item is an order date
                            if (item.Order_date) {
                                return (
                                    <div key={index}>
                                        {/* Display the order date */}
                                        <div className="m-auto mt-5">
                                            <h4>{item.Order_date}</h4>
                                            <hr />
                                        </div>
                                    </div>
                                );
                            }

                            // Handle case where the item is a food item
                            return (
                                <div key={index} className='col-12 col-md-6 col-lg-3'>
                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                        <img
                                            src={item.img || "default_image_url"} // Handle missing img
                                            className="card-img-top"
                                            alt={item.name}
                                            style={{ height: "120px", objectFit: "fill" }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                <span className='m-1'>{item.qty}</span>
                                                <span className='m-1'>{item.size}</span>
                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                    ₹{item.price}/-
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No orders available.</p> // Fallback message if no order data
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
