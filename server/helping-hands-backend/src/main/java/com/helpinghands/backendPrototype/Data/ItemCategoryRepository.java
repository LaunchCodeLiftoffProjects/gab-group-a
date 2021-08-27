package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.ItemCategory;
import org.springframework.data.repository.CrudRepository;
import com.helpinghands.backendPrototype.Models.Item;

public interface ItemCategoryRepository extends CrudRepository<ItemCategory, Long> {

    Item findByItem (String Name);

}
