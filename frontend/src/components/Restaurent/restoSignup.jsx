import React, { useState } from 'react';
import { toast } from 'react-hot-toast'

export function RestoSign() {
  const [nameu, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [locs, setLocation] = useState('');
  const[descr,setDes]=useState('')
  const [error, setError] = useState(null);


  const handleSignUp = async (event) => {
    event.preventDefault();
    const payload = {
      nameu,
      password,
      email,
      locs,
      descr,
      imgs:"https://as1.ftcdn.net/v2/jpg/02/06/04/70/1000_F_206047084_OxZGQ404N8rocQmItLIQRMRWlQwV3mSH.jpg"
    };

    console.log('Sending payload:');

    try {
      const response = await fetch("http://localhost:3000/api/v1/restoadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });


      if (!response.ok) {

        const errorData = await response.json();
        console.error('Error response data:', errorData);
        toast.error(errorData.error || 'Sign up failed');
        setError(errorData.error || 'Sign up failed');
        return;
      }

      else {
        const data = await response.json();
        console.log('Sign up successful:', data);
        toast.success('Sign up successful you can now login');
        setName('');
        setPassword('');
        setEmail('');
        setLocation('');
        setDes('');
        setError(null);
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred please try again later');
      setError('An error occurred please try again later');
      return;
    }
  };

  return (
    <div style={{ textAlign: "center" }}><form onSubmit={handleSignUp}>
      <h2>Sign Up</h2><br></br><br></br>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      <div style={{ margin: "20px" }}> <input type="text" value={nameu} onChange={(e) => setName(e.target.value)} style={{ height: "30px", width: "300px", borderRadius: "5px", fontSize: "20px" }} placeholder='   Resto Name' required></input><br /></div>
      <div style={{ margin: "20px" }}> <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ height: "30px", width: "300px", borderRadius: "5px", fontSize: "20px" }} placeholder='    Password' required ></input><br /></div>
      <div style={{ margin: "20px" }}> <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ height: "30px", width: "300px", borderRadius: "5px", fontSize: "20px" }} placeholder='     Email' required></input><br /></div>
      <div style={{ margin: "20px" }}> <input type="text" value={locs} onChange={(e) => setLocation(e.target.value)} style={{ height: "30px", width: "300px", borderRadius: "5px", fontSize: "20px" }} placeholder='    Location' required ></input><br /></div>
      <div style={{ margin: "20px" }}> <input type="text" value={descr} onChange={(e) => setDes(e.target.value)} style={{ height: "30px", width: "300px", borderRadius: "5px", fontSize: "20px" }} placeholder='    Description' required ></input><br /></div>

      <div style={{ margin: "20px" }}><button style={{ backgroundColor: "#2781e7", height: "40px", width: "200px", borderRadius: "5px", margin: "18px", fontSize: "20px", borderColor: "#6699CC", color: "white" }}  >Sign Up</button>
      </div></form></div>
  );
}
