import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateNewContact() {
  const navigate = useNavigate();

  // State variables to track form input values and form validity
  const [formData, setFormData] = useState({
    name: "",
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

    const url = "http://localhost:8080/api/v1/contact";
    const data = {
      name: formData.name,
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
    <div>
      <div className="new-contact-subheader">
        <button
          className="new-contact-subheader-button"
          onClick={navigateToHome}
        >
          Cancel
        </button>{" "}
        {/* Add a Cancel button */}
        <h2 className="new-contact-subheader-title">Register New Contact</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        /><br/><br/>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        /><br/><br/>
        <label>Date of Birth: </label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
        /><br/><br/>
        <button type="submit" disabled={!isFormValid}>
          Done
        </button>
      </form>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}
