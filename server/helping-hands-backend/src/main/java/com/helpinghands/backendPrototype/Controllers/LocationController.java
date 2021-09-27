package com.helpinghands.backendPrototype.Controllers;

import com.helpinghands.backendPrototype.Data.LocationRepository;
import com.helpinghands.backendPrototype.Models.Item;
import com.helpinghands.backendPrototype.Models.Location;
import com.helpinghands.backendPrototype.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    @GetMapping("/location/{id}")
    @CrossOrigin
    public Location one(@PathVariable Long id) {
        Location result = locationRepository.findById(id).orElseThrow();
        for (User user : result.getUsers()) {
            user.setLocation(null);
            for (Item item : user.getNeedsItems()) {
                item.setItemCategory(null);
                item.setUsersWhoNeed(null);
                item.setUsersWhoHave(null);
            }
//            user.setNeedsItems(null);
            user.setCan(null);
            user.setHas(null);
            user.setNeedsTasks(null);
        }
        return result;
    }
}
