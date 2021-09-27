package com.helpinghands.backendPrototype.Models;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.sun.istack.NotNull;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class User extends AbstractEntity {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @ManyToOne
    private Location location;

    @ManyToMany
    private List<Item> has = new ArrayList<>();

    @ManyToMany
    private List<Item> needsItems = new ArrayList<>();

    @ManyToMany
    private List<Task> can = new ArrayList<>();

    @ManyToMany
    private List<Task> needsTasks = new ArrayList<>();

    @NotNull
    private String email;

    @NotNull
    private String pwHash;



    public User() {}

    // Constructor for registration processing in authentication controller
    public User(String name, String password, Location location){
        this.name = name;
        this.location = location;
        this.pwHash = encoder.encode(password);
    }

//    public User(Location location, String email, String password) {
//        this.location = location;
//        this.email = email;
//        this.pwHash = encoder.encode(password);
//    }

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, pwHash);
    }


//    public void addToNeedsItems(Item item) {
//        this.needsItems.add(item);
//    }
//
//    public void addToNeedsTasks(Task task) {
//        this.needsTasks.add(task);
//    }
//
//    public void addToHas(Item item) {
//        this.has.add(item);
//    }
//
//    public void addToCan(Task task) {
//        this.can.add(task);
//    }



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
