import { useState, useEffect } from "react";
import axios from "axios";  
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { Addfood } from "./food";

export function Restaurant(){

    const token = localStorage.getItem('token2');
    const [name, setname] = useState("");
    const [des, setdes] = useState("");
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [users, setuser] = useState([]);

  const Navigate2 = useNavigate()


  const logout = () => {
    localStorage.clear();
    Navigate2("/add")
    toast.success("LogOut Successful")
    setModalIsOpen1(false)
  }



    const closeModal1 = () => {
        setModalIsOpen1(false);
      };
      const open1 = () => {
        setModalIsOpen1(true);
      };
    
    useEffect(() => {
   
        axios.get(`http://localhost:3000/api/v1/restoDetails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(response => {
            if (response.status === 200) {
              setname(response.data.name);
              setdes(response.data.des);
            } else {
              throw new Error("Error fetching data");
            }
          })
          .catch(error => {
            console.error(error.message);
          });
      }, []);

      useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/food/findFood`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            if (response.status === 200) {
              setuser(response.data.foodlist);
            } else {
              throw new Error("Error fetching data");
            }
          })
          .catch(error => {
            Error(error.message);
          });
      }, [])
    
    return<>
 <div style={{ display: "flex", height: "50px" }}>
 <b style={{ fontSize: "40px", marginLeft: "200px" }}>Foodle</b>
 
 <button style={{ marginLeft: "50%", marginTop: "20px", border: "none", background: "none", fontSize: "20px" }} onClick={open1}>Add Food{""}
      </button>
      <button style={{ fontSize: "20px", paddingTop: "20px", background: "none", border: "none",marginLeft:"20px" }} onClick={logout} >LogOut</button></div>   
    <hr ></hr>
    <Modal isOpen={modalIsOpen1} onRequestClose={closeModal1} style={{ content: { width: "700px", marginLeft: "25%", justifyContent: "center" }, overlay: { background: "blur" } }}>
        <button style={{ marginLeft: "97%", height: "30px", background: "none", border: "none", fontSize: "30px", justifyContent: "center" }} onClick={closeModal1}>X</button>
<Addfood/>

      </Modal>
    <div style={{ marginLeft: "200px", width: "75%", overflowWrap: "break-word" }}>
      <h1 >{name}</h1>
      <div>{des}<br></br>

      </div>
    </div>


    <div>
      {users && users.length > 0 ? (
        users.map(food => (
          <Display key={food._id} food={food} />
        ))
      ) : (
        <h2 style={{ paddingLeft: "200px" }}>No food available.</h2>
      )}
    </div>
    </>
}
function Display({ food }) {

  
  
  
   
  
  
  
  
    return <>
      <div style={{ width: "75%", height: "195px", margin: "20px", marginLeft: "190px", boxShadow: "3px 4px 10px 2px #888888", borderRadius: "15px", display: "flex" }}>
        <img src={food.foodImg} alt="" style={{ height: "175px", width: "175px", borderRadius: "15px", margin: "10px" }} />
        <div style={{ display: "flex", flexDirection: "column", marginLeft: "40px", width: "65%", height: "190px" }}><div style={{ fontSize: "40px" }}>{food.foodName}</div>
          <div style={{ width: "90%", overflowWrap: "break-word" }}>
            {food.foodDes}
          </div>
  
        </div> <div style={{ marginTop: "15px", display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "30px", marginLeft: "30%" }}>₹{food.foodPrice}</div>
        
        </div>
      </div>
    </>
  }