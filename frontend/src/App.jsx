import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../src/components/Header'
import SearchBar from './components/SearchBar'
import CreateNewContact from './components/CreateNewContact'
import TableOfContacts from './components/TableOfContacts'
import UpdateContact from './components/UpdateContact'
import ContactCard from './components/ContactCard'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/contact")
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error("Error fetching contact data:", error);
      });
  }, []);

  // Sort the contacts by name in alphabetical order
  const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
    
  const toggleContactCard = (contact) => {
    console.log(contact);
  };

  const navigate = useNavigate();

  // Function to navigate to the "/create" route
  const navigateToCreate = () => {
    navigate('/create');
  };

  // Function to navigate to the "/update" route with the contact object as a parameter
  const navigateToUpdate = (contact) => {
    navigate(`/card`, { 
      state: {
        contact: contact
       }
    });
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <main>
            <div className='subheader'>
              <SearchBar />
              <button onClick={navigateToCreate} className='new-contact-button'>New Contact</button>
            </div>
            <TableOfContacts sortedContacts={sortedContacts} toggleContactCard={navigateToUpdate}/>
          </main>
        } />
        <Route path='/card' element={<ContactCard />} />
        <Route path="/update" element={<UpdateContact />} />
        <Route path='/create' element={<CreateNewContact contact={contacts}/>} />
      </Routes>
    </>
  )
}

export default App
