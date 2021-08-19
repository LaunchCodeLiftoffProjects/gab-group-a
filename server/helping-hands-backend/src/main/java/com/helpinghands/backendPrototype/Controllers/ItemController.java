package com.helpinghands.backendPrototype.Controllers;

import com.helpinghands.backendPrototype.Data.ItemRepository;
import com.helpinghands.backendPrototype.Models.Item;
import com.helpinghands.backendPrototype.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class ItemController {
    @Autowired
    private ItemRepository itemRepository;

    @CrossOrigin
    @GetMapping("/items")
    public Iterable<Item> allItems() {
        Iterable<Item> items = itemRepository.findAll();
        for (Item item : items) {
            item.getItemCategory().setItems(new ArrayList<>());
        }
        return items;
    }

    @CrossOrigin
    @PostMapping("/items")
    Item newItem(@RequestBody Item newItem) {
        return itemRepository.save(newItem);
    }

    @CrossOrigin
    @GetMapping("/items/{id}")
    Item one(@PathVariable Long id) {
       return itemRepository.findById(id).orElseThrow();
       //TODO create an error handler for this
    }

    @CrossOrigin
    @PutMapping("/items/{id}")
    Item updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        return itemRepository.findById(id).map( item -> {
            item.setName(updatedItem.getName());
            item.setDescription(updatedItem.getDescription());
            item.setItemCategory(updatedItem.getItemCategory());
            return itemRepository.save(item);
        }).orElseGet(()-> {
            updatedItem.setId(id);
            return itemRepository.save(updatedItem);
        });
    }

    @CrossOrigin
    @DeleteMapping("/items/{id}")
    void deleteItem(@PathVariable Long id) {
        itemRepository.deleteById(id);
    }

}
