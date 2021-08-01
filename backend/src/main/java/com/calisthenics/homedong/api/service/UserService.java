package com.calisthenics.homedong.api.service;

import com.calisthenics.homedong.api.dto.SignUpReq;
import com.calisthenics.homedong.db.entity.Role;
import com.calisthenics.homedong.db.entity.User;
import com.calisthenics.homedong.db.repository.UserRepository;
import com.calisthenics.homedong.error.exception.custom.EmailDuplicateException;
import com.calisthenics.homedong.error.exception.custom.NicknameDuplicateException;
import com.calisthenics.homedong.error.exception.custom.UserNotFoundException;
import com.calisthenics.homedong.util.SecurityUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

/**
 * Created by Seo Youngeun on 2021-07-26
 * <p>
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
    public User signup(final SignUpReq signUpReq) {
        if (userRepository.findOneWithRolesByEmail(signUpReq.getEmail()).orElse(null) != null) {
            throw new EmailDuplicateException(signUpReq);
        }

        Role role = Role.builder()
                .roleId(1)
                .roleName("ROLE_USER")
                .build();

        String authKey = mailService.sendAuthMail(signUpReq.getEmail());

        User user = User.builder()
                .email(signUpReq.getEmail())
                .password(passwordEncoder.encode(signUpReq.getPassword()))
                .nickname(signUpReq.getNickname())
                .roles(Collections.singleton(role))
                .isTutorialFinished(false)
                .authKey(authKey)
                .authStatus(false)
                .build();

        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithRoles(final String email) {
        return userRepository.findOneWithRolesByEmail(email);
    }

    @Transactional(readOnly = true)
    public Optional<User> getMyUserWithRoles() {
        return SecurityUtil.getCurrentEmail().flatMap(userRepository::findOneWithRolesByEmail);
    }

    @Transactional
    public User updateAuthStatus(Map<String, String> map) {
        String email = map.get("email");
        String authKey = map.get("authKey");
        User updateUser = userRepository.findOneWithRolesByEmailAndAuthKey(email, authKey).orElse(null);

        if (updateUser == null) {
            throw new UserNotFoundException(email);
        }

        updateUser.setAuthStatus(true);
        return userRepository.save(updateUser);
    }

    public void checkDuplicateNickname(String nickname) {
        if(userRepository.findAllByNickname(nickname).size() > 0) {
            throw new NicknameDuplicateException(nickname);
        }
    }

    @Transactional
    public void deleteUser() {
        if(userRepository.deleteByEmail(SecurityUtil.getCurrentEmail().orElse("")) == 0) {
            throw new UserNotFoundException(SecurityUtil.getCurrentEmail().orElse(""));
        }
    }
}
