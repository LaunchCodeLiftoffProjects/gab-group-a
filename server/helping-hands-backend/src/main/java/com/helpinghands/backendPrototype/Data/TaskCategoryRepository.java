package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.TaskCategory;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskCategoryRepository extends CrudRepository<TaskCategory, Long> {

    List<TaskCategory> findByNameContaining(String name);
}
