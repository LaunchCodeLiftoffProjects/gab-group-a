package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.Item;
import com.helpinghands.backendPrototype.Models.Location;
import com.helpinghands.backendPrototype.Models.User;
import com.mysql.cj.xdevapi.Collection;
import org.springframework.data.repository.CrudRepository;

public interface LocationRepository extends CrudRepository<Location, Long> {

    Item findByItem(String Name);
    User findByName (String Name);
    Location findByLocationEquals(String Name);

}

