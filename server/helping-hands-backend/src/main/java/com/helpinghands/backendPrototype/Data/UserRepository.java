package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.Task;
import com.helpinghands.backendPrototype.Models.User;
import org.springframework.data.repository.CrudRepository;
import com.helpinghands.backendPrototype.Models.Item;
import com.helpinghands.backendPrototype.Models.Location;

import java.util.List;


public interface UserRepository extends CrudRepository<User, Long> {

    User findByName(String name);
    List<User> findByNameContaining(String name);
    List<User> findByLocationNameContaining(String locationName);
    List<User> findByEmailContaining(String email);
//    List<User> findByNeedsItemsNameContains(String item); //This won't work. Need to find the item, and then grab the users off the usersWho arrays


}
