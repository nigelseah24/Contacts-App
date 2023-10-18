package com.example.contact.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

// Prod:
//@CrossOrigin(origins = "https://nigels-contact-app.netlify.app/")
// Dev:
@CrossOrigin(origins = "http://127.0.0.1:5173/")
@RestController
@RequestMapping(path = "api/v1/contact")
public class ContactController {
    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    public List<Contact> getContacts() {
        return contactService.getContacts();
    }

    @GetMapping("/{contactId}")
    public Contact getContact(@PathVariable("contactId") Long contactId) {
        return contactService.getContact(contactId);
    }

    @GetMapping("/searchByName")
    public Contact getContactByName(@RequestParam("name") String name) {
        return contactService.getContactByName(name);
    }

    @PostMapping
    public void registerNewContact(@RequestBody Contact contact) {
        contactService.addNewContact(contact);
    }

    @DeleteMapping(path="{contactId}")
    public void deleteContact(@PathVariable("contactId") Long contactId) {
        contactService.deleteContact(contactId);
    }

    @PutMapping(path="{contactId}")
    public void updateContact(
            @PathVariable("contactId") Long contactId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) LocalDate dob) {
        contactService.updateContact(contactId, name, phone, email, dob);
    }
}
