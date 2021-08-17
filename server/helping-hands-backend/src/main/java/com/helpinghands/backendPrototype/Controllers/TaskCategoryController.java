package com.helpinghands.backendPrototype.Controllers;

import com.helpinghands.backendPrototype.Data.ItemCategoryRepository;
import com.helpinghands.backendPrototype.Data.TaskCategoryRepository;
import com.helpinghands.backendPrototype.Models.ItemCategory;
import com.helpinghands.backendPrototype.Models.TaskCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class TaskCategoryController {
    @Autowired
    TaskCategoryRepository taskCategoryRepository;

    @GetMapping("/task-categories")
    @CrossOrigin
    Iterable<TaskCategory> all() {
        return taskCategoryRepository.findAll();
    }

    @GetMapping("task-categories/{id}")
    @CrossOrigin
    TaskCategory one(@PathVariable Long id) {
        return taskCategoryRepository.findById(id).orElseThrow(); //TODO add itemCategory not found exception here
    }
}
