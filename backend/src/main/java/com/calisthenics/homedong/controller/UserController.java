package com.calisthenics.homedong.controller;

import com.calisthenics.homedong.dto.UserDto;
import com.calisthenics.homedong.entity.User;
import com.calisthenics.homedong.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Created by Seo Youngeun on 2021-07-26
 */
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@Valid @RequestBody UserDto userDto) {
        User newUser = userService.signup(userDto);

        if(newUser == null) {
            return new ResponseEntity<>(newUser, HttpStatus.CONFLICT);
        }
        return ResponseEntity.ok(userService.signup(userDto));
    }

    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<User> getMyUserInfo() {
        return ResponseEntity.ok(userService.getMyUserWithRoles().get());
    }

    @GetMapping("/user/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<User> getUserInfo(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserWithRoles(email).get());
    }
}