package com.helpinghands.backendPrototype.Controllers;

import com.helpinghands.backendPrototype.Data.TaskRepository;
import com.helpinghands.backendPrototype.Models.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @CrossOrigin
    @GetMapping("/tasks")
    public Iterable<Task> allTasks() {
        return taskRepository.findAll();
    }

    @CrossOrigin
    @PostMapping("/tasks")
    Task newTask(@RequestBody Task newTask) {
        return taskRepository.save(newTask);
    }

    @CrossOrigin
    @GetMapping("/tasks/{id}")
    Task one(@PathVariable Long id) {
        return taskRepository.findById(id).orElseThrow();
        //TODO create an error handler for this
    }

    @CrossOrigin
    @PutMapping("/tasks/{id}")
    Task updateItem(@PathVariable Long id, @RequestBody Task updatedTask) {
        return taskRepository.findById(id).map( task -> {
            task.setName(updatedTask.getName());
            task.setDescription(updatedTask.getDescription());
            task.setTaskCategory(updatedTask.getTaskCategory());
            return taskRepository.save(task);
        }).orElseGet(()-> {
            updatedTask.setId(id);
            return taskRepository.save(updatedTask);
        });
    }

    @CrossOrigin
    @DeleteMapping("/tasks/{id}")
    void deleteItem(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }

}
