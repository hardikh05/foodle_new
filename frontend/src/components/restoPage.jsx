import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { useDispatchCart, useCart } from "./contextReducer";
import { Cart } from "./cart"
import axios from "axios";
import Modal from 'react-modal';
import { toast } from 'react-hot-toast'
import Badge from 'react-bootstrap/Badge'



export function Food() {
  const [searchParams] = useSearchParams();
  const [filter, setfilter] = useState("");
  const [users, setuser] = useState([]);
  const [name, setname] = useState("");
  const [des, setdes] = useState("");
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const data = useCart();


  const id = searchParams.get("id");

  const closeModal1 = () => {
    setModalIsOpen1(false);
  };
  const open1 = () => {
    setModalIsOpen1(true);
  };



  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/restoName?id=${id}`)
      .then(response => {
        if (response.status === 200) {
          setname(response.data.name);
          setdes(response.data.des)
        } else {
          throw new Error("Error fetching data");
        }
      })
      .catch(error => {
        Error(error.message);
      });
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/food/find?filter=${filter}&id=${id}`)
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
  }, [filter])



  return <>
    <div style={{ display: "flex", height: "50px" }}>
      <b style={{ fontSize: "40px", marginLeft: "200px" }}>Foodle</b>
      <div style={{ position: "relative", marginLeft: "120px" }}>
        <input type="text" style={{ marginTop: "15px", width: "700px", borderRadius: "5px", height: "35px", paddingLeft: "40px" }} placeholder="  Search for food" pattern="[a-zA-Z\s]*" onChange={(e) => {
          const searchTerm = e.target.value.toUpperCase().trim();
          setfilter(searchTerm);
        }} />
        <span
          className="search-icon"
          style={{
            position: "absolute",
            left: "10px",
            top: "65%",
            transform: "translateY(-50%)",
            color: "#ccc",
            fontSize: "18px"
          }}
        >
          &#128269;
        </span>
      </div>
      <button style={{ marginLeft: "120px", marginTop: "20px", border: "none", background: "none", fontSize: "20px" }} onClick={open1}>Cart{""}
        <Badge pill bg="danger" >{data.length}</Badge>
      </button>

      <Modal isOpen={modalIsOpen1} onRequestClose={closeModal1} style={{ content: { width: "700px", marginLeft: "25%", justifyContent: "center" }, overlay: { background: "blur" } }}>
        <button style={{ marginLeft: "97%", height: "30px", background: "none", border: "none", fontSize: "30px", justifyContent: "center" }} onClick={closeModal1}>X</button>
        <div><Cart /></div>


      </Modal>
    </div>
    <hr ></hr>
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
  const [count, setCount] = useState(1);
  const dispatch1 = useDispatchCart();
  const data = useCart();
  const [finalPrice, setFinal] = useState(food.foodPrice);



  const handleAddToCart = async () => {
    const existingItem = data.find((item) => item.id === food._id);
    if (existingItem) {
      await dispatch1({ type: "UPDATE", id: food._id, price: finalPrice, qty: count });
    } else {
      await dispatch1({ type: "ADD", id: food._id, name: food.foodName, price: finalPrice, qty: count, restId: food.restId });
    }
    toast.success("ADDED")
    console.log(data)
  };

  const increament = () => {
    setCount(count + 1);
    setFinal(count * food.foodPrice + food.foodPrice);
  };

  const dicreament = () => {
    if (count > 0) {
      setCount(count - 1);
      setFinal(count * food.foodPrice - food.foodPrice);
    }
  }




  return <>
    <div style={{ width: "75%", height: "195px", margin: "20px", marginLeft: "190px", boxShadow: "3px 4px 10px 2px #888888", borderRadius: "15px", display: "flex" }}>
      <img src={food.foodImg} alt="" style={{ height: "175px", width: "175px", borderRadius: "15px", margin: "10px" }} />
      <div style={{ display: "flex", flexDirection: "column", marginLeft: "40px", width: "65%", height: "190px" }}><div style={{ fontSize: "40px" }}>{food.foodName}</div>
        <div style={{ width: "90%", overflowWrap: "break-word" }}>
          {food.foodDes}
        </div>

      </div> <div style={{ marginTop: "15px", display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: "30px", marginLeft: "30%" }}>₹{finalPrice}</div>
        <div style={{ marginLeft: "18%", marginTop: "10px" }}><button style={{ height: "30px", width: "30px", marginRight: "5px", borderRadius: "5px" }} onClick={dicreament}>-</button>{count}<button style={{ height: "30px", width: "30px", marginLeft: "5px", borderRadius: "5px" }} onClick={increament} >+  </button></div>
        <button style={{ marginTop: "20px", borderRadius: "5px", width: "120px", height: "40px", backgroundColor: "#2781e7" }} onClick={handleAddToCart}>ADD TO CART</button>
      </div>
    </div>
  </>
}