import { useState } from "react";
import { toast } from 'react-hot-toast';
import axios from 'axios';

export function Addfood() {
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [foodDes, setFoodDes] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem("token2");

  const handleLogin1 = async (event1) => {
    event1.preventDefault();

    if (foodPrice < 0) {
      toast.error('Price cannot be negative');
      setError('Price cannot be negative');
      return;
    }

    const payload1 = {
      foodName,
      foodDes,
      foodPrice: parseFloat(foodPrice),
      foodImg: "https://media.istockphoto.com/id/1191080960/photo/traditional-turkish-breakfast-and-people-taking-various-food-wide-composition.jpg?s=612x612&w=0&k=20&c=PP5ejMisEwzcLWrNmJ8iPPm_u-4P6rOWHEDpBPL2n7Q="
    };

    console.log("Payload:", payload1);

    try {
      const response1 = await axios.post("http://localhost:3000/api/v1/food/about", payload1, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response1.status === 200) {
        toast.success('Food added successfully');
        setFoodDes('');
        setFoodName('');
        setFoodPrice('');
        setError(null);
      } else {
        toast.error(response1.data.error || 'Unable to add food');
        setError(response1.data.error || 'Unable to add food');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred, please try again later');
      setError('An error occurred, please try again later');
    }
  };

  return (
    <>
      <h2 style={{ display: "flex", justifyContent: "center" }}>ADD FOOD</h2><br></br><br></br>
      <div style={{ textAlign: "center" }}>
        <form onSubmit={handleLogin1}>
          {error && <div style={{ color: 'red' }}>Error: {error}</div>}
          <div style={{ margin: "20px" }}>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              style={{
                height: "30px",
                width: "300px",
                borderRadius: "5px",
                fontSize: "20px"
              }}
              placeholder='     Food Name'
              required
            /><br />
          </div>
          <div style={{ margin: "20px" }}>
            <input
              type="text"
              value={foodDes}
              onChange={(e) => setFoodDes(e.target.value)}
              style={{
                height: "30px",
                width: "300px",
                borderRadius: "5px",
                fontSize: "20px"
              }}
              placeholder='     Food Description'
              required
            /><br />
          </div>
          <div style={{ margin: "20px" }}>
            <input
              type="number"
              value={foodPrice}
              onChange={(e) => setFoodPrice(e.target.value)}
              style={{
                height: "30px",
                width: "300px",
                borderRadius: "5px",
                fontSize: "20px"
              }}
              placeholder='     Food Price'
              required
            /><br />
          </div>
          <div style={{ margin: "20px" }}>
            <button
              style={{
                backgroundColor: "#2781e7",
                height: "40px",
                width: "200px",
                borderRadius: "5px",
                margin: "18px",
                fontSize: "20px",
                borderColor: "#6699CC",
                color: "white"
              }}
            >ADD</button>
          </div>
        </form>
      </div>
    </>
  );
}
  