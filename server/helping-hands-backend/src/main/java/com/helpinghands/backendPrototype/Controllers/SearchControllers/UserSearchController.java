package com.helpinghands.backendPrototype.Controllers.SearchControllers;

import com.helpinghands.backendPrototype.Data.LocationRepository;
import com.helpinghands.backendPrototype.Data.UserRepository;
import com.helpinghands.backendPrototype.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class UserSearchController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LocationRepository locationRepository;

    @GetMapping("/search/user/{name}")
    public User findByName(String name) {
        return userRepository.findByName(name);
    }

    @GetMapping("/search/user/location")
    public Iterable<User> usersByLocationName(@RequestParam String name) {
        return locationRepository.findByName(name).getUsers();
    }

    

}
