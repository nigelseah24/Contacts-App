import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import axios from 'axios';
import Header from '../src/components/Header';
import SearchBar from './components/SearchBar';
import CreateNewContact from './components/CreateNewContact';
import ContactList from './components/ContactList';
import UpdateContact from './components/UpdateContact';
import ContactCard from './components/ContactCard';
import './App.css';
import searchIcon from "./icons/search.svg";
import plusIcon from "./icons/plus.svg";

function App() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query

  useEffect(() => {
    axios
      // Prod (uncomment this and comment the next line to test the production backend):
      .get("https://contactsappbackend-nsh6b3jr.b4a.run/api/v1/contact")
      // Dev (uncomment this and comment the previous line to test the development backend)):
      //.get("http://localhost:8080/api/v1/contact")
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error("Error fetching contact data:", error);
      });
  }, []);

  // Sort the contacts by name in alphabetical order
  const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

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

  // Function to update the search query state
  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  return (
      <>
        <Routes>
          <Route path="/" element={
            <Box sx={{
              height: '100%',
              width: {
                xs: '100',
                sm: '200',
                md: '300',
                lg: '400',
                xl: '500',
              },
            }}>
              <Header />
              <SearchBar sortedContacts={sortedContacts} setFilteredContacts={setFilteredContacts} searchQuery={searchQuery} updateSearchQuery={updateSearchQuery} />
              <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1 }}>
                <img
                  src={plusIcon}
                  alt="Create New Contact"
                  onClick={navigateToCreate}
                  style={{ cursor: 'pointer', borderRadius: '50%', width: '60px' }}
                />
              </div>
              {searchQuery === '' ? (
                <ContactList sortedContacts={sortedContacts} toggleContactCard={navigateToUpdate} />
              ) : (
                filteredContacts.length > 0 ? (
                  <ContactList sortedContacts={filteredContacts} toggleContactCard={navigateToUpdate} />
                ) : (
                  <p>No matching contacts found.</p>
                )
              )}
            </Box>
          } />
          <Route path='/card' element={<ContactCard />} />
          <Route path="/update" element={<UpdateContact />} />
          <Route path='/create' element={<CreateNewContact contact={contacts} />} />
        </Routes>
      </>
  )
}

export default App;
