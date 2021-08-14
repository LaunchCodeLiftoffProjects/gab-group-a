package com.helpinghands.backendPrototype.Models;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class ItemCategory extends AbstractEntity {

    @OneToMany(mappedBy = "itemCategory")
    private List<Item> items;

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
