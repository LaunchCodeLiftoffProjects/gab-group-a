package com.helpinghands.backendPrototype.Controllers.SearchControllers;

import com.helpinghands.backendPrototype.Data.LocationRepository;
import com.helpinghands.backendPrototype.Data.UserRepository;
import com.helpinghands.backendPrototype.Models.Item;
import com.helpinghands.backendPrototype.Models.Task;
import com.helpinghands.backendPrototype.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@CrossOrigin
public class UserSearchController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LocationRepository locationRepository;

    @GetMapping("/search/users")
    public Iterable<User> userByName(@RequestParam String name) {
        Iterable<User> result = userRepository.findByNameContaining(name); //this works, but breaks when multiple users match query
        for(User user : result) {
            user.getLocation().setUsers(new ArrayList<>());
            for (Item item : user.getHas()) {
                item.getItemCategory().setItems(new ArrayList<>());
                item.setUsersWhoNeed(new ArrayList<>());
                item.setUsersWhoHave(new ArrayList<>());
            }
            for (Item item : user.getNeedsItems()) {
                item.getItemCategory().setItems(new ArrayList<>());
                item.setUsersWhoNeed(new ArrayList<>());
                item.setUsersWhoHave(new ArrayList<>());
            }

            for (Task task : user.getCan()) {
                task.getTaskCategory().setTasks(new ArrayList<>());
                task.setUsersWhoCan(new ArrayList<>());
                task.setUsersWhoNeed(new ArrayList<>());
            }

            for (Task task : user.getNeedsTasks()) {
                task.getTaskCategory().setTasks(new ArrayList<>());
                task.setUsersWhoCan(new ArrayList<>());
                task.setUsersWhoNeed(new ArrayList<>());
            }

        }

        return result;
    }

    @GetMapping("/search/user/location")
    public Iterable<User> usersByLocationName(@RequestParam(required = false) String name, @RequestParam(required = false) Long id) {
        return locationRepository.findByName(name).getUsers();
    } //TODO get the array of locations that all have matching names. Do this for User by name too.



}
