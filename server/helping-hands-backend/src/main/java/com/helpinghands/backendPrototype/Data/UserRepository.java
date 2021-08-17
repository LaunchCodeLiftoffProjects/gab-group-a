package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.User;
import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String name);

}
