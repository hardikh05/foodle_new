export function Navbar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const open = () => {
    setModalIsOpen(true);
  };

  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const closeModal1 = () => {
    setModalIsOpen1(false);
  };
  const open1 = () => {
    setModalIsOpen1(true);
  };
  return <>

    <div className="flex-container" >
      <div className="Ab" style={{ marginLeft: "60%" }}><Link to='/add' style={{ textDecoration: "none", color: "aliceblue" }}>Add</Link></div>
      <div className="Ab"><button onClick={open} style={{ background: "none", border: "none", color: "aliceblue", fontSize: "25px" }}>SignIn</button></div>
      <div className="Ab"><button onClick={open1} style={{ background: "none", border: "none", color: "aliceblue", fontSize: "25px" }}>LogIn</button></div>


      <Modal isOpen={modalIsOpen1} onRequestClose={closeModal1} style={{ justifyContent: "center", content: { width: "500px", marginLeft: "30%" }, overlay: { background: "blur" } }}>
        <button style={{ marginLeft: "97%", height: "30px", background: "none", border: "none", fontSize: "30px" }} onClick={closeModal1}>X</button>
        <h1><Log /></h1>

      </Modal>


      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ justifyContent: "center", content: { width: "500px", marginLeft: "30%" }, overlay: { background: "blur" } }}>
        <button style={{ marginLeft: "97%", height: "30px", background: "none", border: "none", fontSize: "30px" }} onClick={closeModal}>X</button>
        <h1><Sign /></h1>
      </Modal></div>

  </>

}