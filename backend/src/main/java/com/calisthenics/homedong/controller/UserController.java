package com.calisthenics.homedong.controller;

import com.calisthenics.homedong.config.request.SignUpReq;
import com.calisthenics.homedong.entity.User;
import com.calisthenics.homedong.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

/**
 * Created by Seo Youngeun on 2021-07-26
 *
 * 유저 관련 Controller
 */
@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity signup(@Valid @RequestBody SignUpReq signUpReq) {
        return new ResponseEntity<>(userService.signup(signUpReq));
    }

    @GetMapping("/signup/confirm")
    public ResponseEntity confirmEmail(@RequestParam Map<String, String> map) {
        //email, authKey가 일치할 경우 authStatus 업데이트
        User user = userService.updateAuthStatus(map);

        if(user == null) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity(HttpStatus.OK);
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