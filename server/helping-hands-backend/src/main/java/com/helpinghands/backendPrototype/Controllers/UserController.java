package com.helpinghands.backendPrototype.Controllers;

import com.helpinghands.backendPrototype.Data.UserRepository;
import com.helpinghands.backendPrototype.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/users")
    User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    @GetMapping("/users/{id}")
    User one(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow(); //TODO create a UserNotFound exception to throw here.
    }

    @PutMapping("/users/{id}")
    User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepository.findById(id).map( user -> {
            user.setName(updatedUser.getName());
            user.setLocation(updatedUser.getLocation());
            return userRepository.save(user);
        }).orElseGet(()-> {
            updatedUser.setId(id);
            return userRepository.save(updatedUser);
        });
    }

    @DeleteMapping("/users/{id}")
    void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

}