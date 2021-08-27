package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.Item;
import org.springframework.data.repository.CrudRepository;
import com.helpinghands.backendPrototype.Models.Location;

public interface ItemRepository extends CrudRepository<Item, Long> {

    Item findByName (String Name);
    Location findByLocationEquals(String Name);
}
