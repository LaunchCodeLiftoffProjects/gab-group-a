package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.Item;
import com.helpinghands.backendPrototype.Models.ItemCategory;
import org.springframework.data.repository.CrudRepository;

public interface ItemCategoryRepository extends CrudRepository<ItemCategory, Long> {

    Iterable<ItemCategory> findByNameContaining(String name);
}
