import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function ContactCard(){
    const location = useLocation();
    const contact = location.state.contact;
    const navigate = useNavigate();
    const [editable, setEditable] = useState(false);

    // Function to navigate to the home page
    const navigateToHome = () => {
        navigate("/");
    };

    const editContact = () => {
        // Navigate to the /update route and pass the contact data as state
        navigate("/update", { state: { contact } });
    }

    function handleUpdate(event) {
        event.preventDefault();
        const data = {
          id: document.getElementById("id").value,
          name: document.getElementById("name").value,
          phone: document.getElementById("phone").value,
          email: document.getElementById("email").value,
          dob: document.getElementById("dob").value,
        };
        const url = `http://localhost:8080/api/v1/contact/${data.id}?name=${data.name}phone=${data.phone}&email=${data.email}&dob=${data.dob}`;
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
        <>
        <div className="contact-card-header">
            <button
                className="new-contact-subheader-button"
                onClick={navigateToHome}
            > &lt; Contacts</button>
            <h2>{contact.name}</h2>
            <button
                className="new-contact-subheader-button"
                onClick={editContact}
            > Edit</button>
        </div>
        <div>
            <p>mobile: {contact.phone}</p>
            <p>email: {contact.email}</p>
            <p>date of birth: {contact.dob}</p>
        </div>
        </>
    )
}
export default ContactCard;