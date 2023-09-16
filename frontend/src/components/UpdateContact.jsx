import axios from "axios";
import {useNavigate, useLocation } from "react-router-dom";

export default function UpdateContact() {
  const location = useLocation();
  const contact  = location.state.contact;
  const navigate = useNavigate();
  
  // Function to navigate to the home page
  const navigateToHome = () => {
    navigate("/");
  };

  function handleUpdate(event) {
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
  }

  return (
    <div>
        <button
          className="new-contact-subheader-button"
          onClick={navigateToHome}
        >Cancel</button>
      <h2>Update {contact.name}</h2>
      <form action="PUT" onSubmit={handleUpdate}>
        <label>Name: </label>
        <input type="text" id="name" placeholder={contact.name}/><br/><br/>
        <label>Email: </label>
        <input type="email" id="email" placeholder={contact.email}/><br/><br/>
        <label>Date of birth: </label>
        <input type="date" id="dob" placeholder={contact.dob}/><br/><br/>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
