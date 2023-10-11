import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function UpdateContact() {
  const location = useLocation();
  const contact = location.state.contact;
  const navigate = useNavigate();
  const submitButtonRef = useRef();
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation pop-up

  // Function to navigate to the home page
  const navigateToHome = () => {
    navigate("/");
  };

  // Function to navigate to the home page
  const navigateToCard = () => {
    navigate("/card", { state: { contact } });
  };

  // Function to handle the confirmation of contact deletion
  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  // Function to confirm and delete the contact
  const handleDelete = () => {
    const url = `https://contactsappbackend-nsh6b3jr.b4a.run/api/v1/contact/${contact.id}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .delete(url, config)
      .then((response) => {
        console.log("Contact deleted successfully");
        navigateToHome();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
        // Handle error case
      });
  };

  // Function to cancel contact deletion
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  // Function to handle form submission
  const handleUpdate = (event) => {
    event.preventDefault();
    const data = {
      id: document.getElementById("id").value,
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      dob: document.getElementById("dob").value,
    };
    const url = `http://localhost:8080/api/v1/contact/${data.id}?name=${data.name}&email=${data.email}&dob=${data.dob}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .put(url, data, config)
      .then(response => {
        console.log("Contact updated successfully");
        // Perform any additional actions after successful update
      })
      .catch((error) => {
        console.error("Error updating contact:", error);
        // Handle error case
      });
  };

  return (
    <div>
      {/* Overlay */}
      {showConfirmation && <div className="overlay"></div>}

      <div className="contact-subheader">
        <button
          onClick={navigateToCard}
        >
          Cancel
        </button>
        <h2>Edit</h2>
        <button
          onClick={() => submitButtonRef.current.click()}
        >
          Done
        </button>
      </div>
      <form className="form" action="PUT" onSubmit={handleUpdate}>
      <input 
          type="text" id="name" 
          defaultValue={contact.name}
        />
        <br/><br/>
        <input 
          type="tel" id="phone" 
          defaultValue={contact.phone}
        />
        <br/><br/>
        <input 
          type="email" id="email" 
          defaultValue={contact.email}
        />
        <br/><br/>
        <input 
          type="text" id="dob" 
          defaultValue={contact.dob} 
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        /><br/><br/>
        <button type="submit" ref={submitButtonRef} style={{ border: 'none'}}>
        </button>
      </form>
      <button
        className="contact-delete-button"
        onClick={handleDeleteConfirmation}
      >
        Delete contact
      </button>
      {/* Confirmation Pop-up */}
      {showConfirmation && (
        <div className="confirmation-popup">
          <p>Are you sure you want to delete this contact?</p>
          <button className="contact-delete-button" style={{ width: '300px', textAlign: 'center' }} onClick={handleDelete}>Yes</button>
          <button className="contact-delete-button" style={{ width: '300px', color: 'white'}} onClick={handleCancelDelete}>No</button>
        </div>
      )}
    </div>
  );
}

export default UpdateContact;
