package com.helpinghands.backendPrototype.Controllers.SearchControllers;

import com.helpinghands.backendPrototype.Data.TaskCategoryRepository;
import com.helpinghands.backendPrototype.Data.TaskRepository;
import com.helpinghands.backendPrototype.Models.Task;
import com.helpinghands.backendPrototype.Models.TaskCategory;
import com.helpinghands.backendPrototype.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class TaskSearchController {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskCategoryRepository taskCategoryRepository;

    @GetMapping("/search/tasks")
    public List<Task> tasksByName(@RequestParam(required = false) String name, @RequestParam(required = false) String category) {
        List<Task> result = new ArrayList<>();
        List<TaskCategory> resultCat;
        if(category != null) {
            resultCat = taskCategoryRepository.findByNameContaining(category);
            for (TaskCategory record : resultCat) {
                result.addAll(record.getTasks());
            }
        } else if (name != null) {
            result = taskRepository.findByNameContaining(name);
        } else {
            result = new ArrayList<>();
        }
        for (Task task : result) {
            task.getTaskCategory().setTasks(new ArrayList<>());
            for (User user: task.getUsersWhoCan()) {
                user.setNeedsTasks(new ArrayList<>());
                user.setNeedsTasks(new ArrayList<>());
                user.setHas(new ArrayList<>());
                user.setCan(new ArrayList<>());
                user.getLocation().setUsers(new ArrayList<>());
            }
            for (User user: task.getUsersWhoNeed()) {
                user.setNeedsTasks(new ArrayList<>());
                user.setNeedsTasks(new ArrayList<>());
                user.setHas(new ArrayList<>());
                user.setCan(new ArrayList<>());
            }

        }

        return result;
    }

    //Find users that can an task
    @GetMapping("/search/tasks/users-can")
    public List<User> usersWhocan(@RequestParam String name) {
        Iterable<Task> tasks = taskRepository.findByNameContaining(name);
        List<User> usersWhoCan = new ArrayList<>();
        for (Task task : tasks) {
            for (User user : task.getUsersWhoCan()) {
                usersWhoCan.add(user);
            }
        }
        return usersWhoCan;
    }

    //Find users that need a task
    @GetMapping("/search/tasks/users-can")
    public List<User> usersWhoNeed(@RequestParam String name) {
        Iterable<Task> tasks = taskRepository.findByNameContaining(name);
        List<User> usersWhoNeed = new ArrayList<>();
        for (Task task : tasks) {
            for (User user : task.getUsersWhoNeed()) {
                usersWhoNeed.add(user);
            }
        }
        return usersWhoNeed;
    }
}
