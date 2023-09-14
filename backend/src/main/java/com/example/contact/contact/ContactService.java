package com.example.contact.contact;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ContactService {
    private final ContactRepository contactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {

        this.contactRepository = contactRepository;
    }

    public List<Contact> getContacts() {
        return contactRepository.findAll(); // This is a method from the JpaRepository interface
    }

    public Contact getContact(Long contactId) {
        return contactRepository.findById(contactId).orElseThrow(
                () -> new IllegalStateException("Contact with id " + contactId + " does not exist"));
    }

    public Contact getContactByName(String name) {
        return contactRepository.findContactByName(name).orElseThrow(
                () -> new IllegalStateException("Contact with name " + name + " does not exist"));
    }

    public void addNewContact(Contact contact) {
        Optional<Contact> contactOptional = contactRepository.findContactByEmail(contact.getEmail());
        if (contactOptional.isPresent()) {
            throw new IllegalStateException("email taken");
        } else {
            contactRepository.save(contact);
        }
    }

    public void deleteContact(Long contactId){
        boolean exists = contactRepository.existsById(contactId);
        if(!exists) {
            throw new IllegalStateException("Contact with id " + contactId + " does not exist");
        }
        else {
            contactRepository.deleteById(contactId);
        }
    }

    @Transactional
    public void updateContact(Long contactId, String name, String email, LocalDate dob){
        Contact contact = contactRepository.findById(contactId).orElseThrow(
                () -> new IllegalStateException("Student with id " + contactId + " does not exist")
        );

        if (name != null && name.length() > 0 && !contact.getName().equals(name)) {
            contact.setName(name);
        }

        if(email !=null && email.length() > 0 && !contact.getEmail().equals(email)) {
            Optional<Contact> contactOptional = contactRepository.findContactByEmail(email);
            if(contactOptional.isPresent()){
                throw new IllegalStateException("email taken");
            }
            else {
                contact.setEmail(email);
            }
        }
        if(dob != null) {
            contact.setDob(dob);
        }
    }

}
