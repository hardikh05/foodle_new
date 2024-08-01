import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";



export function Log() {

  const [login, setlogin] = useState('email');


  return (


    <div style={{ textAlign: "center" }}>
      <h2><Link to='/abc' style={{ textDecoration: "none", color: "black" }}>LogIn</Link></h2>
      <div style={{ display: "flex", flexDirection: "row", padding: "20px", paddingTop: "50px" }}>
        <button style={{ width: "220px", height: "40px", backgroundColor: "#2781e7", borderRadius: "5px", borderColor: "#6699CC", fontSize: "20px" }} onClick={() => setlogin('email')}>Login through Email</button>
        <button style={{ width: "220px", height: "40px", marginLeft: "20px", backgroundColor: "#FAF9F6", borderRadius: "5px", borderColor: "#e7e7e7", fontSize: "20px" }} onClick={() => setlogin('mobile')}>Login through Mobile</button>


      </div>
      {login === 'email' && <Ema />}
      {login === 'mobile' && <Mob />}
    </div>
  );

}
function Ema() {
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
      const response1 = await fetch("http://localhost:3000/loginEma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload1)
      });

      if (response1.ok) {
        const data1 = await response1.json();
        localStorage.setItem("token", data1.token);
        console.log('login successful:');
        toast.success('login successful');
        setPassword('');
        setEmail('');
        setError(null);
        navigate("/")
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


  return (<div style={{ textAlign: "center" }}><form onSubmit={handleLogin1}>
    {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    <div style={{ margin: "20px" }}> <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ height: "30px", width: "300px", borderRadius: "5px", fontSize: "20px" }} placeholder='     Email' required  ></input><br /></div>
    <div style={{ margin: "20px" }}> <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ height: "30px", width: "300px", borderRadius: "5px", fontSize: "20px" }} placeholder='    Password' required  ></input><br /></div>
    <div style={{ margin: "20px" }}><button style={{ backgroundColor: "#2781e7", height: "40px", width: "200px", borderRadius: "5px", margin: "18px", fontSize: "20px", borderColor: "#6699CC", fontWeight: "", color: "white" }}  >Log In</button>
    </div></form>
  </div>
  );
}
function Mob() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleLogin11 = async (event11) => {
    event11.preventDefault();
    const payload11 = {
      mobile, password
    };
    console.log("sending");
    try {
      const response11 = await fetch("http://localhost:3000/loginMob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload11)
      });

      if (response11.ok) {
        const data1 = await response11.json();
        localStorage.setItem("token", data1.token);
        console.log('login successful:');
        toast.success('login successful');
        setPassword('');
        setMobile('');
        setError(null);
        navigate("/")
      } else {
        const err1 = await response11.json();
        console.error('Error response data:', err1);
        toast.error(err1.error || 'login failed');
        setError(err1.error || 'login failed');

      }

    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred please try again later');
      setError('An error occurred please try again later');
      return;
    }


  };


  return (<div style={{ textAlign: "center" }}><form onSubmit={handleLogin11}>
    {error && <div style={{ color: 'red' }}>Error: {error}</div>}

    <div style={{ margin: "20px" }}> <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} style={{ height: "30px", width: "300px", borderRadius: "5px", fontSize: "20px  " }} placeholder='    Mobile' required ></input><br /></div>
    <div style={{ margin: "20px" }}> <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ height: "30px", width: "300px", borderRadius: "5px", fontSize: "20px" }} placeholder='    Password' required   ></input><br /></div>
    <div style={{ margin: "20px" }}><button style={{ backgroundColor: "#2781e7", height: "40px", width: "200px", borderRadius: "5px", margin: "18px", fontSize: "20px", borderColor: "#6699CC", fontWeight: "", color: "white" }} >Log In</button>
    </div></form>

  </div>
  );
}