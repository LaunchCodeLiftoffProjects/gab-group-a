package com.helpinghands.backendPrototype.Models;

import javax.persistence.*;
import java.util.List;

@Entity
public class Task extends AbstractEntity{

    @ManyToOne
    private TaskCategory taskCategory;

    @OneToMany
    private List<User> usersWhoCan;

    @ManyToMany
    private List<User> usersWhoNeed;

    private float hoursWork;

    //not sure if this will work either. . .
//    private List<Task> wantsTaskInReturn;
//
//    private List<Item> wantsItemInReturn;


}
