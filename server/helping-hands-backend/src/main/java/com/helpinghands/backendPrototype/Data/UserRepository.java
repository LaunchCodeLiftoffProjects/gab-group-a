package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.Task;
import com.helpinghands.backendPrototype.Models.User;
import org.springframework.data.repository.CrudRepository;
import com.helpinghands.backendPrototype.Models.Item;
import com.helpinghands.backendPrototype.Models.Location;


public interface UserRepository extends CrudRepository<User, Long> {

    User findByName (String Name);
    Item findByItem (String Item);
    Location findByLocationEquals (String Location);
    Task findByTaskIn(String Name);

}
