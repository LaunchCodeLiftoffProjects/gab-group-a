package com.helpinghands.backendPrototype.Controllers;

import com.helpinghands.backendPrototype.Data.ItemCategoryRepository;
import com.helpinghands.backendPrototype.Models.ItemCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ItemCategoryController {
    @Autowired
    ItemCategoryRepository itemCategoryRepository;

    @GetMapping("/item-categories")
    @CrossOrigin
    Iterable<ItemCategory> all() {
        return itemCategoryRepository.findAll();
    }

    @GetMapping("item-categories/{id}")
    @CrossOrigin
    ItemCategory one(@PathVariable Long id) {
        return itemCategoryRepository.findById(id).orElseThrow(); //TODO add itemCategory not found exception here
    }
}
