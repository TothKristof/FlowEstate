package com.codecool.backend.controller;

import lombok.extern.java.Log;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @PostMapping("/registration")
    public ResponseEntity<?> register(){
        return ResponseEntity.ok("REGISTRATION");
    }
}