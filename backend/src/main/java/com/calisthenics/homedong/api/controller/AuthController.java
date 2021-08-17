package com.calisthenics.homedong.api.controller;

import com.calisthenics.homedong.api.request.LoginReq;
import com.calisthenics.homedong.api.request.LogoutReq;
import com.calisthenics.homedong.api.response.TokenRes;
import com.calisthenics.homedong.api.service.UserService;
import com.calisthenics.homedong.error.ErrorResponse;
import com.calisthenics.homedong.jwt.JwtFilter;
import com.calisthenics.homedong.jwt.TokenProvider;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Created by Seo Youngeun on 2021-07-26
 *
 * 인증 처리 Controller
 */
@Api(value = "인증 API", tags = {"Auth"})
@RestController
@Slf4j
@RequestMapping("/api/auth")
public class AuthController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final StringRedisTemplate redisTemplate;

    @Autowired
    public AuthController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder, StringRedisTemplate redisTemplate) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.redisTemplate = redisTemplate;
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>이메일과 패스워드</strong>를 통해 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그인 성공(헤더에도 토근 있음)", response = TokenRes.class),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "인증 실패(없는 사용자 or 비밀번호 오류 or 이메일 미인증)", response = ErrorResponse.class),
            @ApiResponse(code = 409, message = "이미 로그인 되어있는 사용자", response = ErrorResponse.class),
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

    @PostMapping("/logout")
    @ApiOperation(value = "로그아웃(isLogin - false로 변경)", notes = "<strong>토큰</strong>을 통해 로그아웃 한다. is_login 상태를 false로 바꿔준다. 이제 해당 토큰은 더이상 사용할 수 없다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그아웃 성공", response = TokenRes.class),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "인증 실패(없는 사용자 or 비밀번호 오류 or 이메일 미인증 or 로그아웃된 사용자)", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "회원 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity logout(@RequestBody @Valid LogoutReq logoutReq) {
        ValueOperations<String, String> logoutValueOperations = redisTemplate.opsForValue();
        logoutValueOperations.set(logoutReq.getToken(), logoutReq.getToken()); // redis set 명령어
        User user = (User) tokenProvider.getAuthentication(logoutReq.getToken()).getPrincipal();
        log.info("로그아웃 유저 이메일 : '{}' , 유저 권한 : '{}'", user.getUsername(), user.getAuthorities());
        return new ResponseEntity(HttpStatus.OK);
    }

}