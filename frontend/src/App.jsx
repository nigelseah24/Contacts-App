import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../src/components/Header';
import SearchBar from './components/SearchBar';
import CreateNewContact from './components/CreateNewContact';
import ContactList from './components/ContactList';
import UpdateContact from './components/UpdateContact';
import ContactCard from './components/ContactCard';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query

  // useEffect(() => {
  //   axios
  //     .get("https://contactsappbackend-nsh6b3jr.b4a.run/api/v1/contact")
  //     .then(response => {
  //       setContacts(response.data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching contact data:", error);
  //     });
  // }, []);

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
      <Header />
      <Routes>
        <Route path="/" element={
          <main>
            <div className='subheader'>
              <SearchBar sortedContacts={sortedContacts} setFilteredContacts={setFilteredContacts} searchQuery={searchQuery} updateSearchQuery={updateSearchQuery} />
              <button onClick={navigateToCreate} className='new-contact-button'>+</button>
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
          </main>
        } />
        <Route path='/card' element={<ContactCard />} />
        <Route path="/update" element={<UpdateContact />} />
        <Route path='/create' element={<CreateNewContact contact={contacts} />} />
      </Routes>
    </>
  )
}

export default App;
