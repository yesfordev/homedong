package com.calisthenics.homedong.api.controller;

import com.calisthenics.homedong.api.service.UserService;
import com.calisthenics.homedong.db.entity.User;
import com.calisthenics.homedong.error.ErrorResponse;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Yeseul Kim on 2021-08-15
 *
 * 관리자 Controller
 */
@Api(value = "관리자 API", tags = {"Admin"})
@Slf4j
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    @ApiOperation(value = "관리자가 유저 전체 정보 보기", notes = "<strong>헤더에 관리자임을 나타내는 jwt 토큰</strong>으로 유저 전체 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "유저 전체 정보 조회 성공", response = User.class),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUserInfo() {
        return ResponseEntity.ok(userService.getAllUserWithRoles());
    }

    @GetMapping("/{email}")
    @ApiOperation(value = "관리자가 유저 정보 보기", notes = "<strong>헤더에 관리자임을 나타내는 jwt 토큰과 pathVariable에 email로</strong> 유저 정보를 조회한다.")
    @ApiImplicitParam(name = "email", value = "조회할 유저의 email", required = true, dataType = "String", paramType = "path")
    @ApiResponses({
            @ApiResponse(code = 200, message = "유저 정보 조회 성공", response = User.class),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<User> getUserInfo(@PathVariable(required = true) String email) {
        return ResponseEntity.ok(userService.getUserWithRoles(email).get());
    }

    @DeleteMapping("/{email}")
    @ApiOperation(value = "관리자가 회원 삭제", notes = "<strong>헤더에 관리자임을 나타내는 jwt 토큰</strong>으로 해당 유저를 삭제시킨다.")
    @ApiImplicitParam(name = "email", value = "조회할 유저의 email", required = true, dataType = "String", paramType = "path")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 삭제 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "회원 탈퇴할 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity deleteUser(@PathVariable(required = true) String email) {
        userService.deleteUser(email);

        return new ResponseEntity(HttpStatus.OK);
    }

}