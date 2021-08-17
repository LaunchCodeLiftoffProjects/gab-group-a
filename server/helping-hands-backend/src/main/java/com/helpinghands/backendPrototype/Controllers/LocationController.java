package com.helpinghands.backendPrototype.Controllers;


import com.helpinghands.backendPrototype.Data.LocationRepository;
import com.helpinghands.backendPrototype.Models.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
    public class LocationController {
        @Autowired
        private LocationRepository locationRepository;

        @CrossOrigin
        @GetMapping("/location")
        public Iterable<Location> allLocation() {
            return LocationRepository.findAll();
        }

        @CrossOrigin
        @PostMapping("/location")
        Location newLocation(@RequestBody Location newLocation) {
            return LocationRepository.save(newLocation);
        }

        @CrossOrigin
        @GetMapping("/location/{id}")
        Location one(@PathVariable Long id) {
            return LocationRepository.findById(id).orElseThrow();
            //TODO create an error handler for this
        }

        @CrossOrigin
        @PutMapping("/Location/{id}")
        Location updateItem(@PathVariable Long id, @RequestBody Location updatedLocation) {
            Location location = LocationRepository.findById(id).map(Location -> {
                Location.setName(updatedLocation.getName());
                return locationRepository.save(updatedLocation);
            }).orElseGet(() -> {
                updatedLocation.setId(id);
                return locationRepository.save(updatedLocation);
            });

            return location;
        }

        @CrossOrigin
        @DeleteMapping("/location/{id}")
        void deleteItem(@PathVariable Long id) {
            locationRepository.deleteById(id);
        }

    }

