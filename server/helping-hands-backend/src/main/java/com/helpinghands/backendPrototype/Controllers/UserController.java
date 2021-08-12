package com.helpinghands.backendPrototype.Controllers;

import com.helpinghands.backendPrototype.Data.UserRepository;
import com.helpinghands.backendPrototype.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @GetMapping("/users")
    Iterable<User> all() {
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    User one(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow(); //TODO create a UserNotFound exception to throw here.
    }

}