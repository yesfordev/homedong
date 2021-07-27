package com.calisthenics.homedong.service;

import com.calisthenics.homedong.dto.UserDto;
import com.calisthenics.homedong.entity.Role;
import com.calisthenics.homedong.entity.User;
import com.calisthenics.homedong.repository.UserRepository;
import com.calisthenics.homedong.util.SecurityUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Collections;
import java.util.Optional;

/**
 * Created by Seo Youngeun on 2021-07-26
 *
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현
 */
@Service("userService")
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User signup(UserDto userDto) {
        if(userRepository.findOneWithRolesByEmail(userDto.getEmail()).orElse(null) != null) {
//            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
            return null;
        }

        Role role = Role.builder()
                .roleId(1)
                .roleName("ROLE_NAME")
                .build();

        User user = User.builder()
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .nickname(userDto.getNickname())
                .roles(Collections.singleton(role))
                .isTutorialFinished(false)
                .build();

        return userRepository.save(user);
    }

    @Transactional
    public Optional<User> getUserWithRoles(String email) {
        return userRepository.findOneWithRolesByEmail(email);
    }

    @Transactional
    public Optional<User> getMyUserWithRoles() {
        return SecurityUtil.getCurrentEmail().flatMap(userRepository::findOneWithRolesByEmail);
    }
}
