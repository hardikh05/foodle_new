import { Email } from "./Restaurent/restoLogin";
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { RestoSign } from "./Restaurent/restoSignup";

export function Addrest() {
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
    return (
        <><div style={{ height: "130vh", backgroundColor: "#F4F4F4" }}>

            <div className="back">
                <div style={{ height: "60vh", paddingLeft: "15%" }}>
                    <p style={{ fontSize: "40px", paddingTop: "8%" }}>
                        Partner with Foodle<br></br>
                        at 0% commission for the 1st month!
                    </p><br></br>
                    <br></br>
                    <p style={{ fontSize: "18px" }}>And get ads worth INR 1500. Valid for new restaurant partners in select cities.</p>
                    <br></br><div style={{ paddingTop: "20px" }}>
                        <button style={{ height: "47px", width: "360px", borderRadius: "5px", fontSize: "18px", backgroundColor: "#2781e7", borderColor: "#6699CC" }} onClick={open2}>  Register your restaurant</button>
                        <button style={{ height: "47px", width: "370px", marginLeft: "10px", borderRadius: "5px", fontSize: "18px", borderColor: "#e7e7e7", backgroundColor: "#FAF9F6" }} onClick={open} >Login to your existing restaurant</button>
                    </div>
                    
                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ justifyContent: "center", content: { width: "500px", marginLeft: "30%" }, overlay: { background: "blur" } }}>
          <button style={{ marginLeft: "97%", height: "30px", background: "none", border: "none", fontSize: "30px" }} onClick={closeModal}>X</button>
          <h1><Email/></h1>

        </Modal>
        <Modal isOpen={modalIsOpen2} onRequestClose={closeModal2} style={{ justifyContent: "center", content: { width: "700px", marginLeft: "25%" }, overlay: { background: "blur" } }}>
        <button style={{ marginLeft: "97%", height: "30px", background: "none", border: "none", fontSize: "30px" }} onClick={closeModal2}>X</button>
            <RestoSign/>
      </Modal>


                </div>

                <div style={{ marginLeft: "15%", backgroundColor: "white", marginRight: "25%", borderRadius: "7px", height: "50vh", textAlign: "center", color: "black", fontWeight: "normal", paddingTop: "3%", width: "130vh",marginTop:"45px" }}>
                    <h1 style={{ fontWeight: "normal", fontSize: "35px" }}>Get started with online ordering</h1><br></br>
                    <p style={{ color: "GrayText", fontSize: "large" }}>Please keep the documents ready for a smooth signup</p>

                    <div className="aaa">
                        <div className="ppp">
                            <ul >
                                <li className="tick">FSSAI license copy </li>
                                <li className="tick">Regular GSTIN</li>

                                <li className="tick">Your restaurant menu</li>
                            </ul>


                        </div>
                        <div className="ppp"><ul>
                            <li className="tick">PAN card copy</li>
                            <li className="tick">Bank account details</li>

                            <li className="tick">Images of your restaurant</li>
                        </ul>


                        </div>

                    </div>

                </div>



            </div>

        </div>


            <div style={{ textAlign: "center", height: "60vh", paddingTop: "30px", fontFamily: "okra, Helvetica, sans-serif" }}>
                <h1 style={{ fontWeight: "normal", fontSize: "35px" }}>Why should you partner with Foodle?</h1><br></br><br></br>
                <p style={{ fontSize: "20px", color: "grey" }}>Foodle enables you to get 60% more revenue, 10x new customers and boost your brand <br></br>visibility by providing insights to improve your business.</p>

                <div className="why">
                    <div className="box">
                        <div style={{ textAlign: "left", padding: "0px", margin: "0px", display: "flex", height: "40px" }}><img src="https://b.zmtcdn.com/merchant-onboarding/d2bcadb70abdd99811cceda4cc757f5a1600670711.png" height={30}  /><p style={{ paddingLeft: "20px", }}><p style={{ fontSize: "20px", color: "#256fef" }}>1000+ cities </p > <p style={{ color: "grey" }}>in India</p></p>
                        </div>
                    </div>
                    <div className="box">
                        <div style={{ textAlign: "left", padding: "0px", margin: "0px", display: "flex", height: "40px" }}><img src="https://b.zmtcdn.com/merchant-onboarding/77b29f40bd0fb6c74c78695b07cdee901600670728.png" height={30}  /><p style={{ paddingLeft: "20px", }}><p style={{ fontSize: "20px", color: "#256fef" }}>3 lakh+ </p > <p style={{ color: "grey" }}>restaurant listings</p></p>
                        </div>
                    </div>
                    <div className="box">
                        <div style={{ textAlign: "left", padding: "0px", margin: "0px", display: "flex", height: "40px" }}><img src="https://b.zmtcdn.com/merchant-onboarding/e2b1283698fb6d3532c2df0c22a11fca1600670743.png" height={30}  /><p style={{ paddingLeft: "20px", }}><p style={{ fontSize: "20px", color: "#256fef" }}>5.0 crore+</p > <p style={{ color: "grey" }}>monthly orders</p></p>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );

}