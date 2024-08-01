import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from "axios";
import { Sign } from './Signn';
import Modal from 'react-modal';
import { Log } from './login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import Orders from './myOrders';

Modal.setAppElement('#root');

export function Header() {
  const [filter, setfilter] = useState("");
  const [users, setuser] = useState([]);
  const [data1, setData1] = useState("")
  const [token, setToken] = useState(localStorage.getItem("token"));



  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const open = () => {
    setModalIsOpen(true);
  };


  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const closeModal2 = () => {
    setModalIsOpen2(false);
  };
  const open2 = () => {
    setModalIsOpen2(true);
  };

  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const closeModal1 = () => {
    setModalIsOpen1(false);
  };
  const open1 = () => {
    setModalIsOpen1(true);
  };
  const Navigate2 = useNavigate()
  useEffect(() => {
    if (filter == "[") {
      console.error("error")
    }
    axios.get("http://localhost:3000/api/v1/bulk?filter=" + filter)
      .then(response => {
        if (response.status === 200) {
          setuser(response.data.user);
        } else {
          throw new Error("Error fetching data");
        }
      })
      .catch(error => {
        Error(error.message);
      });
  }, [filter])

  useEffect(() => {

    if (token) {
      axios.get("http://localhost:3000/user", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
        .then(response1 => {
          if (response1.status === 200) {
            setData1(response1.data.name);
          } else {
            throw new Error("error")
          }
        })
        .catch(error => {
          console.error(error.message);
        });
    } else {
      // Handle the case where the token is not available
     
    }
  }, [token])



  const logout = () => {
    localStorage.clear();
    Navigate2("/")
    toast.success("LogOut Successful")
    setModalIsOpen1(false)
  }


  return <><div className="A">
    {localStorage.getItem("token") && (<div className="flex-container" >
      <button style={{ border: "none", background: "none", fontSize: "25px", paddingTop: "20px", color: "aliceblue", marginLeft: "70%" }} onClick={open2}>My orders</button>
      <div style={{ marginLeft: "40px", fontSize: "25px", paddingTop: "20px", marginRight: "40px" }}>{data1}</div>
      <button style={{ fontSize: "25px", paddingTop: "20px", background: "none", border: "none", color: "aliceblue" }} onClick={logout} >LogOut</button>

      <Modal isOpen={modalIsOpen2} onRequestClose={closeModal2} style={{ justifyContent: "center", content: { width: "700px", marginLeft: "25%" }, overlay: { background: "blur" } }}>
        <button style={{ marginLeft: "97%", height: "30px", background: "none", border: "none", fontSize: "30px" }} onClick={closeModal2}>X</button>
        <Orders />

      </Modal>

    </div>

    )}
    {!localStorage.getItem("token") && (
      <div className="flex-container" >
        <div className="Ab" style={{ marginLeft: "60%" }}><Link to='/add' style={{ textDecoration: "none", color: "aliceblue" }}>Add</Link></div>
        <div className="Ab"><button onClick={open} style={{ background: "none", border: "none", color: "aliceblue", fontSize: "25px" }}>SignUp</button></div>
        <div className="Ab"><button onClick={open1} style={{ background: "none", border: "none", color: "aliceblue", fontSize: "25px" }}>LogIn</button></div>


        <Modal isOpen={modalIsOpen1} onRequestClose={closeModal1} style={{ justifyContent: "center", content: { width: "500px", marginLeft: "30%" }, overlay: { background: "blur" } }}>
          <button style={{ marginLeft: "97%", height: "30px", background: "none", border: "none", fontSize: "30px" }} onClick={closeModal1}>X</button>
          <h1><Log /></h1>

        </Modal>


        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ justifyContent: "center", content: { width: "500px", marginLeft: "30%" }, overlay: { background: "blur" } }}>
          <button style={{ marginLeft: "97%", height: "30px", background: "none", border: "none", fontSize: "30px" }} onClick={closeModal}>X</button>
          <h1><Sign /></h1>

        </Modal>
      </div>
    )}


    <div style={{ justifyContent: "center" }}>
      <div style={{ marginTop: "110px", fontSize: "90px", color: "aliceblue", textAlign: "center" }}>Foodle</div>
      <div style={{ fontSize: "40px", color: "aliceblue", textAlign: "center" }}>dinner mangao aache se khao</div>
    </div>
    {localStorage.getItem("token") && (

      <div className="search-container">
        <input
          type="text"
          placeholder="  Search Restaurant"
          className="search-input"
          pattern="[a-zA-Z\s]*"
          onChange={(e) => {
            const searchTerm = e.target.value.toUpperCase().trim();
            setfilter(searchTerm);
          }}
        />
        <span className="search-icon">&#128269;</span> {/* Unicode for magnifier icon */}
      </div>)}
  </div>

    {!localStorage.getItem("token") && (

      <div><div className="bflex" >
        <div className="bb" style={{ width: "320px" }}>Popular places in </div>
        <div className="bb"><img src="https://b.zmtcdn.com/images/flags_z10/in.png?output-format=webp" alt="" /></div>
        <div className="bb" style={{ fontFamily: "-moz-initial", width: "100px" }}>India</div>
      </div>
        <div style={{ textAlign: "center", fontSize: "20px", fontFamily: " okra,Helvetica,sans-serif", color: "#696969", margin: "30px" }}>
          From swanky upscale restaurants to the cosiest hidden gems serving the most incredible food, Foodle covers it all. Explore menus, and millions of restaurant photos and reviews from users just like you, to find your next great meal.
        </div>

      </div>
    )}
    {localStorage.getItem("token") && (
      <div>

        <div style={{ width: "1000px", textAlign: "center", marginLeft: "268px" }} className="row" >
          {users.map(restInfo => (
            <div style={{ paddingTop: "30px" }} className='col-12 col-md-6 col-lg-4'>

              <Rest key={restInfo._id} restInfo={restInfo} />
            </div>
          ))}
        </div>
      </div>)}


    {!localStorage.getItem("token") && (
      <div>
        <div className="flexmain"><div className="flex1">
          <button className="butto" onClick={open1}>Delhi NCR</button>
          <button className="butto" onClick={open1}>Kolkata</button>
          <button className="butto" onClick={open1}>Mumbai</button>
          <button className="butto" onClick={open1}>Bengaluru</button>


        </div>
          <div className="flex1">
            <button className="butto" onClick={open1}>Ahmedabad</button>
            <button className="butto" onClick={open1}>Chandigarh</button>
            <button className="butto" onClick={open1}>Pune</button>
            <button className="butto" onClick={open1}>Hyderabad</button>

          </div>

          <div className="flex1">
            <button className="butto" onClick={open1}>Chennai</button>
            <button className="butto" onClick={open1}>Lucknow</button>
            <button className="butto" onClick={open1}>Kochi</button>
            <button className="butto" onClick={open1}>Jaipur</button>


          </div>
        </div>
      </div>)}
  </>

}

