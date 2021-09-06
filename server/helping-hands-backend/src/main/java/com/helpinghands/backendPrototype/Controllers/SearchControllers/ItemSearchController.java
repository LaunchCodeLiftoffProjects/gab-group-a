package com.helpinghands.backendPrototype.Controllers.SearchControllers;

import com.helpinghands.backendPrototype.Data.ItemCategoryRepository;
import com.helpinghands.backendPrototype.Data.ItemRepository;
import com.helpinghands.backendPrototype.Models.Item;
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
    public Iterable<Item> itemsByName(@RequestParam(required = false) String name, @RequestParam(required=false) Boolean getUsersHave,
                                      @RequestParam (required = false) Boolean getUsersNeed) {
        List<Item> result = itemRepository.findByNameContaining(name);
        for (Item item : result) {
//            item.getItemCategory().setItems(new ArrayList<>()); //This is some database error do to how funked up everything is in there. Should maybe work when that's fixed?
            item.setItemCategory(null); //temporary fix
            for (User user: item.getUsersWhoHave()) {
                user.setNeedsItems(new ArrayList<>());
                user.setNeedsTasks(new ArrayList<>());
                user.setHas(new ArrayList<>());
                user.setCan(new ArrayList<>());
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
