package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.Location;
import com.helpinghands.backendPrototype.Models.Task;
import com.helpinghands.backendPrototype.Models.User;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Long> {

    Location findByLocationEquals(String name);
    User findByName (String Name);
    Task findByTaskIn(String Name);
}
