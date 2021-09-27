package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.Item;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ItemRepository extends CrudRepository<Item, Long> {

    List<Item> findByName(String name);
    List<Item> findByNameContaining(String name);
    List<Item> findByItemCategoryContaining(String category);
}
