package com.calisthenics.homedong.api.controller;

import com.calisthenics.homedong.api.request.LoginReq;
import com.calisthenics.homedong.api.response.TokenRes;
import com.calisthenics.homedong.api.service.UserService;
import com.calisthenics.homedong.error.ErrorResponse;
import com.calisthenics.homedong.jwt.JwtFilter;
import com.calisthenics.homedong.jwt.TokenProvider;
import io.swagger.annotations.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Created by Seo Youngeun on 2021-07-26
 *
 * 인증 처리 Controller
 */
@Api(value = "인증 API", tags = {"Auth"})
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserService userService;

    public AuthController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder, UserService userService) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userService = userService;
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>이메일과 패스워드</strong>를 통해 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그인 성공(헤더에도 토근 있음)", response = TokenRes.class),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "인증 실패(없는 사용자 or 비밀번호 오류 or 이메일 미인증)", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ErrorResponse.class)
    })
    public ResponseEntity<TokenRes> authorize(@Valid @RequestBody LoginReq loginReq) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginReq.getEmail(), loginReq.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        userService.updateIsLogin(true);
        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenRes(jwt), httpHeaders, HttpStatus.OK);
    }

    @PutMapping("/logout")
    @ApiOperation(value = "로그아웃(isLogin - false로 변경)", notes = "<strong>토큰</strong>을 통해 로그아웃 한다. is_login 상태를 false로 바꿔준다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그아웃 성공", response = TokenRes.class),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "인증 실패(없는 사용자 or 비밀번호 오류 or 이메일 미인증)", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "회원 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity logout() {
        userService.updateIsLogin(false);

        return new ResponseEntity(HttpStatus.OK);
    }
}