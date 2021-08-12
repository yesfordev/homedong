package com.calisthenics.homedong.api.controller;

import com.calisthenics.homedong.api.request.LoginReq;
import com.calisthenics.homedong.api.response.TokenRes;
import com.calisthenics.homedong.error.ErrorResponse;
import com.calisthenics.homedong.jwt.JwtFilter;
import com.calisthenics.homedong.jwt.TokenProvider;
import io.swagger.annotations.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public AuthController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
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

        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenRes(jwt), httpHeaders, HttpStatus.OK);
    }
}