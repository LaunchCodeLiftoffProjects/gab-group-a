package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.Item;
import com.helpinghands.backendPrototype.Models.ItemCategory;
import org.springframework.data.repository.CrudRepository;
import com.helpinghands.backendPrototype.Models.Item;

import java.util.List;

public interface ItemCategoryRepository extends CrudRepository<ItemCategory, Long> {

    List<ItemCategory> findByNameContaining(String name);
}