function Rest({ restInfo }) {
  const [over, setOver] = useState(false);
  let buttonstyle = {
    boxShadow: '',
    borderColor: "none"
  }
  if (over) {
    buttonstyle.boxShadow = "3px 4px 10px 2px #888888";
    buttonstyle.borderColor = "#DCDCDC";
  }
  else {
    buttonstyle.boxShadow = '';
    buttonstyle.borderColor = "none";
  }



  return <><Link to={`/foodle?id=${restInfo._id}`} style={{ textDecoration: "none", border: "none" }}><div style={{ width: "300px", borderRadius: "8px", ...buttonstyle }}
    onMouseOver={() => setOver(true)}
    onMouseOut={() => setOver(false)} >
    <div style={{ height: "312px", width: "275px", borderRadius: "25px" }}>
      <img src={restInfo.imgs} alt="" style={{ height: "225px", width: "225px", borderRadius: "15px", marginTop: "25px", marginLeft: "25px" }} />
      <div style={{ fontSize: "18px", textAlign: "left", marginTop: "5px", color: "#1c1c1c", marginLeft: "38px" }}>{restInfo.nameu}</div>
      <div style={{ fontSize: "13px", textAlign: "left", color: "#696969", marginLeft: "38px" }}>{restInfo.locs}</div>


    </div>
  </div>
  </Link>


  </>
}



