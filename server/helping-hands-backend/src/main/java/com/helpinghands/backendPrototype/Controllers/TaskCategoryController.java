package com.helpinghands.backendPrototype.Controllers;

import com.helpinghands.backendPrototype.Data.TaskCategoryRepository;
import com.helpinghands.backendPrototype.Models.TaskCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController

public class TaskCategoryController {
    @Autowired
    TaskCategoryRepository taskCategoryRepository;

    @GetMapping("/task-categories")
    @CrossOrigin
    Iterable<TaskCategory> all() {
        Iterable<TaskCategory> taskCategories = taskCategoryRepository.findAll();
        for (TaskCategory category : taskCategories) {
            category.setTasks(new ArrayList<>());
        }
        return taskCategories;
    }

    @GetMapping("task-categories/{id}")
    @CrossOrigin
    TaskCategory one(@PathVariable Long id) {
        return taskCategoryRepository.findById(id).orElseThrow(); //TODO add itemCategory not found exception here
    }

}
