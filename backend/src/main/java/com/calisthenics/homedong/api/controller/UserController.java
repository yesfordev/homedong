package com.calisthenics.homedong.api.controller;

import com.calisthenics.homedong.api.dto.SignUpReq;
import com.calisthenics.homedong.db.entity.User;
import com.calisthenics.homedong.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.ws.Response;
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
    public ResponseEntity<User> signup(@Valid @RequestBody SignUpReq signUpReq) {
        return ResponseEntity.ok(userService.signup(signUpReq));
    }

    @GetMapping("/signup/confirm")
    public ResponseEntity confirmEmail(@RequestParam Map<String, String> map) {
        //email, authKey가 일치할 경우 authStatus 업데이트
        userService.updateAuthStatus(map);

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/user/me")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<User> getMyUserInfo() {
        return ResponseEntity.ok(userService.getMyUserWithRoles().get());
    }

    @GetMapping("/user/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<User> getUserInfo(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserWithRoles(email).get());
    }

    @GetMapping("/user/check")
    public ResponseEntity checkDuplicateNickname(@RequestParam String nickname) {
        userService.checkDuplicateNickname(nickname);

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/user")
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity deleteUser() {
        userService.deleteUser();

        return new ResponseEntity(HttpStatus.OK);
    }
}