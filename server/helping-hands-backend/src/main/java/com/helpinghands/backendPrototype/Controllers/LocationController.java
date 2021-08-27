package com.helpinghands.backendPrototype.Controllers;


import com.helpinghands.backendPrototype.Data.LocationRepository;
import com.helpinghands.backendPrototype.Models.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
    public class LocationController {
        @Autowired
        private LocationRepository locationRepository;
    private Object LocationRepository;

    @CrossOrigin
        @GetMapping("/location")
        public Iterable<Location> allLocation() {
            return (Iterable<Location>) LocationRepository;
        }

        @CrossOrigin
        @PostMapping("/location")
        Location newLocation(@RequestBody Location newLocation) {
            return LocationRepository.save(newLocation);
        }

        @CrossOrigin
        @GetMapping("/location/{id}")
        Location one(@PathVariable Long id) {
            return (Location) LocationRepository;
            //TODO create an error handler for this
        }

        @CrossOrigin
        @PutMapping("/Location/{id}")
        public void updateItem(@PathVariable Long id, @RequestBody Location updatedLocation) {
        }

        @CrossOrigin
        @DeleteMapping("/location/{id}")
        public void deleteItem(@PathVariable Long id) {
            locationRepository.deleteById(id);
        }

    }

