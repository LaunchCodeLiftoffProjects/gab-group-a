package com.helpinghands.backendPrototype.Controllers.SearchControllers;

import com.helpinghands.backendPrototype.Data.ItemCategoryRepository;
import com.helpinghands.backendPrototype.Data.ItemRepository;
import com.helpinghands.backendPrototype.Models.Item;
import com.helpinghands.backendPrototype.Models.ItemCategory;
import com.helpinghands.backendPrototype.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ItemSearchController {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemCategoryRepository itemCategoryRepository;

    @GetMapping("/search/items")
    public List<Item> itemsByName(@RequestParam(required = false) String name, @RequestParam(required = false) String category) {
        List<Item> result = new ArrayList<>();
        List<ItemCategory> resultCat;
        if(category != null) {
            resultCat = itemCategoryRepository.findByNameContaining(category);
            for (ItemCategory record : resultCat) {
                result.addAll(record.getItems());
            }
        } else if (name != null) {
            result = itemRepository.findByNameContaining(name);
        } else {
            result = new ArrayList<>();
        }
        for (Item item : result) {
            item.getItemCategory().setItems(new ArrayList<>());
            for (User user: item.getUsersWhoHave()) {
                user.setNeedsItems(new ArrayList<>());
                user.setNeedsTasks(new ArrayList<>());
                user.setHas(new ArrayList<>());
                user.setCan(new ArrayList<>());
                user.getLocation().setUsers(new ArrayList<>());
            }
            for (User user: item.getUsersWhoNeed()) {
                user.setNeedsItems(new ArrayList<>());
                user.setNeedsTasks(new ArrayList<>());
                user.setHas(new ArrayList<>());
                user.setCan(new ArrayList<>());
            }

        }

        return result;
    }

    //Find users that have an item
    @GetMapping("/search/items/users-have")
    public Iterable<User> usersWhoHave(@RequestParam String name) {
        Iterable<Item> items = itemRepository.findByNameContaining(name);
        List<User> usersWhoHave = new ArrayList<>();
        for (Item item : items) {
            for (User user : item.getUsersWhoHave()) {
                usersWhoHave.add(user);
            }
        }
        return usersWhoHave;
    }
}
