package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.Location;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LocationRepository extends CrudRepository<Location, Long> {

    Location findByName(String name);
    List<Location> findByNameContaining(String name);

}
