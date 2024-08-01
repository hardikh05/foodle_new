import { useMemo } from 'react';
import { useCart, useDispatchCart } from './contextReducer';
import axios from 'axios';
import toast from 'react-hot-toast';

export function Cart() {

  const dispatch1 = useDispatchCart();
  const data = useCart()

  const handleCheckOut = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: "Bearer " + token
        }
      };
      const response = await axios.post('http://localhost:3000/api/v1/food/Order', {
        order_data: data, // <--- order_data is being sent here
        date: new Date().toDateString()
      }, config);
      if (response.status === 200) {
        dispatch1({ type: "DROP" });
        toast.success("Order Successful")
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotal = useMemo(() => {
    let total = 0;
    data.forEach((item) => {
      total += item.price;
    });
    return total;
  }, [data]);

  if (data.length === 0) {
    return (
      <div>
        <h1 style={{ display: "flex", justifyContent: "center" }}>The Cart is Empty!</h1>
      </div>
    )
  }
  return (<><div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
    <table >
      <thead>
        <tr >
          <th style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: "10px", textAlign: 'center', paddingBottom: "20px" }}>SrNo</th>
          <th style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: "10px", textAlign: 'center', paddingBottom: "20px" }}>Food</th>
          <th style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: "10px", textAlign: 'center', paddingBottom: "20px" }}>qty</th>
          <th style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: "10px", textAlign: 'center', paddingBottom: "20px" }}>price</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (

          <tr key={index}>
            <td style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: "10px", textAlign: 'center' }}>{index + 1}</td>
            <td style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: "10px", textAlign: 'center' }}>{item.name}</td>
            <td style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: "10px", textAlign: 'center' }}>{item.qty}</td>
            <td style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: "10px", textAlign: 'center' }}>₹{item.price}</td>
            <td style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: "10px", textAlign: 'center' }}><button style={{ backgroundColor: "#2781e7", width: "50px", height: "30px", borderRadius: "3px" }} onClick={() => { dispatch1({ type: "REMOVE", index: index }) }}>Delete</button></td>
          </tr>
        ))}
      </tbody>

    </table>
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <h3>Total: ₹{calculateTotal}</h3>
    </div>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button style={{ backgroundColor: "#2781e7", borderRadius: "5px", width: "400px", height: "40px", textAlign: "center" }} onClick={handleCheckOut}>Order</button>
    </div></div>
  </>
  );
}