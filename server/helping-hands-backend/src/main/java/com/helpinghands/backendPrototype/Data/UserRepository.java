package com.helpinghands.backendPrototype.Data;

import com.helpinghands.backendPrototype.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}

