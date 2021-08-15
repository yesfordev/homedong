package com.calisthenics.homedong.api.service;

import com.calisthenics.homedong.api.request.ChangeNicknameReq;
import com.calisthenics.homedong.api.request.ChangePasswordReq;
import com.calisthenics.homedong.api.request.PasswordReq;
import com.calisthenics.homedong.api.request.SignUpReq;
import com.calisthenics.homedong.db.entity.Role;
import com.calisthenics.homedong.db.entity.User;
import com.calisthenics.homedong.db.repository.UserRepository;
import com.calisthenics.homedong.error.exception.custom.EmailDuplicateException;
import com.calisthenics.homedong.error.exception.custom.NicknameDuplicateException;
import com.calisthenics.homedong.error.exception.custom.UserNotFoundException;
import com.calisthenics.homedong.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.net.UnknownHostException;
import java.util.Collections;
import java.util.HashMap;
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

    @Value("${custom.imgcnt}")
    private Integer imgCnt;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, MailService mailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
    }

    @Transactional
    public User signup(final SignUpReq signUpReq) throws MessagingException, UnknownHostException {
        if (userRepository.findOneWithRolesByEmail(signUpReq.getEmail()).orElse(null) != null) {
            throw new EmailDuplicateException(signUpReq);
        }

        Role role = Role.builder()
                .roleId(1)
                .roleName("ROLE_USER")
                .build();

        String authKey = mailService.sendAuthMail(signUpReq.getEmail(), signUpReq.getNickname());
        int imgNum = (int) (Math.random()*25 + 1);

        User user = User.builder()
                .email(signUpReq.getEmail())
                .password(passwordEncoder.encode(signUpReq.getPassword()))
                .nickname(signUpReq.getNickname())
                .roles(Collections.singleton(role))
                .isTutorialFinished(false)
                .img(Integer.toString(imgNum))
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

    public Map<String, Boolean> checkPassword(PasswordReq passwordReq) {
        User user = userRepository.findOneWithRolesByEmail(SecurityUtil.getCurrentEmail().orElse("")).orElse(null);

        if(user == null) {
            throw new UserNotFoundException(SecurityUtil.getCurrentEmail().orElse(null));
        }

        Map<String, Boolean> check = new HashMap<>();

        if(!passwordEncoder.matches(passwordReq.getPassword(), user.getPassword())) {
            check.put("check", false);
        } else {
            check.put("check", true);
        }

        return check;
    }

    @Transactional
    public void updatePassword(ChangePasswordReq changePasswordReq) {
        User updateUser = userRepository.findOneWithRolesByEmail(SecurityUtil.getCurrentEmail().orElse("")).orElse(null);

        if(updateUser == null) {
            throw new UserNotFoundException(SecurityUtil.getCurrentEmail().orElse(null));
        }

        updateUser.setPassword(passwordEncoder.encode(changePasswordReq.getChangePassword()));

        userRepository.save(updateUser);
    }

    @Transactional
    public void updateNickname(ChangeNicknameReq changeNicknameReq) {
        User updateUser = userRepository.findOneWithRolesByEmail(SecurityUtil.getCurrentEmail().orElse(null)).orElse(null);

        if(updateUser == null) {
            throw new UserNotFoundException(SecurityUtil.getCurrentEmail().orElse(null));
        }

        updateUser.setNickname(changeNicknameReq.getChangeNickname());

        userRepository.save(updateUser);
    }

    @Transactional
    public void updateProfileImage(String imgNum) {
        User updateUser = userRepository.findOneWithRolesByEmail(SecurityUtil.getCurrentEmail().orElse(null)).orElse(null);

        if(updateUser == null) {
            throw new UserNotFoundException(SecurityUtil.getCurrentEmail().orElse(null));
        }

        updateUser.setImg(imgNum);

        userRepository.save(updateUser);
    }

}
