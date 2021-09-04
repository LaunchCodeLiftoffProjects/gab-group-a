package com.helpinghands.backendPrototype.Controllers;

import com.helpinghands.backendPrototype.Data.UserRepository;
import com.helpinghands.backendPrototype.Models.User;
import com.helpinghands.backendPrototype.Models.dto.LoginFormDTO;
import com.helpinghands.backendPrototype.Models.dto.RegisterFormDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin
@RestController
public class AuthenticationController {

    @Autowired
    UserRepository userRepository;

    // ---- Stores and retrieves login status of a user in a session. ---
    private static final String userSessionKey = "user";

    public User getUserFromSession(HttpSession session) {
        Long userId = (Long) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }

        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            return null;
        }

        return user.get();
    }

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }
    // -----------------------------------------------------------------


    @PostMapping("/register")
    public String processRegistrationForm(@RequestBody RegisterFormDTO newUser, Errors errors, HttpServletRequest request) {

        if (errors.hasErrors()) {
            return "An error occurred.";
        }

        User existingUser = userRepository.findByName(newUser.getUsername());

        if (existingUser != null) {
            errors.rejectValue("username", "username.alreadyexists", "A user with that username already exists");
            return errors.getFieldError().getDefaultMessage();
        }

        String password = newUser.getPassword();
        String verifyPassword = newUser.getVerifyPassword();
        if (!password.equals(verifyPassword)) {
            errors.rejectValue("password", "passwords.mismatch", "Passwords do not match");
           return errors.getFieldError().getDefaultMessage();
        }


        User registratingUser = new User(newUser.getUsername(), newUser.getPassword());
        setUserInSession(request.getSession(), registratingUser);
        userRepository.save(registratingUser);
        return "Registration successful.";

    }



    @PostMapping("/login")
    public String processLoginForm(@RequestBody @Valid LoginFormDTO userLoggingIn,
                                   Errors errors, HttpServletRequest request) {

        if (errors.hasErrors()) {
            return "An error occurred.";
        }

        User theUser = userRepository.findByName(userLoggingIn.getUsername());

        if (theUser == null) {
            errors.rejectValue("username", "user.invalid", "The given username does not exist");
           return errors.getFieldError().getDefaultMessage();
        }

        String password = userLoggingIn.getPassword();

        if (!theUser.isMatchingPassword(password)) {
            errors.rejectValue("password", "password.invalid", "Invalid password");
            return errors.getFieldError().getDefaultMessage();
        }

        setUserInSession(request.getSession(), theUser);

        return "Login successful.";
    }


    @GetMapping("/logout")
    public String logout(HttpServletRequest request){
        request.getSession().invalidate();
        return "Logout successful.";
    }


}
