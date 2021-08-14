package com.helpinghands.backendPrototype.Models;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.List;

@Entity
public class Item extends AbstractEntity {

    @ManyToOne
    @NotNull
    private ItemCategory itemCategory;

    @ManyToMany(mappedBy = "has")
    private List<User> usersWhoHave;

    @ManyToMany(mappedBy = "needsItems")
    private List<User> usersWhoNeed;

    //Will this work? Can I share this class across users but have different values for these?
//    private int amtNeeded;
//
//    private int amtHave;

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
