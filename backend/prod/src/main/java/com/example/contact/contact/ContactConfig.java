//package com.example.contact.contact;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.time.LocalDate;
//import java.time.Month;
//import java.util.List;
//
//@Configuration
//public class ContactConfig {
//
//    @Bean
//    CommandLineRunner commandLineRunner(ContactRepository repository) {
//        return args -> {
//            Contact mariam = new Contact(
//                    "Mariam",
//                    "mariam@gmail.com",
//                    "0121223444",
//                    LocalDate.of(2000, Month.JANUARY, 5)
//            );
//            Contact alex = new Contact(
//                    "Alex",
//                    "alex@gmail.com",
//                    "0121223499",
//                    LocalDate.of(2004, Month.JANUARY, 5)
//            );
//
//            repository.saveAll(
//                    List.of(mariam, alex)
//            );
//        };
//    }
//}