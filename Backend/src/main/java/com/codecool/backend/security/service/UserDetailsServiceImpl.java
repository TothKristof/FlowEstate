package com.codecool.backend.security.service;


import com.codecool.backend.model.Role;
import com.codecool.backend.model.UserEntity;
import com.codecool.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        UserEntity user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email));

        List<SimpleGrantedAuthority> roles = new ArrayList<>();
        for (Role role : user.getRoles()) {
            roles.add(new SimpleGrantedAuthority(role.name()));
        }

        return new User(user.getEmail(), user.getPassword(),roles);
    }
}