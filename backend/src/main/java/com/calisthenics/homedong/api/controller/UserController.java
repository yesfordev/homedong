package com.calisthenics.homedong.api.controller;

import com.calisthenics.homedong.api.request.*;
import com.calisthenics.homedong.db.entity.User;
import com.calisthenics.homedong.api.service.UserService;
import com.calisthenics.homedong.error.ErrorResponse;
import com.calisthenics.homedong.jwt.TokenProvider;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.UnknownHostException;
import java.util.Map;

/**
 * Created by Seo Youngeun on 2021-07-26
 *
 * 유저 관련 Controller
 */
@Api(value = "유저 API", tags = {"User"})
@Slf4j
@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private final StringRedisTemplate redisTemplate;
    private final TokenProvider tokenProvider;

    @Value("${custom.host}")
    private String serverAddress;

    @Autowired
    public UserController(UserService userService, StringRedisTemplate redisTemplate, TokenProvider tokenProvider) {
        this.userService = userService;
        this.redisTemplate = redisTemplate;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/signup")
    @ApiOperation(value = "회원가입", notes = "<strong>이메일과 패스워드, 닉네임</strong>을 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원가입 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 409, message = "이메일 중복 에러(회원가입 불가)", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러 or 이메일 전송 에러", response = ErrorResponse.class)
    })
    public ResponseEntity signup(@Valid @RequestBody SignUpReq signUpReq) throws UnknownHostException, MessagingException {
        userService.signup(signUpReq);

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/signup/confirm")
    @ApiOperation(value = "이메일 인증", notes = "<strong>email, authKey</strong>를 통해 이메일 인증 한다. 프론트에서 쓸 일 없다...")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원가입 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "해당 이메일을 가진 유저가 없음", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    public ResponseEntity confirmEmail(@RequestParam Map<String, String> map) throws URISyntaxException {
        //email, authKey가 일치할 경우 authStatus 업데이트
        userService.updateAuthStatus(map);

        URI redirectUri = new URI(serverAddress + "/emailchecked");
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(redirectUri);

        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
    }

    @GetMapping("/user/me")
    @ApiOperation(value = "내 정보 보기", notes = "<strong>헤더에 token을 넣어</strong> 내 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "내 정보 조회 성공", response = User.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<User> getMyUserInfo() {
        return ResponseEntity.ok(userService.getMyUserWithRoles().get());
    }

    @GetMapping("/user/check_nickname")
    @ApiOperation(value = "닉네임 중복 확인", notes = "<strong>queryString에 nickname으로</strong> 닉네임 중복을 체크한다.")
    @ApiImplicitParam(name = "nickname", value = "중복 체크할 nickname", required = true, dataType = "String", paramType = "query")
    @ApiResponses({
            @ApiResponse(code = 200, message = "닉네임 중복 아님"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 409, message = "닉네임 중복", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    public ResponseEntity checkDuplicateNickname(@RequestParam(required = true) String nickname) {
        userService.checkDuplicateNickname(nickname);

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/user")
    @ApiOperation(value = "회원 탈퇴", notes = "<strong>token을 통해 </strong> 해당 유저를 탈퇴시킨다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원 탈퇴 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "회원 탈퇴할 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER')")
    public ResponseEntity deleteUser(@RequestHeader String Authorization) {
        String token = Authorization.split(" ")[1];
        log.info(token);

        ValueOperations<String, String> logoutValueOperations = redisTemplate.opsForValue();
        logoutValueOperations.set(token, token); // redis set 명령어
        org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) tokenProvider.getAuthentication(token).getPrincipal();
        log.info("회원탈퇴 유저 이메일 : '{}' , 유저 권한 : '{}'", user.getUsername(), user.getAuthorities());
        userService.deleteUser();

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/user/check_password")
    @ApiOperation(value = "현재 비밀번호 확인", notes = "<strong>token과 현재 비밀번호</strong>를 이용해 해당 유저의 현재 비밀번호가 맞는지 확인한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "비밀번호 매치 여부 확인, true: 현재 비밀번호 일치, false: 현재 비밀번호 틀림"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "회원 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Map<String, Boolean>> checkPassword(@RequestBody @Valid PasswordReq passwordReq) {
        return ResponseEntity.ok(userService.checkPassword(passwordReq));
    }

    @PutMapping("/user/password")
    @ApiOperation(value = "회원 비밀번호 변경", notes = "<strong>token과 변경할 비밀번호</strong>를 이용해 해당 유저의 비밀번호를 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "비밀번호 변경 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "회원 탈퇴할 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity changeUserPassword(@RequestBody @Valid ChangePasswordReq changePasswordReq) {
        userService.updatePassword(changePasswordReq);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/user/nickname")
    @ApiOperation(value = "현재 닉네임 변경", notes = "<strong>token과 변경할 닉네임 </strong>를 이용해 해당 유저의 닉네임을 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "닉네임 변경 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "회원 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity changeUserNickname(@RequestBody @Valid ChangeNicknameReq changeNicknameReq) {
        userService.updateNickname(changeNicknameReq);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/user/image")
    @ApiOperation(value = "유저 프로필 이미지 변경", notes = "<strong>token과 선택된 imgNum</strong>를 이용해 해당 유저의 프로필 이미지를 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "프로필 이미지 변경 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "회원 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity changeProfileImage(@RequestParam String imgNum) {
        userService.updateProfileImage(imgNum);

        return new ResponseEntity(HttpStatus.OK);
    }

}