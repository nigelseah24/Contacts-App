import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateNewContact() {
  const navigate = useNavigate();
  const submitButtonRef = useRef();

  // State variables to track form input values and form validity
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the form data
    setFormData({
      ...formData,
      [name]: value,
    });
    // Check form validity
    setIsFormValid(
        formData.name.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.dob.trim() !== ""
    );
  };

  // Function to navigate to the home page
  const navigateToHome = () => {
    navigate("/");
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const url = "https://contactsappbackend-nsh6b3jr.b4a.run/api/v1/contact";
    const data = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      dob: formData.dob,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(url, data, config)
      .then((response) => {
        console.log("Contact created successfully");
        navigateToHome();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error creating contact:", error);
        // Handle error case
      });
  };

  function handleRefresh() {
    window.location.reload();
  }

  return (
    <div className="new-contact">
      <div className="contact-subheader">
        <button
          onClick={navigateToHome}
        >
          Cancel
        </button>
        <h2>New Contact</h2>
        <button
          onClick={() => submitButtonRef.current.click()}
          disabled={!isFormValid}>
            Done
        </button>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleInputChange}
          /><br/><br/>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="Phone number"
            onChange={handleInputChange}
          /><br/><br/>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleInputChange}
          /><br/><br/>
          <input
            type="text"
            name="dob"
            value={formData.dob}
            placeholder="Birth date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            onChange={handleInputChange}
          /><br/><br/>
          <button type="submit" ref={submitButtonRef} style={{ border: 'none'}}>
          </button>
        </form>
      </div>
    </div>
  );
}
