import { useNavigate, useLocation } from "react-router-dom";

function ContactCard(){
    const location = useLocation();
    const contact = location.state.contact;
    const navigate = useNavigate();

    // Function to navigate to the home page and pass the search query
    const navigateToHome = () => {
        navigate("/", { state: { searchQuery: location.state.searchQuery } });
    };

    const editContact = () => {
        // Navigate to the /update route and pass the contact data as state
        navigate("/update", { state: { contact } });
    }

    return (
        <>
        <div className="contact-card-header">
            <button
                className="contact-subheader-button"
                onClick={navigateToHome}
            > &lt; Contacts</button>
            <h2>{contact.name}</h2>
            <button
                className="contact-subheader-button"
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