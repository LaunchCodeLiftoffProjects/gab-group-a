package com.helpinghands.backendPrototype.Models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Task extends AbstractEntity{

    @ManyToOne
    private TaskCategory taskCategory;

    @OneToMany(mappedBy = "can")
    private List<User> usersWhoCan = new ArrayList<>();

    @OneToMany(mappedBy = "needsTasks")
    private List<User> usersWhoNeed = new ArrayList<>();

    private float hoursWork;

    public TaskCategory getTaskCategory() {
        return taskCategory;
    }

    public void setTaskCategory(TaskCategory taskCategory) {
        this.taskCategory = taskCategory;
    }

    public List<User> getUsersWhoCan() {
        return usersWhoCan;
    }

    public void setUsersWhoCan(List<User> usersWhoCan) {
        this.usersWhoCan = usersWhoCan;
    }

    public List<User> getUsersWhoNeed() {
        return usersWhoNeed;
    }

    public void setUsersWhoNeed(List<User> usersWhoNeed) {
        this.usersWhoNeed = usersWhoNeed;
    }

    public float getHoursWork() {
        return hoursWork;
    }

    public void setHoursWork(float hoursWork) {
        this.hoursWork = hoursWork;
    }

    //not sure if this will work either. . .
//    private List<Task> wantsTaskInReturn;
//
//    private List<Item> wantsItemInReturn;


}
