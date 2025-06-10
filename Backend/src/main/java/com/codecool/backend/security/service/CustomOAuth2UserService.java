package com.codecool.backend.security.service;

import com.codecool.backend.model.Role;
import com.codecool.backend.model.UserEntity;
import com.codecool.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private static final Logger logger = LoggerFactory.getLogger(CustomOAuth2UserService.class);
    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        logger.info("🔍 CustomOAuth2UserService.loadUser called with request: {}", userRequest);
        OAuth2User oAuth2User = super.loadUser(userRequest);

        logger.info("🔍 OAuth2 user attributes: {}", oAuth2User.getAttributes());
        String email = oAuth2User.getAttribute("email");
        logger.info("🔍 Extracted email: {}", email);

        if (email == null) {
            logger.error("❌ Email attribute is missing from OAuth2 user");
            throw new IllegalStateException("Email attribute is missing from OAuth2 user");
        }

        Optional<UserEntity> userOpt = userRepository.findUserByEmail(email);
        UserEntity user = userOpt.orElseGet(() -> {
            logger.info("🔑 Creating new user with email: {}", email);
            UserEntity newUser = new UserEntity();
            newUser.setEmail(email);
            newUser.setProvider("GOOGLE");
            newUser.setRoles(Collections.singleton(Role.ROLE_USER));
            UserEntity savedUser = userRepository.save(newUser);
            logger.info("✅ New user saved to database: {}", savedUser);
            return savedUser;
        });

        DefaultOAuth2User userToReturn = new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                oAuth2User.getAttributes(),
                "email"
        );

        logger.info("🔚 Returning user: {}", userToReturn);
        return userToReturn;
    }
}

