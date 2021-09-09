package com.helpinghands.backendPrototype;

import com.helpinghands.backendPrototype.Controllers.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;


    @Test
    public void getUser_ShouldReturnUser() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.get("/users/{id}"))
                .andExpect(jsonPath("$.user").value("$.user"));



    }
}
