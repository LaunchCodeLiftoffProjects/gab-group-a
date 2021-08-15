package com.helpinghands.backendPrototype.Models;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Item extends AbstractEntity {

    @ManyToOne
    @NotNull
    private ItemCategory itemCategory;

    @ManyToMany(mappedBy = "has")
    private List<User> usersWhoHave = new ArrayList<>();

    @ManyToMany(mappedBy = "needsItems")
    private List<User> usersWhoNeed = new ArrayList<>();
    
    //Should maybe move these quantities into the user class as a HashMap<Int/Long, Item>
    private int amtNeeded;

    private int amtHave;

    public Item() {}

    public Item(ItemCategory itemCategory) {
        this.itemCategory = itemCategory;
    }

    public ItemCategory getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(ItemCategory itemCategory) {
        this.itemCategory = itemCategory;
    }

    public List<User> getUsersWhoHave() {
        return usersWhoHave;
    }

    public void setUsersWhoHave(List<User> usersWhoHave) {
        this.usersWhoHave = usersWhoHave;
    }

    public List<User> getUsersWhoNeed() {
        return usersWhoNeed;
    }

    public void setUsersWhoNeed(List<User> usersWhoNeed) {
        this.usersWhoNeed = usersWhoNeed;
    }
}
