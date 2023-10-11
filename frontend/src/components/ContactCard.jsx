import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ContactCard(){
    const location = useLocation();
    const contact = location.state.contact;
    const [updatedContact, setUpdatedContact] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
          .get(`https://contactsappbackend-nsh6b3jr.b4a.run/api/v1/contact/${contact.id}`)
          .then(response => {
            setUpdatedContact(response.data);
          })
          .catch(error => {
            console.error("Error fetching contact data:", error);
          });
      }, []);

    // Function to navigate to the home page and pass the search query
    const navigateToHome = () => {
        navigate("/", { state: { searchQuery: location.state.searchQuery } })
    };

    const editContact = () => {
        // Navigate to the /update route and pass the contact data as state
        navigate("/update", { state: { contact : updatedContact } });
    }

    return (
        <>
        <div className="contact-subheader">
            <button
                className="contact-subheader-button"
                onClick={navigateToHome}
            > &lt; Contacts</button>
            <h2 className="contact-subheader-title">{updatedContact.name}</h2>
            <button
                className="contact-subheader-button"
                onClick={editContact}
            > Edit</button>
        </div>
        <div className="contact-details">
            <p>mobile: {updatedContact.phone}</p>
            <p>email: {updatedContact.email}</p>
            <p>age: {updatedContact.age}</p>
            <p>date of birth: {updatedContact.dob}</p>
        </div>
        </>
    )
}

export default ContactCard;