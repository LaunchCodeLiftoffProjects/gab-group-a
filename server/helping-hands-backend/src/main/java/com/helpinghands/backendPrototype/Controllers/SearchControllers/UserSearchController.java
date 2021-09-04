package com.helpinghands.backendPrototype.Controllers.SearchControllers;

import com.helpinghands.backendPrototype.Data.ItemCategoryRepository;
import com.helpinghands.backendPrototype.Data.LocationRepository;
import com.helpinghands.backendPrototype.Data.TaskCategoryRepository;
import com.helpinghands.backendPrototype.Data.UserRepository;
import com.helpinghands.backendPrototype.Models.Item;
import com.helpinghands.backendPrototype.Models.ItemCategory;
import com.helpinghands.backendPrototype.Models.Task;
import com.helpinghands.backendPrototype.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin
public class UserSearchController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private ItemCategoryRepository itemCategoryRepository;

    @Autowired
    private TaskCategoryRepository taskCategoryRepository;

    @GetMapping("/search/users")
    public Iterable<User> userByName(@RequestParam(required = false) String name, @RequestParam(required = false) String locationName) {
        Iterable<User> result;

        if (name != null) {
            result = userRepository.findByNameContaining(name);
        } else {
            result = userRepository.findByLocationNameContaining(locationName);
        }
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

//    @GetMapping("/search/users/item-category")
//    public Iterable<User> usersByItemCategory(@RequestParam(required = false) Long id, @RequestBody(required = false) String name) {
//        Iterable<User> users;
//        if(id != null) {
//            ItemCategory category = itemCategoryRepository.findById(id).orElseThrow();
//            for (Item item : category.getItems()) {
//
//            }
//        } else {
//            Iterable<ItemCategory> categories = itemCategoryRepository.findByNameContaining(name);
//        }
//    }


}
