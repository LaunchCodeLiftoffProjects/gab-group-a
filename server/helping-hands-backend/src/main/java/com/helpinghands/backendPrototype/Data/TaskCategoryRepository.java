package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.Location;
import com.helpinghands.backendPrototype.Models.Task;
import com.helpinghands.backendPrototype.Models.TaskCategory;
import org.springframework.data.repository.CrudRepository;

public interface TaskCategoryRepository extends CrudRepository<TaskCategory, Long> {

    Location findByLocationEquals(String Location);
    Task findByTaskIn(String Task);
    TaskCategory findByTaskCategoryContaining(String Category);
}
