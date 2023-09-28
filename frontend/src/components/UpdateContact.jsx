import axios from "axios";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function UpdateContact() {
  const location = useLocation();
  const contact  = location.state.contact;
  const navigate = useNavigate();
  const submitButtonRef = useRef();

  // Function to navigate to the home page
  const navigateToHome = () => {
    navigate("/");
  };

  // Function to navigate to the home page
  const navigateToCard = () => {
    navigate("/card", { state: { contact } });
  };

  function handleUpdate(event) {
    event.preventDefault();
    const data = {
      id: contact.id,
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      dob: document.getElementById("dob").value,
    };
    const url = `http://localhost:8080/api/v1/contact/${data.id}?name=${data.name}&phone=${data.phone}&email=${data.email}&dob=${data.dob}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .put(url, data, config)
      .then(response => {
        console.log("Contact updated successfully");
        navigateToCard();
      })
      .catch((error) => {
        console.error("Error updating contact:", error);
        // Handle error case
      });
  }

  return (
    <div>
      <div className="contact-subheader">
          <button
              className="contact-subheader-button"
              onClick={navigateToCard}
          > Cancel</button>
          <h2 className="contact-subheader-title">Edit</h2>
          <button
            className="contact-subheader-button"
            onClick={() => submitButtonRef.current.click()}
          >
              Done
          </button>
      </div>
      <form className="form" action="PUT" onSubmit={handleUpdate}>
        <input 
          className="form-input"
          type="text" id="name" 
          defaultValue={contact.name}
        />
        <br/><br/>
        <input 
          className="form-input"
          type="tel" id="phone" 
          defaultValue={contact.phone}
        />
        <br/><br/>
        <input 
          className="form-input"
          type="email" id="email" 
          defaultValue={contact.email}
        />
        <br/><br/>
        <input 
          className="form-input"
          type="text" id="dob" 
          defaultValue={contact.dob} 
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        /><br/><br/>
        <button type="submit" ref={submitButtonRef} style={{ border: 'none'}}>
        </button>
      </form>
    </div>
  );
}

export default UpdateContact;
