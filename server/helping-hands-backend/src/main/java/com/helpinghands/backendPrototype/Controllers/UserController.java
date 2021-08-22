package com.helpinghands.backendPrototype.Controllers;

import com.helpinghands.backendPrototype.Data.ItemRepository;
import com.helpinghands.backendPrototype.Data.UserRepository;
import com.helpinghands.backendPrototype.Models.Item;
import com.helpinghands.backendPrototype.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;


@RestController
public class UserController {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final ItemRepository itemRepository;

    public UserController(UserRepository userRepository, ItemRepository itemRepository) {
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
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
            user.setCan(updatedUser.getCan());
            user.setHas(updatedUser.getHas());
            user.setEmail(updatedUser.getEmail());
            user.setDescription(updatedUser.getDescription());

            return userRepository.save(user);
        }).orElseGet(()-> {
            updatedUser.setId(id);
            return userRepository.save(updatedUser); //could try updating all arrays here and pulling user objec by id into frontend
        });
    }

    @CrossOrigin
    @DeleteMapping("/users/{id}")
    void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

//    @CrossOrigin
//    @PostMapping("/users/{id}/add-needs-item/")
//    void addNeedsItem(@PathVariable Long id, @RequestBody String itemName) { //this needs work maybe make itemName @requestParam
//        User user = userRepository.findById(id).orElseThrow();
//        Item item = itemRepository.findByName(itemName);
//        user.getNeedsItems().add(item);
//    }

}