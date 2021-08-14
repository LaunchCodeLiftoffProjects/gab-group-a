package com.helpinghands.backendPrototype.Models;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.List;

@Entity
public class Task extends AbstractEntity{

    @OneToOne
    private TaskCategory category;

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
