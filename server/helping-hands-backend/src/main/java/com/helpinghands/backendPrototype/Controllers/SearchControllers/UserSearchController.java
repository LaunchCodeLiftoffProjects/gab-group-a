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
    public User findByName(@RequestParam String name) {
        User result = userRepository.findByNameContaining(name);
        result.getLocation().setUsers(new ArrayList<>());
        for (Item item : result.getHas()) {
            item.getItemCategory().setItems(new ArrayList<>());
            item.setUsersWhoNeed(new ArrayList<>());
            item.setUsersWhoHave(new ArrayList<>());
        }
        for (Item item : result.getNeedsItems()) {
            item.getItemCategory().setItems(new ArrayList<>());
            item.setUsersWhoNeed(new ArrayList<>());
            item.setUsersWhoHave(new ArrayList<>());
        }

        for (Task task : result.getCan()) {
            task.getTaskCategory().setTasks(new ArrayList<>());
            task.setUsersWhoCan(new ArrayList<>());
            task.setUsersWhoNeed(new ArrayList<>());
        }

        for (Task task : result.getNeedsTasks()) {
            task.getTaskCategory().setTasks(new ArrayList<>());
            task.setUsersWhoCan(new ArrayList<>());
            task.setUsersWhoNeed(new ArrayList<>());
        }

        return result;
    }

    @GetMapping("/search/user/location")
    public Iterable<User> usersByLocationName(@RequestParam String name) {
        return locationRepository.findByName(name).getUsers();
    }



}
