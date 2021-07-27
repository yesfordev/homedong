package com.calisthenics.homedong.service;

import com.calisthenics.homedong.dto.UserDto;
import com.calisthenics.homedong.entity.User;

import java.util.Optional;

/**
 * Created by Seo Youngeun on ${DATE}
 */
public interface UserService {
    User signup(UserDto userDto);
    Optional<User> getUserWithRoles(String email);
    Optional<User> getMyUserWithRoles();
}
