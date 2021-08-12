package com.helpinghands.backendPrototype.Data;
import com.helpinghands.backendPrototype.Models.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            log.info("Preloading " + userRepository.save(new User("Bilbo Baggins", "Tower Grove")));
            log.info("Preloading " + userRepository.save(new User("Frodo Baggins", "CWE")));
        };
    }
}