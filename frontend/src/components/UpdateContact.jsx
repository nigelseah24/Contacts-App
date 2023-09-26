import axios from "axios";
import {useNavigate, useLocation } from "react-router-dom";

function UpdateContact() {
  const location = useLocation();
  const contact  = location.state.contact;
  const navigate = useNavigate();

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
        navigateToHome();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating contact:", error);
        // Handle error case
      });
  }

  return (
    <div>
        <button
          className="contact-subheader-button"
          onClick={navigateToCard}
        >Cancel</button>
      <h2>Update {contact.name}</h2>
      <form action="PUT" onSubmit={handleUpdate}>
        <label>Name: </label>
        <input type="text" id="name" defaultValue={contact.name}/><br/><br/>
        <label>Phone: </label>
        <input type="tel" id="phone" defaultValue={contact.phone}/><br/><br/>
        <label>Email: </label>
        <input type="email" id="email" defaultValue={contact.email}/><br/><br/>
        <label>Date of birth: </label>
        <input type="date" id="dob" defaultValue={contact.dob}/><br/><br/>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateContact;
