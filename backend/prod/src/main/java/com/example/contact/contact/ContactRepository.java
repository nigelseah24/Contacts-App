package com.example.contact.contact;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContactRepository
        extends JpaRepository<Contact, Long> {

    // SELECT * FROM student WHERE email = ?
    @Query("SELECT c FROM Contact c WHERE c.email = ?1")
    Optional<Contact> findContactByEmail(String email);

    @Query("SELECT c FROM Contact c WHERE c.name = ?1")
    Optional<Contact> findContactByName(String name);

    @Query("SELECT c FROM Contact c WHERE c.phone = ?1")
    Optional<Contact> findContactByPhone(String phone);
}
