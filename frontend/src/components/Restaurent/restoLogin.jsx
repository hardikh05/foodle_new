import { useState } from "react";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";




export function Email() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin1 = async (event1) => {
    event1.preventDefault();
    const payload1 = {
      email, password
    };
    console.log("sending");
    try {
      const response1 = await fetch("http://localhost:3000/api/v1/restLog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload1)
      });

      if (response1.ok) {
        const data1 = await response1.json();
        localStorage.setItem("token2", data1.token);
        console.log('login successful:');
        toast.success('login successful');
        setPassword('');
        setEmail('');
        setError(null);
        navigate("/resto")
      } else {
        const err = await response1.json();
        console.error('Error response data:', err);
        toast.error(err.error || 'login failed');
        setError(err.error || 'login failed');
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred please try again later');
      setError('An error occurred please try again later');
      return;
    }


  };


  return (<>
    <h2 style={{display:"flex",justifyContent:"center"}}>LogIn</h2>
  <div style={{ textAlign: "center" }}><form onSubmit={handleLogin1}>
    {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    <div style={{ margin: "20px" }}> <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ height: "30px", width: "300px", borderRadius: "5px", fontSize: "20px" }} placeholder='     Email' required  ></input><br /></div>
    <div style={{ margin: "20px" }}> <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ height: "30px", width: "300px", borderRadius: "5px", fontSize: "20px" }} placeholder='    Password' required  ></input><br /></div>
    <div style={{ margin: "20px" }}><button style={{ backgroundColor: "#2781e7", height: "40px", width: "200px", borderRadius: "5px", margin: "18px", fontSize: "20px", borderColor: "#6699CC", fontWeight: "", color: "white" }}  >Log In</button>
    </div></form>
  </div>
  </> );
}
