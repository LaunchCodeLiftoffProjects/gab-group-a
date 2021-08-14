package com.helpinghands.backendPrototype.Models;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
public class User extends AbstractEntity {

    @ManyToOne
    private Location location;

    @ManyToMany
    private List<Item> has;

    @ManyToMany
    private List<Item> needsItems;

    @ManyToMany
    private List<Task> can;

    @ManyToMany
    private List<Task> needsTasks;

    public User() {}

    public User(Location location) {
        this.location = location;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<Item> getHas() {
        return has;
    }

    public void setHas(List<Item> has) {
        this.has = has;
    }

    public List<Item> getNeedsItems() {
        return needsItems;
    }

    public void setNeedsItems(List<Item> needsItems) {
        this.needsItems = needsItems;
    }

    public List<Task> getCan() {
        return can;
    }

    public void setCan(List<Task> can) {
        this.can = can;
    }

    public List<Task> getNeedsTasks() {
        return needsTasks;
    }

    public void setNeedsTasks(List<Task> needsTasks) {
        this.needsTasks = needsTasks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof User))
            return false;
        User user = (User) o;
        return Objects.equals(this.id, user.id) && Objects.equals(this.name, user.name)
                && Objects.equals(this.location, user.location);
    }




}
