package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Long> {
}
