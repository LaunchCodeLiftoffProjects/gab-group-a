package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.TaskCategory;
import org.springframework.data.repository.CrudRepository;

public interface TaskCategoryRepository extends CrudRepository<TaskCategory, Long> {
}
