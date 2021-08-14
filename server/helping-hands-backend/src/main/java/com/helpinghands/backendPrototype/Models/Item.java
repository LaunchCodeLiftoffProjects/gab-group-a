package com.helpinghands.backendPrototype.Models;

import com.sun.istack.NotNull;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.List;

@Entity
public class Item extends AbstractEntity {

    @OneToOne
    @NotNull
    private ItemCategory category;

    @OneToMany
    private List<User> usersWhoHave;

    @ManyToMany
    private List<User> usersWhoNeed;

    //Will this work? Can I share this class across users but have different values for these?
//    private int amtNeeded;
//
//    private int amtHave;

    public Item() {}

    public Item(ItemCategory category) {
        this.category = category;
    }
}
