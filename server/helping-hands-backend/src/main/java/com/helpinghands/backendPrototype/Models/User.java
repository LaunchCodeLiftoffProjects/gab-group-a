package com.helpinghands.backendPrototype.Models;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
public class User extends AbstractEntity {

    @OneToOne
    private Location location;

    @OneToMany
    private List<Item> has;

    @OneToMany
    private List<Item> needsItems;

    @OneToMany
    private List<Task> can;

    @OneToMany
    private List<Task> needsDone;

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
