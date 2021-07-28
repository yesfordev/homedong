package com.calisthenics.homedong.service;

import com.calisthenics.homedong.dto.UserDto;
import com.calisthenics.homedong.entity.Role;
import com.calisthenics.homedong.entity.User;
import com.calisthenics.homedong.repository.UserRepository;
import com.calisthenics.homedong.util.SecurityUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

/**
 * Created by Seo Youngeun on 2021-07-26
 *
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현
 */
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, MailService mailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
    }

    @Transactional
    public HttpStatus signup(UserDto userDto) {
        if(userRepository.findOneWithRolesByEmail(userDto.getEmail()).orElse(null) != null) {
//            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
            return HttpStatus.CONFLICT;
        }

        Role role = Role.builder()
                .roleId(1)
                .roleName("ROLE_NAME")
                .build();

        String authKey = mailService.sendAuthMail(userDto.getEmail());

        if(authKey.equals("FAIL")) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        User user = User.builder()
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .nickname(userDto.getNickname())
                .roles(Collections.singleton(role))
                .isTutorialFinished(false)
                .authKey(authKey)
                .authStatus(false)
                .build();

        userRepository.save(user);
        return HttpStatus.OK;
    }

    @Transactional
    public Optional<User> getUserWithRoles(String email) {
        return userRepository.findOneWithRolesByEmail(email);
    }

    @Transactional
    public Optional<User> getMyUserWithRoles() {
        return SecurityUtil.getCurrentEmail().flatMap(userRepository::findOneWithRolesByEmail);
    }

    @Transactional
    public User updateAuthStatus(Map<String, String> map) {
        String email = map.get("email");
        String authKey = map.get("authKey");
        User updateUser = userRepository.findOneWithRolesByEmailAndAuthKey(email, authKey).orElse(null);

        if(updateUser == null) {
            return null;
        }
        updateUser.setAuthStatus(true);
        return userRepository.save(updateUser);
    }
}
