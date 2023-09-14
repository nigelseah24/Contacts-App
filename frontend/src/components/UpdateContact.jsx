import axios from "axios";
import { useLocation } from "react-router-dom";

export default function UpdateContact() {
  const location = useLocation();
  const contact  = location.state.contact;
  console.log(contact);

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
      <h2>Update Contact</h2>
      <form action="PUT" onSubmit={handleUpdate}>
        <label>Existing contact ID: </label>
        <input type="number" id="id" /><br/><br/>
        <label>New name: </label>
        <input type="text" id="name" /><br/><br/>
        <label>New email: </label>
        <input type="email" id="email" /><br/><br/>
        <label>New date of birth: </label>
        <input type="date" id="dob" /><br/><br/>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
