package com.helpinghands.backendPrototype.Models;

import org.hibernate.annotations.NotFound;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.List;

@Entity
public class Item extends AbstractEntity {

    @OneToOne
    @NotFound
    private ItemCategory category;

    @OneToMany
    private List<User> usersWhoHave;

    @OneToMany
    private List<User> usersWhoNeed;
}
