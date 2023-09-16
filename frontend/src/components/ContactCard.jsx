import { useNavigate, useLocation } from "react-router-dom";

function ContactCard(){
    const location = useLocation();
    const contact = location.state.contact;
    const navigate = useNavigate();

    // Function to navigate to the home page
    const navigateToHome = () => {
        navigate("/");
    };

    return (
        <div>
            <button
                className="new-contact-subheader-button"
                onClick={navigateToHome}
            >Cancel</button>
        </div>
    )
}
export default ContactCard;