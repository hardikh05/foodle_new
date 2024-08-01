import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Orders() {
    const [orderData, setorderData] = useState({});

    const fetchMyOrder = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.post("http://localhost:3000/api/v1/food/myOrderData", {}, { headers });

            setorderData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    {orderData && orderData.orderData && orderData.orderData.order_data ? (
                        orderData.orderData.order_data.slice(0).reverse().map((item) => {
                            return (
                                item.map((arrayData) => {
                                    return (
                                        <div style={{ margin: '20px' }}>
                                            {arrayData.Order_date ? (
                                                <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                                                    Order Date: {arrayData.Order_date}
                                                    <hr />
                                                </div>
                                            ) : (
                                                <div style={{ display: 'inline-block', width: '30%', margin: '10px' }}>
                                                    <div className="card" style={{ width: "16rem", maxHeight: "360px" }}>
                                                        <div className="card-body">
                                                            <h5 className="card-title" style={{ fontSize: '16px' }}>{arrayData.name}</h5>
                                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                <span style={{ marginRight: '10px' }}>{arrayData.qty}</span>
                                                                <span style={{ marginRight: '10px' }}>{arrayData.size}</span>
                                                                <div style={{ display: 'inline-block', fontSize: '18px', fontWeight: 'bold' }}>
                                                                    ₹{arrayData.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            );
                        })
                    ) : (
                        <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', margin: '20px' }}>
                            {orderData ? 'No orders found!' : 'Loading...'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}