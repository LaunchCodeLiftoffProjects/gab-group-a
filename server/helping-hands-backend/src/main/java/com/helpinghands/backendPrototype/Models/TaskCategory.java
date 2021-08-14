package com.helpinghands.backendPrototype.Models;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class TaskCategory extends AbstractEntity {

    @OneToMany(mappedBy = "taskCategory")
    private List<Task> tasks;
}
