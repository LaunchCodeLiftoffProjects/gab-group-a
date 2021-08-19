package com.helpinghands.backendPrototype.Controllers;

import com.helpinghands.backendPrototype.Data.UserRepository;
import com.helpinghands.backendPrototype.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;


@RestController
public class UserController {
    @Autowired
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @CrossOrigin
    @GetMapping("/users")
    Iterable<User> all() {

        Iterable<User> users = userRepository.findAll();
        //this solves the infinite nesting problem, but will be slow as the db grows.
        for (User user : users) {
            user.getLocation().setUsers(new ArrayList<>());
        }
        return users;
    }

    @CrossOrigin
    @PostMapping("/users")
    User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    @CrossOrigin
    @GetMapping("/users/{id}")
    User one(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.getLocation().setUsers(new ArrayList<>());
        return user; //TODO create a UserNotFound exception to throw here.
    }

    @CrossOrigin
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

    @CrossOrigin
    @DeleteMapping("/users/{id}")
    void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

}