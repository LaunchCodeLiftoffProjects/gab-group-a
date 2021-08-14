package com.helpinghands.backendPrototype.Models;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.List;

@Entity
public class Item extends AbstractEntity {

    @ManyToOne
    @NotNull
    private ItemCategory itemCategory;

    @OneToMany
    private List<User> usersWhoHave;

    @ManyToMany
    private List<User> usersWhoNeed;

    //Will this work? Can I share this class across users but have different values for these?
//    private int amtNeeded;
//
//    private int amtHave;

    public Item() {}

    public Item(ItemCategory itemCategory) {
        this.itemCategory = itemCategory;
    }
}
