package com.helpinghands.backendPrototype.Models.dto;

import com.helpinghands.backendPrototype.Models.Location;

public class RegisterFormDTO extends LoginFormDTO {

    private String verifyPassword;

    private Location location;

    public String getVerifyPassword() {
        return verifyPassword;
    }

    public void setVerifyPassword(String verifyPassword) {
        this.verifyPassword = verifyPassword;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
