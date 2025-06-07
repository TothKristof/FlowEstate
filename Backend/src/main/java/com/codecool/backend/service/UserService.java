package com.codecool.backend.service;

import com.codecool.backend.controller.dto.UserRequest;
import com.codecool.backend.controller.dto.UserResponse;
import com.codecool.backend.exception.RegistrationError;
import com.codecool.backend.model.Role;
import com.codecool.backend.model.UserEntity;
import com.codecool.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {
    private UserRepository userRepository;
    private final PasswordEncoder encoder;

    public UserService(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public UserResponse register(UserRequest signUpRequest) {
        try{
            UserEntity user = new UserEntity();
            user.setPassword(encoder.encode(signUpRequest.password()));
            user.setEmail(signUpRequest.email());
            user.setProvider("Manual");
            user.setRoles(Set.of(Role.ROLE_USER));
            userRepository.save(user);
            return new UserResponse(user.getId(), user.getEmail(), "Registered");
        } catch (Exception e) {
            throw new RegistrationError();
        }
    }
}
