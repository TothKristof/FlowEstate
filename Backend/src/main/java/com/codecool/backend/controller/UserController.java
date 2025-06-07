package com.codecool.backend.controller;

import com.codecool.backend.controller.dto.JwtResponse;
import com.codecool.backend.controller.dto.UserRequest;
import com.codecool.backend.controller.dto.UserResponse;
import com.codecool.backend.model.UserEntity;
import com.codecool.backend.repository.UserRepository;
import com.codecool.backend.security.jwt.JwtUtils;
import com.codecool.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserService userService;

    public UserController(AuthenticationManager authenticationManager, JwtUtils jwtUtils, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse createUser(@RequestBody UserRequest signUpRequest) {
        return userService.register(signUpRequest);
    }

    @PostMapping("/login")
    public JwtResponse authenticateUser(@RequestBody UserRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        return new JwtResponse(jwt);
    }
}