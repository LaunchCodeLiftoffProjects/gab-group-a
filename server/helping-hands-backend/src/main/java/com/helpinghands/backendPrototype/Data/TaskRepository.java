package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Long> {

    List<Task> findByNameContaining(String name);
}
